'use strict';

/**
 * scripts/calc-travel-times.js
 *
 * NAVITIME API（totalnavi、RapidAPI経由）に問い合わせて、主要都市8ハブ→各大会会場の
 * 公共交通機関での移動時間を計算し、race_travel_times テーブルへの
 * INSERT ... ON CONFLICT SQL を migrations/seed-travel-times.sql として出力する。
 *
 * 経路計算自体はNAVITIME側のサーバーで行われるため、OpenTripPlanner等の自前ホストは
 * 不要（過去にOTP + ODPTオープンデータでの自前計算を検討したが、日本の主要鉄道
 * （JR各社）のGTFSデータを無料で入手する手段が実質無いことが判明し断念した。
 * 詳細: docs/blog-transit-api-japan-investigation.md）。
 *
 * 使い方:
 *   RAPIDAPI_KEY=xxx node scripts/calc-travel-times.js              # start_lat/start_lng が設定済みの全レースを処理
 *   RAPIDAPI_KEY=xxx node scripts/calc-travel-times.js <race-id>     # 対象レースのみ処理
 *
 * RAPIDAPI_KEY は RapidAPI で navitime-route-totalnavi をサブスクライブして取得する
 * （BASICプランは無料、500リクエスト/月）。ローカル実行時は .env.local に
 *   RAPIDAPI_KEY=...
 * を設定しておけば自動では読み込まれない点に注意（scripts/ 以下はNext.jsの
 * dotenv読み込みの対象外）。実行前に環境変数として渡すこと。
 *
 * DBへは直接書き込まない。生成された migrations/seed-travel-times.sql を
 * レビューした上で `wrangler d1 execute --local/--remote --file=...` で手動適用する。
 */

const fs = require('fs');
const path = require('path');

// ── 定数 ────────────────────────────────────────────────────────────────

const HUBS = {
  sapporo:   { id: 'sapporo',   lat: 43.0642, lng: 141.3469 },
  sendai:    { id: 'sendai',    lat: 38.2682, lng: 140.8694 },
  tokyo:     { id: 'tokyo',     lat: 35.6812, lng: 139.7671 },
  nagoya:    { id: 'nagoya',    lat: 35.1709, lng: 136.8815 },
  osaka:     { id: 'osaka',     lat: 34.6937, lng: 135.5023 },
  kyoto:     { id: 'kyoto',     lat: 35.0116, lng: 135.7681 },
  hiroshima: { id: 'hiroshima', lat: 34.3853, lng: 132.4553 },
  fukuoka:   { id: 'fukuoka',   lat: 33.5904, lng: 130.4017 },
};

const RACES_DIR = path.join(__dirname, '..', 'src', 'data', 'races');
const OUTPUT_FILE = path.join(__dirname, '..', 'migrations', 'seed-travel-times.sql');
const NAVITIME_HOST = 'navitime-route-totalnavi.p.rapidapi.com';
const NAVITIME_BASE_URL = `https://${NAVITIME_HOST}/route_transit`;

// ── 到着期限の計算（src/lib/reception.ts の getArrivalDeadline と同等ロジック） ──
//
// scripts/ 以下は素の Node.js（CommonJS）で実行され TypeScript を直接 require
// できないため、判定ロジックはここに複製する。仕様変更時は src/lib/reception.ts /
// src/lib/__tests__/reception.test.ts と揃えること。

/** HH:MM 文字列を分に変換 */
function toMinutes(time) {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

/** 分を HH:MM 文字列に変換（負値は24時間でラップ） */
function fromMinutes(minutes) {
  const normalized = ((minutes % 1440) + 1440) % 1440;
  const h = Math.floor(normalized / 60);
  const m = normalized % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

/** 大会当日（race.date）の reception_session を返す */
function findRaceDaySession(race) {
  return (race.reception_sessions || []).find((s) => s.date === race.date);
}

/** 大会当日受付の締切時刻を返す（無ければ null） */
function getRaceDayReceptionClose(race) {
  const session = findRaceDaySession(race);
  return session?.close_time ?? null;
}

/**
 * 到着期限を返す。
 * = min(最早スタート時刻 - 30分バッファ, 当日受付締切時刻)
 * start_time が未設定の場合は null。
 * @param {object} race
 * @returns {string | null} HH:MM
 */
function getArrivalDeadline(race) {
  const startTimes = (race.categories || [])
    .map((c) => c.start_time)
    .filter((t) => !!t);

  if (startTimes.length === 0) return null;

  const earliestStart = startTimes.reduce((a, b) => (toMinutes(a) <= toMinutes(b) ? a : b));
  const deadlineFromStart = toMinutes(earliestStart) - 30;

  const receptionClose = getRaceDayReceptionClose(race);
  if (receptionClose === null) {
    return fromMinutes(deadlineFromStart);
  }

  const deadlineFromReception = toMinutes(receptionClose);
  return fromMinutes(Math.min(deadlineFromStart, deadlineFromReception));
}

// ── NAVITIME API ─────────────────────────────────────────────────────

/**
 * NAVITIME route_transit のリクエストURLを組み立てる。
 * goal_time で「到着期限までに到着する経路」を問い合わせる（arrive-by相当）。
 * @param {{ lat: number, lng: number }} origin
 * @param {{ lat: number, lng: number }} destination
 * @param {{ date: string, time: string }} arrival date: YYYY-MM-DD, time: HH:MM:SS
 * @returns {string}
 */
function buildNavitimeUrl(origin, destination, { date, time }) {
  const params = new URLSearchParams({
    start: `${origin.lat},${origin.lng}`,
    goal: `${destination.lat},${destination.lng}`,
    goal_time: `${date}T${time}`,
  });
  return `${NAVITIME_BASE_URL}?${params.toString()}`;
}

/**
 * NAVITIME レスポンスから最短の所要時間（分）を取り出す。
 * items が空・欠落、または summary.move.time が数値の item が1つも無い場合は
 * 経路なしとして null を返す。
 * @param {object} navitimeResponse
 * @returns {number | null}
 */
function extractShortestDurationMinutes(navitimeResponse) {
  const items = navitimeResponse?.items;
  if (!items || items.length === 0) return null;

  const times = items
    .map((item) => item?.summary?.move?.time)
    .filter((t) => typeof t === 'number');
  if (times.length === 0) return null;

  return Math.min(...times);
}

// ── API 呼び出し ─────────────────────────────────────────────────────────

/**
 * NAVITIME API を呼び出して移動時間（分）を返す。
 * 経路が見つからない場合は null（不明扱い）、HTTPエラーは例外を投げる。
 * @param {{ lat: number, lng: number }} origin
 * @param {{ lat: number, lng: number }} destination
 * @param {string} date YYYY-MM-DD
 * @param {string} time HH:MM:SS（到着期限）
 * @param {string} apiKey RapidAPIキー（X-RapidAPI-Key）
 * @param {typeof fetch} [fetchFn]
 * @returns {Promise<number | null>}
 */
async function fetchTravelMinutes(origin, destination, date, time, apiKey, fetchFn = fetch) {
  const url = buildNavitimeUrl(origin, destination, { date, time });

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 30000);
  let res;
  try {
    res = await fetchFn(url, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': NAVITIME_HOST,
      },
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`NAVITIME API error ${res.status}: ${text}`);
  }

  const data = await res.json();
  return extractShortestDurationMinutes(data);
}

// ── SQL 生成 ─────────────────────────────────────────────────────────────

function esc(val) {
  if (val === null || val === undefined) return 'NULL';
  if (typeof val === 'number') return String(val);
  return `'${String(val).replace(/'/g, "''")}'`;
}

/**
 * 1レコード分の INSERT ... ON CONFLICT SQL を生成する。
 * @param {{ race_id: string, hub_id: string, duration_minutes: number, departure_time: string | null, calculated_at: string }} row
 * @returns {string}
 */
function buildUpsertSQL(row) {
  return `INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  (${esc(row.race_id)}, ${esc(row.hub_id)}, ${esc(row.duration_minutes)}, ${esc(row.departure_time)}, ${esc(row.calculated_at)})
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;`;
}

/**
 * 全行分の SQL ファイル内容を生成する。
 * @param {Array<{race_id: string, hub_id: string, duration_minutes: number, departure_time: string | null, calculated_at: string}>} rows
 * @returns {string}
 */
function generateSeedSQL(rows) {
  let sql = `-- 自動生成: calc-travel-times.js
-- 生成日時: ${new Date().toISOString()}
-- 対象行数: ${rows.length} 件（NAVITIMEで経路が見つからなかったレース×ハブの組は除外）
--
-- レビュー後、手動で適用すること:
--   wrangler d1 execute <DB名> --local/--remote --file=migrations/seed-travel-times.sql

`;
  for (const row of rows) {
    sql += buildUpsertSQL(row) + '\n\n';
  }
  return sql;
}

// ── メイン処理 ───────────────────────────────────────────────────────────

/**
 * 1レース分の移動時間を8ハブ分計算する。
 * start_lat/start_lng が無い、または到着期限が計算できないレースは空配列を返す。
 * ハブ単位のエラー（NAVITIME側の失敗等）は当該ハブをスキップして処理を継続する。
 * @param {object} race レース JSON
 * @param {{ apiKey: string, fetchFn?: typeof fetch }} opts
 * @returns {Promise<Array<{race_id: string, hub_id: string, duration_minutes: number, departure_time: null, calculated_at: string}>>}
 */
async function calcTravelTimesForRace(race, { apiKey, fetchFn = fetch } = {}) {
  if (race.start_lat == null || race.start_lng == null) {
    return [];
  }

  const deadline = getArrivalDeadline(race);
  if (!deadline) {
    return [];
  }

  const destination = { lat: race.start_lat, lng: race.start_lng };
  const time = `${deadline}:00`;
  const rows = [];

  for (const hub of Object.values(HUBS)) {
    process.stdout.write(`  [${race.id}] ${hub.id} ... `);
    try {
      const minutes = await fetchTravelMinutes(hub, destination, race.date, time, apiKey, fetchFn);
      if (minutes === null) {
        console.log('不明（経路なし）');
        continue;
      }
      rows.push({
        race_id: race.id,
        hub_id: hub.id,
        duration_minutes: minutes,
        departure_time: null,
        calculated_at: new Date().toISOString(),
      });
      console.log(`${minutes}分`);
    } catch (err) {
      console.log(`エラー: ${err.message}`);
    }
  }

  return rows;
}

async function main() {
  const apiKey = process.env.RAPIDAPI_KEY;
  if (!apiKey) {
    console.error('環境変数 RAPIDAPI_KEY が未設定です（RapidAPIでnavitime-route-totalnaviをサブスクライブして取得）');
    process.exit(1);
  }
  const targetId = process.argv[2];

  const files = fs.readdirSync(RACES_DIR)
    .filter((f) => f.endsWith('.json') && f !== 'index.json')
    .filter((f) => !targetId || f === `${targetId}.json`)
    .sort();

  if (targetId && files.length === 0) {
    console.error(`File not found: ${path.join(RACES_DIR, `${targetId}.json`)}`);
    process.exit(1);
  }

  const allRows = [];
  for (const file of files) {
    const race = JSON.parse(fs.readFileSync(path.join(RACES_DIR, file), 'utf-8'));

    if (race.start_lat == null || race.start_lng == null) {
      console.log(`[${race.id}] start_lat/start_lng 未設定のためスキップ`);
      continue;
    }
    if (!getArrivalDeadline(race)) {
      console.log(`[${race.id}] 到着期限を計算できないためスキップ（start_time 未整備）`);
      continue;
    }

    const rows = await calcTravelTimesForRace(race, { apiKey });
    allRows.push(...rows);
  }

  const sql = generateSeedSQL(allRows);
  fs.writeFileSync(OUTPUT_FILE, sql, 'utf-8');
  console.log(`\n✅ 生成完了: ${OUTPUT_FILE} (${allRows.length}行)`);
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = {
  HUBS,
  getArrivalDeadline,
  NAVITIME_HOST,
  buildNavitimeUrl,
  extractShortestDurationMinutes,
  fetchTravelMinutes,
  buildUpsertSQL,
  generateSeedSQL,
  calcTravelTimesForRace,
};

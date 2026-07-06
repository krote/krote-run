'use strict';

/**
 * scripts/geocode-venues.js
 * venue_address から国土地理院ジオコーディングAPIで座標を取得し
 * start_lat / start_lng を更新する（冪等設計）
 *
 * Usage:
 *   node scripts/geocode-venues.js              # 座標が null のレースを全件処理
 *   node scripts/geocode-venues.js --dry-run    # ファイルを更新しない
 */

const fs = require('fs');
const path = require('path');

const RACES_DIR = path.join(__dirname, '../src/data/races');

// 国土地理院 ジオコーディングAPI（無料・APIキー不要）
const GSI_ENDPOINT = 'https://msearch.gsi.go.jp/address-search/AddressSearch';

// 日本の bounding box
const JAPAN_LAT_MIN = 20;
const JAPAN_LAT_MAX = 46;
const JAPAN_LNG_MIN = 122;
const JAPAN_LNG_MAX = 154;

// ── 純粋関数（テスト対象） ────────────────────────────────────────────

/**
 * 座標が日本国内の bounding box 内かどうかチェック
 * @param {number} lat
 * @param {number} lng
 * @returns {boolean}
 */
function isInJapan(lat, lng) {
  return lat >= JAPAN_LAT_MIN && lat <= JAPAN_LAT_MAX &&
         lng >= JAPAN_LNG_MIN && lng <= JAPAN_LNG_MAX;
}

/**
 * 国土地理院 API のレスポンス配列から座標を取り出す
 * APIは GeoJSON 形式の配列を返す: coordinates は [lng, lat] 順
 * @param {Array|null} apiResponse
 * @returns {{ lat: number, lng: number } | null}
 */
function extractCoords(apiResponse) {
  if (!apiResponse || apiResponse.length === 0) return null;
  const [lng, lat] = apiResponse[0].geometry.coordinates;
  return { lat, lng };
}

/**
 * 住所から国土地理院ジオコーディング URL を構築する
 * @param {string} address
 * @returns {string}
 */
function buildGeocodingUrl(address) {
  return `${GSI_ENDPOINT}?q=${encodeURIComponent(address)}`;
}

// ── 副作用関数 ────────────────────────────────────────────────────────

/**
 * 国土地理院 API を叩いて座標を取得する
 * @param {string} address
 * @returns {Promise<{ lat: number, lng: number } | null>}
 */
async function geocodeAddress(address) {
  const url = buildGeocodingUrl(address);
  const res = await fetch(url, {
    headers: { 'User-Agent': 'HASHIRUBot/1.0 (+https://hashiru.run)' },
  });
  if (!res.ok) {
    throw new Error(`ジオコーディング API エラー: ${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  return extractCoords(data);
}

/**
 * 全レース JSON を走査し、venue_address がありかつ座標が未設定のものを geocode する
 * @param {{ dryRun?: boolean, fetchFn?: Function }} opts
 */
async function geocodeAll({ dryRun = false, fetchFn = geocodeAddress } = {}) {
  const files = fs.readdirSync(RACES_DIR)
    .filter(f => f.endsWith('.json') && f !== 'index.json')
    .sort();

  let processed = 0;
  let skipped = 0;
  let failed = 0;

  for (const file of files) {
    const fp = path.join(RACES_DIR, file);
    const race = JSON.parse(fs.readFileSync(fp, 'utf-8'));

    if (!race.venue_address) { skipped++; continue; }
    if (race.start_lat != null && race.start_lng != null) { skipped++; continue; }

    process.stdout.write(`  ${file}: "${race.venue_address}" → `);

    try {
      const coords = await fetchFn(race.venue_address);
      if (!coords) {
        console.log('結果なし（スキップ）');
        skipped++;
        continue;
      }

      if (!isInJapan(coords.lat, coords.lng)) {
        console.log(`範囲外 (${coords.lat}, ${coords.lng})（スキップ）`);
        failed++;
        continue;
      }

      console.log(`(${coords.lat}, ${coords.lng})`);
      processed++;

      if (!dryRun) {
        race.start_lat = coords.lat;
        race.start_lng = coords.lng;
        race.updated_at = new Date().toISOString();
        fs.writeFileSync(fp, JSON.stringify(race, null, 2) + '\n', 'utf-8');
      }

      // 礼儀正しく 1秒待つ（APIへの連続リクエストを避ける）
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (err) {
      console.log(`エラー: ${err.message}`);
      failed++;
    }
  }

  console.log(`\n処理: ${processed}件  スキップ: ${skipped}件  エラー/範囲外: ${failed}件`);
  if (dryRun) console.log('（--dry-run のため実際の書き込みは行っていません）');
}

// ── CLI 実行 ─────────────────────────────────────────────────────────

if (require.main === module) {
  const dryRun = process.argv.includes('--dry-run');
  console.log(`ジオコーディング開始${dryRun ? '（dry-run）' : ''}`);
  geocodeAll({ dryRun }).catch(err => {
    console.error('Fatal:', err.message);
    process.exit(1);
  });
}

module.exports = { isInJapan, extractCoords, buildGeocodingUrl, geocodeAll };

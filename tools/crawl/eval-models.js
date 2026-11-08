'use strict';

/**
 * tools/crawl/eval-models.js
 * クロールの LLM 抽出をモデル別に比較評価する（#199）。
 *
 * 正解データは既存の race JSON（レビュー済み）。採点対象の項目を空にした大会データと
 * 公式サイトのページテキストを各モデルに渡して一から抽出させ、正解との一致率を比べる。
 * ページテキストは一度取得したら一時ディレクトリにキャッシュし、全モデルに同じ入力を渡す。
 *
 * 使い方:
 *   node tools/crawl/eval-models.js --races kochi-ryoma-marathon-2027,tottori-marathon-2027 \
 *     [--models claude-haiku-5-5,claude-sonnet-5-5,claude-opus-5-5] [--refresh] [--out result.md]
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const { shouldRelaunchWithExtraCa, relaunchWithExtraCa } = require('./extra-ca');

const RACES_DIR = path.join(__dirname, '../../src/data/races');
const CACHE_DIR = path.join(os.tmpdir(), 'krote-crawl-eval');
const DEFAULT_MODELS = ['claude-haiku-5-5', 'claude-sonnet-5-5', 'claude-opus-5-5'];

/** 採点するスカラー項目 */
const SCALAR_FIELDS = [
  'date', 'entry_start_date', 'entry_end_date', 'entry_fee', 'entry_capacity',
  'venue_name_ja', 'venue_address', 'reception_type',
];
const PERIOD_FIELDS = ['start_date', 'end_date', 'entry_fee'];
const CATEGORY_FIELDS = ['entry_fee', 'start_time', 'time_limit_minutes', 'capacity'];

// ── 純粋関数 ─────────────────────────────────────────────────────

/** 比較用に値を正規化する（数値文字列と数値、前後空白、空値の揺れを吸収） */
function normalizeValue(value) {
  if (value === undefined || value === null) return null;
  if (typeof value === 'number') return String(value);
  const s = String(value).trim();
  if (s === '') return null;
  if (/^-?\d+(\.\d+)?$/.test(s)) return String(Number(s));
  return s;
}

/**
 * 採点対象の項目を空にした大会データを作る。
 * 抽出プロンプトは既存値を含み「変更点のみ返す」指示のため、正解を渡すと何も返さずに正解扱いになる。
 * categories は既存の distance_type への突き合わせで抽出されるため、種目だけ残す。
 */
function blankForEval(race) {
  const blank = { ...race };
  for (const key of SCALAR_FIELDS) blank[key] = null;
  blank.entry_periods = [];
  blank.categories = (race.categories ?? []).map((c) => ({
    distance_type: c.distance_type,
    ...Object.fromEntries(CATEGORY_FIELDS.map((k) => [k, null])),
  }));
  return blank;
}

function sortedPeriods(periods) {
  return [...(periods ?? [])].sort((a, b) => String(a?.start_date ?? '').localeCompare(String(b?.start_date ?? '')));
}

/**
 * 正解と抽出結果を項目ごとに比較する。正解が null の項目は採点しない。
 * @returns {{ field: string, status: 'match'|'mismatch'|'missing', expected: string, actual: string|null }[]}
 */
function compareExtraction(truth, extracted) {
  const results = [];
  const judge = (field, expectedRaw, actualRaw) => {
    const expected = normalizeValue(expectedRaw);
    if (expected === null) return;
    const actual = normalizeValue(actualRaw);
    const status = actual === null ? 'missing' : actual === expected ? 'match' : 'mismatch';
    results.push({ field, status, expected, actual });
  };

  for (const key of SCALAR_FIELDS) judge(key, truth[key], extracted?.[key]);

  const truthPeriods = sortedPeriods(truth.entry_periods);
  const extractedPeriods = sortedPeriods(extracted?.entry_periods);
  truthPeriods.forEach((p, i) => {
    for (const k of PERIOD_FIELDS) judge(`entry_periods[${i}].${k}`, p?.[k], extractedPeriods[i]?.[k]);
  });

  const extractedCats = new Map((extracted?.categories ?? []).map((c) => [c?.distance_type, c]));
  for (const c of truth.categories ?? []) {
    const e = extractedCats.get(c.distance_type);
    for (const k of CATEGORY_FIELDS) judge(`categories[${c.distance_type}].${k}`, c[k], e?.[k]);
  }

  return results;
}

function summarizeScores(results) {
  const count = (s) => results.filter((r) => r.status === s).length;
  const total = results.length;
  const match = count('match');
  return { total, match, mismatch: count('mismatch'), missing: count('missing'), rate: total ? match / total : null };
}

function parseArgs(argv) {
  const get = (name) => {
    const i = argv.indexOf(name);
    return i >= 0 ? argv[i + 1] : undefined;
  };
  const list = (v) => (v ?? '').split(',').map((s) => s.trim()).filter(Boolean);
  const races = list(get('--races'));
  if (races.length === 0) throw new Error('--races に評価する大会IDをカンマ区切りで指定してください');
  const models = list(get('--models'));
  return {
    races,
    models: models.length ? models : DEFAULT_MODELS,
    refresh: argv.includes('--refresh'),
    out: get('--out') ?? null,
  };
}

const pct = (v) => (v === null ? '-' : `${(v * 100).toFixed(1)}%`);
const num = (v) => Number(v ?? 0).toLocaleString('en-US');

/**
 * 評価結果を Markdown にする
 * @param {{ model: string, races: { raceId: string, scores: object|null, held: number, error: string|null, ms: number, meta: object|null }[] }[]} results
 */
function renderMarkdown(results) {
  const lines = ['## モデル別サマリ', ''];
  lines.push('| モデル | 一致率 | 一致/採点 | 不一致 | 欠落 | 保留 | 失敗 | 平均時間 | 入力トークン | 出力トークン | API換算コスト |');
  lines.push('|---|---|---|---|---|---|---|---|---|---|---|');

  for (const { model, races } of results) {
    const ok = races.filter((r) => !r.error && r.scores);
    const sum = (f) => ok.reduce((acc, r) => acc + f(r), 0);
    const total = sum((r) => r.scores.total);
    const match = sum((r) => r.scores.match);
    const avgMs = races.length ? races.reduce((a, r) => a + r.ms, 0) / races.length : 0;
    // claude -p は入力の大半をキャッシュ作成・読込として数えるため、合計で表示する
    const inputTotal = (m) => (m?.inputTokens ?? 0) + (m?.cacheCreationTokens ?? 0) + (m?.cacheReadTokens ?? 0);
    lines.push(`| ${model} | ${pct(total ? match / total : null)} | ${match}/${total} | ${sum((r) => r.scores.mismatch)} | ${sum((r) => r.scores.missing)} | ${sum((r) => r.held)} | ${races.length - ok.length} | ${(avgMs / 1000).toFixed(1)}s | ${num(sum((r) => inputTotal(r.meta)))} | ${num(sum((r) => r.meta?.outputTokens ?? 0))} | $${sum((r) => r.meta?.costUsd ?? 0).toFixed(2)} |`);
  }

  lines.push('', '## 大会別', '');
  lines.push(`| 大会 | ${results.map((r) => r.model).join(' | ')} |`);
  lines.push(`|---|${results.map(() => '---').join('|')}|`);
  const raceIds = [...new Set(results.flatMap((r) => r.races.map((x) => x.raceId)))];
  for (const raceId of raceIds) {
    const cells = results.map(({ races }) => {
      const r = races.find((x) => x.raceId === raceId);
      if (!r) return '-';
      if (r.error) return `失敗: ${r.error.slice(0, 40)}`;
      return `${pct(r.scores.rate)}（${r.scores.match}/${r.scores.total}・保留${r.held}）`;
    });
    lines.push(`| ${raceId} | ${cells.join(' | ')} |`);
  }
  lines.push('');
  return lines.join('\n');
}

// ── 副作用 ───────────────────────────────────────────────────────

async function loadPages(race, { refresh }) {
  const { buildUrlsToCheck, fetchPageText } = require('./index');
  fs.mkdirSync(CACHE_DIR, { recursive: true });
  const cacheFile = path.join(CACHE_DIR, `${race.id}.json`);
  if (!refresh && fs.existsSync(cacheFile)) return JSON.parse(fs.readFileSync(cacheFile, 'utf-8'));

  const pages = [];
  for (const url of buildUrlsToCheck(race)) {
    try {
      pages.push({ url, text: await fetchPageText(url) });
    } catch (err) {
      console.warn(`  [${race.id}] 取得失敗: ${url} (${err.message})`);
    }
  }
  fs.writeFileSync(cacheFile, JSON.stringify(pages), 'utf-8');
  return pages;
}

async function main(argv) {
  const { extractFromPages } = require('./extractor');
  const { screenExtraction } = require('./gate');
  const args = parseArgs(argv);

  const inputs = [];
  for (const raceId of args.races) {
    const race = JSON.parse(fs.readFileSync(path.join(RACES_DIR, `${raceId}.json`), 'utf-8'));
    const pages = await loadPages(race, args);
    console.log(`[eval] ${raceId}: ${pages.length}ページ`);
    inputs.push({ race, pages });
  }

  const results = [];
  for (const model of args.models) {
    const races = [];
    for (const { race, pages } of inputs) {
      process.stdout.write(`[eval] ${model} × ${race.id} ... `);
      const started = Date.now();
      if (pages.length === 0) {
        races.push({ raceId: race.id, scores: null, held: 0, error: 'ページ取得失敗', ms: 0, meta: null });
        console.log('スキップ（ページなし）');
        continue;
      }
      try {
        const blank = blankForEval(race);
        const { extracted, meta } = await extractFromPages(blank, pages, { model });
        const { held } = screenExtraction(blank, extracted);
        const scores = summarizeScores(compareExtraction(race, extracted));
        races.push({ raceId: race.id, scores, held: held.length, error: null, ms: Date.now() - started, meta });
        console.log(`${pct(scores.rate)}（${((Date.now() - started) / 1000).toFixed(1)}s）`);
      } catch (err) {
        races.push({ raceId: race.id, scores: null, held: 0, error: err.message, ms: Date.now() - started, meta: null });
        console.log(`失敗: ${err.message}`);
      }
    }
    results.push({ model, races });
  }

  const md = renderMarkdown(results);
  console.log(`\n${md}`);
  if (args.out) fs.writeFileSync(args.out, md, 'utf-8');
}

if (require.main === module && shouldRelaunchWithExtraCa(process.env)) {
  // クロール本体と同じく中間証明書を補って起動し直す（#209）
  process.exit(relaunchWithExtraCa());
} else if (require.main === module) {
  main(process.argv.slice(2)).catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
}

module.exports = { normalizeValue, blankForEval, compareExtraction, summarizeScores, parseArgs, renderMarkdown };

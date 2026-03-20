/**
 * generate-seed-series.js
 *
 * src/data/races/*.json を読み込み、race_series テーブルのシードSQLを生成する。
 * シリーズIDはレースIDから年号(-YYYY)を除去して導出する。
 * 大会名から版数表記（第N回・Nth）を除去してシリーズ名とする。
 *
 * 使用方法:
 *   node scripts/generate-seed-series.js
 *   → migrations/seed-series.sql を出力
 */

const fs = require('fs');
const path = require('path');

const RACES_DIR = path.join(__dirname, '../src/data/races');
const OUT_FILE  = path.join(__dirname, '../migrations/seed-series.sql');

/** レースIDから年号を除去してシリーズIDを返す */
function toSeriesId(raceId) {
  return raceId.replace(/-\d{4}$/, '');
}

/** 日本語名から版数表記を除去する（例: "第28回 長野マラソン" → "長野マラソン"） */
function stripEditionJa(name) {
  return name.replace(/^第\d+回\s*/, '').trim();
}

/** 英語名から版数表記を除去する（例: "28th Nagano Marathon" → "Nagano Marathon"） */
function stripEditionEn(name) {
  return name.replace(/^\d+(?:st|nd|rd|th)\s*/i, '').trim();
}

/** SQL 文字列エスケープ */
function esc(str) {
  return str ? str.replace(/'/g, "''") : '';
}

const files = fs.readdirSync(RACES_DIR)
  .filter(f => f.endsWith('.json') && f !== 'index.json')
  .sort();

const seriesMap = new Map(); // seriesId → { name_ja, name_en }

for (const file of files) {
  const data = JSON.parse(fs.readFileSync(path.join(RACES_DIR, file), 'utf-8'));
  const seriesId = toSeriesId(data.id);

  if (!seriesMap.has(seriesId)) {
    seriesMap.set(seriesId, {
      name_ja: stripEditionJa(data.name_ja),
      name_en: stripEditionEn(data.name_en),
    });
  }
}

const lines = [
  '-- 自動生成: scripts/generate-seed-series.js',
  '-- race_series シードデータ（シリーズマスタ）',
  '',
];

for (const [id, { name_ja, name_en }] of seriesMap) {
  lines.push(
    `INSERT OR IGNORE INTO race_series (id, name_ja, name_en) VALUES ('${esc(id)}', '${esc(name_ja)}', '${esc(name_en)}');`
  );
}

fs.writeFileSync(OUT_FILE, lines.join('\n') + '\n');
console.log(`✓ ${seriesMap.size} series → ${OUT_FILE}`);

#!/usr/bin/env node
/**
 * course_info.highlights_ja/en を course_highlights 配列に構造化するスクリプト
 * カンマ・読点で分割してポイントリストを生成
 */
const fs = require('fs');
const path = require('path');

const RACES_DIR = path.join(__dirname, '../src/data/races');
const files = fs.readdirSync(RACES_DIR).filter(f => f.endsWith('.json') && f !== 'index.json');

let updated = 0;

for (const file of files) {
  const filePath = path.join(RACES_DIR, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const ci = data.course_info || {};
  const hlJa = ci.highlights_ja;
  const hlEn = ci.highlights_en;

  if (!hlJa || data.course_highlights.length > 0) continue;

  // 「、」「，」「, 」で分割してポイント化
  const pointsJa = hlJa.split(/[、,，]+/).map(s => s.trim()).filter(Boolean);
  const pointsEn = hlEn ? hlEn.split(/,\s*/).map(s => s.trim()).filter(Boolean) : [];

  data.course_highlights = pointsJa.map((nameJa, i) => ({
    name_ja: nameJa,
    name_en: pointsEn[i] ?? null,
    description_ja: null,
    description_en: null,
  }));

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  updated++;
}

console.log(`Updated: ${updated}/${files.length} files`);

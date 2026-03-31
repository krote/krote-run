#!/usr/bin/env node
/**
 * src/data/races/*.json に entry_periods フィールドを追加するスクリプト
 * - entry_start_date と entry_end_date が両方 null 以外 → entry_periods 配列の第1要素として追加
 * - 両方 null → entry_periods: []
 */

const fs = require('fs');
const path = require('path');

const RACES_DIR = path.join(__dirname, '../src/data/races');

const files = fs.readdirSync(RACES_DIR)
  .filter(f => f.endsWith('.json') && f !== 'index.json')
  .sort();

let count = 0;
let skipped = 0;

for (const file of files) {
  const filePath = path.join(RACES_DIR, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  // 既に entry_periods フィールドがある場合はスキップ
  if ('entry_periods' in data) {
    skipped++;
    continue;
  }

  let entry_periods = [];

  if (data.entry_start_date && data.entry_end_date) {
    entry_periods = [
      {
        label_ja: '一般エントリー',
        label_en: 'General Entry',
        start_date: data.entry_start_date,
        end_date: data.entry_end_date,
        entry_fee: null,
      },
    ];
  }

  // entry_periods を追加（participation_gifts の後に挿入）
  const newData = { ...data, entry_periods };

  fs.writeFileSync(filePath, JSON.stringify(newData, null, 2) + '\n', 'utf-8');
  count++;
}

console.log(`完了: ${count} ファイルを更新, ${skipped} ファイルをスキップ`);

#!/usr/bin/env node
/**
 * Phase 3 フィールドを全レース JSON に追加するスクリプト
 * gallery / voices / time_buckets / course_highlights を空配列で挿入
 */
const fs = require('fs');
const path = require('path');

const RACES_DIR = path.join(__dirname, '../src/data/races');
const files = fs.readdirSync(RACES_DIR).filter(f => f.endsWith('.json') && f !== 'index.json');

let updated = 0;
for (const file of files) {
  const filePath = path.join(RACES_DIR, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  let changed = false;
  if (!('gallery' in data)) { data.gallery = []; changed = true; }
  if (!('voices' in data)) { data.voices = []; changed = true; }
  if (!('time_buckets' in data)) { data.time_buckets = []; changed = true; }
  if (!('course_highlights' in data)) { data.course_highlights = []; changed = true; }

  if (changed) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
    updated++;
  }
}

console.log(`Updated: ${updated}/${files.length} files`);

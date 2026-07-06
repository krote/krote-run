#!/usr/bin/env node
/**
 * 全レースJSONに venue_name_ja / venue_name_en / venue_address / start_lat / start_lng を追加する
 * access_points 各エントリーに walk_minutes / is_primary を追加する
 * 既にフィールドが存在する場合はスキップ
 */

const fs = require('fs');
const path = require('path');

const RACES_DIR = path.join(__dirname, '../src/data/races');

const files = fs.readdirSync(RACES_DIR).filter(f => f.endsWith('.json') && f !== 'index.json');
let updated = 0;

for (const file of files) {
  const filePath = path.join(RACES_DIR, file);
  const race = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let changed = false;

  // races テーブルの新フィールド
  if (!('venue_name_ja' in race)) { race.venue_name_ja = null; changed = true; }
  if (!('venue_name_en' in race)) { race.venue_name_en = null; changed = true; }
  if (!('venue_address' in race)) { race.venue_address = null; changed = true; }
  if (!('start_lat' in race)) { race.start_lat = null; changed = true; }
  if (!('start_lng' in race)) { race.start_lng = null; changed = true; }

  // access_points の新フィールド
  if (Array.isArray(race.access_points) && race.access_points.length > 0) {
    for (const ap of race.access_points) {
      if (!('walk_minutes' in ap)) { ap.walk_minutes = null; changed = true; }
      if (!('is_primary' in ap)) { ap.is_primary = false; changed = true; }
    }
    // access_points が1件のみで全て is_primary=false の場合は先頭を primary にする
    const hasPrimary = race.access_points.some(ap => ap.is_primary);
    if (!hasPrimary && race.access_points.length === 1) {
      race.access_points[0].is_primary = true;
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, JSON.stringify(race, null, 2) + '\n', 'utf8');
    updated++;
    console.log(`  updated: ${file}`);
  }
}

console.log(`\n完了: ${updated} / ${files.length} ファイルを更新しました`);

#!/usr/bin/env node
/**
 * src/data/races/*.json から migrations/seed-races-all.sql を生成するスクリプト
 */

const fs = require('fs');
const path = require('path');

const RACES_DIR = path.join(__dirname, '../src/data/races');
const OUTPUT_FILE = path.join(__dirname, '../migrations/seed-races-all.sql');

// 既にseed-races.sqlに含まれている大会はスキップ
const ALREADY_SEEDED = new Set(['nagano-marathon-2026', 'challenge-fuji5lakes-2026']);

function esc(val) {
  if (val === null || val === undefined) return 'NULL';
  if (typeof val === 'boolean') return val ? '1' : '0';
  if (typeof val === 'number') return String(val);
  // 文字列: シングルクォートをエスケープ
  return `'${String(val).replace(/'/g, "''")}'`;
}

function escJson(arr) {
  if (!arr) return "'{}'";
  return esc(JSON.stringify(arr));
}

function generateRaceSQL(r) {
  const ci = r.course_info || {};
  const lines = [];

  // races テーブル
  lines.push(`INSERT OR REPLACE INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  created_at, updated_at
) VALUES (
  ${esc(r.id)},
  ${esc(r.name_ja)},
  ${esc(r.name_en)},
  ${esc(r.date)},
  ${esc(r.prefecture)},
  ${esc(r.city_ja)},
  ${esc(r.city_en)},
  ${esc(r.description_ja || '')},
  ${esc(r.description_en || '')},
  ${esc(r.official_url || '')},
  ${esc(r.entry_fee)},
  ${r.entry_fee_by_category ? '1' : '0'},
  ${esc(r.entry_capacity || 0)},
  ${esc(r.entry_start_date)},
  ${esc(r.entry_end_date)},
  ${esc(r.reception_type || 'race_day')},
  ${esc(r.reception_note_ja || '')},
  ${esc(r.reception_note_en || '')},
  ${escJson(r.tags)},
  ${esc(r.course_gpx_file)},
  ${esc(ci.max_elevation_m || 0)},
  ${esc(ci.min_elevation_m || 0)},
  ${esc(ci.elevation_diff_m || 0)},
  ${esc(ci.surface || 'road')},
  ${escJson(ci.certification)},
  ${esc(ci.highlights_ja || '')},
  ${esc(ci.highlights_en || '')},
  ${esc(ci.notes_ja)},
  ${esc(ci.notes_en)},
  ${esc(r.created_at)},
  ${esc(r.updated_at)}
);`);

  // race_categories
  if (r.categories && r.categories.length > 0) {
    r.categories.forEach((cat, idx) => {
      lines.push(`INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, waves, sort_order) VALUES
  (${esc(r.id)}, ${esc(cat.distance_type)}, ${esc(cat.distance_km)}, ${esc(cat.time_limit_minutes || 0)}, ${esc(cat.start_time || '')}, ${esc(cat.capacity || 0)}, ${esc(cat.entry_fee ?? null)}, ${esc(cat.entry_fee_u25 ?? null)}, ${esc(cat.name_ja ?? null)}, ${esc(cat.name_en ?? null)}, ${esc(cat.description_ja ?? null)}, ${esc(cat.description_en ?? null)}, ${escJson(cat.waves || [])}, ${idx});`);
    });
  }

  // aid_stations
  if (r.aid_stations && r.aid_stations.length > 0) {
    r.aid_stations.forEach((a) => {
      lines.push(`INSERT OR REPLACE INTO aid_stations (race_id, distance_km, offerings_ja, offerings_en, is_featured) VALUES
  (${esc(r.id)}, ${esc(a.distance_km)}, ${esc(a.offerings_ja || '')}, ${esc(a.offerings_en || '')}, ${a.is_featured ? '1' : '0'});`);
    });
  }

  // checkpoints
  if (r.checkpoints && r.checkpoints.length > 0) {
    r.checkpoints.forEach((cp) => {
      lines.push(`INSERT OR REPLACE INTO checkpoints (race_id, distance_km, closing_time) VALUES
  (${esc(r.id)}, ${esc(cp.distance_km)}, ${esc(cp.closing_time)});`);
    });
  }

  // access_points
  if (r.access_points && r.access_points.length > 0) {
    r.access_points.forEach((ap, idx) => {
      lines.push(`INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, sort_order) VALUES
  (${esc(r.id)}, ${esc(ap.station_name_ja)}, ${esc(ap.station_name_en || '')}, ${esc(ap.station_code || '')}, ${esc(ap.transport_to_venue_ja || '')}, ${esc(ap.transport_to_venue_en || '')}, ${esc(ap.latitude || 0)}, ${esc(ap.longitude || 0)}, ${idx});`);
    });
  }

  // nearby_spots
  if (r.nearby_spots && r.nearby_spots.length > 0) {
    r.nearby_spots.forEach((ns) => {
      lines.push(`INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  (${esc(r.id)}, ${esc(ns.type)}, ${esc(ns.name_ja)}, ${esc(ns.name_en || '')}, ${esc(ns.description_ja || '')}, ${esc(ns.description_en || '')}, ${esc(ns.distance_from_venue || '')}, ${esc(ns.url)}, ${esc(ns.latitude || 0)}, ${esc(ns.longitude || 0)});`);
    });
  }

  // weather_history
  if (r.weather_history && r.weather_history.length > 0) {
    r.weather_history.forEach((wh) => {
      lines.push(`INSERT OR REPLACE INTO weather_history (race_id, year, avg_temp, max_temp, min_temp, humidity_pct, precipitation_mm, wind_speed_ms) VALUES
  (${esc(r.id)}, ${esc(wh.year)}, ${esc(wh.avg_temp || 0)}, ${esc(wh.max_temp || 0)}, ${esc(wh.min_temp || 0)}, ${esc(wh.humidity_pct || 0)}, ${esc(wh.precipitation_mm || 0)}, ${esc(wh.wind_speed_ms || 0)});`);
    });
  }

  // participation_gifts
  if (r.participation_gifts && r.participation_gifts.length > 0) {
    r.participation_gifts.forEach((pg, idx) => {
      lines.push(`INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  (${esc(r.id)}, ${escJson(pg.gift_categories)}, ${esc(pg.description_ja || '')}, ${esc(pg.description_en || '')}, ${esc(pg.image)}, ${idx});`);
    });
  }

  // race_entry_periods
  if (r.entry_periods && r.entry_periods.length > 0) {
    r.entry_periods.forEach((ep, idx) => {
      lines.push(`INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  (${esc(r.id)}, ${esc(ep.category_id ?? null)}, ${esc(ep.label_ja || '一般エントリー')}, ${esc(ep.label_en || 'General Entry')}, ${esc(ep.start_date)}, ${esc(ep.end_date)}, ${esc(ep.entry_fee ?? null)}, ${idx});`);
    });
  }

  // race_results
  if (r.result) {
    const res = r.result;
    lines.push(`INSERT OR REPLACE INTO race_results (race_id, participants_count, finishers_count, finisher_rate_pct, weather_condition_ja, weather_condition_en, temperature_c, max_temp_c, min_temp_c, wind_speed_ms, humidity_pct, notes_ja, notes_en) VALUES
  (${esc(r.id)}, ${esc(res.participants_count ?? null)}, ${esc(res.finishers_count ?? null)}, ${esc(res.finisher_rate_pct ?? null)}, ${esc(res.weather_condition_ja || '')}, ${esc(res.weather_condition_en || '')}, ${esc(res.temperature_c ?? null)}, ${esc(res.max_temp_c ?? null)}, ${esc(res.min_temp_c ?? null)}, ${esc(res.wind_speed_ms ?? null)}, ${esc(res.humidity_pct ?? null)}, ${esc(res.notes_ja ?? null)}, ${esc(res.notes_en ?? null)});`);
  }

  return lines.join('\n');
}

// メイン処理
const files = fs.readdirSync(RACES_DIR)
  .filter(f => f.endsWith('.json') && f !== 'index.json')
  .sort();

let sql = `-- 自動生成: generate-seed-races.js
-- 生成日時: ${new Date().toISOString()}
-- 対象ファイル数: ${files.length - ALREADY_SEEDED.size} 件（既存 ${ALREADY_SEEDED.size} 件はskip）

`;

let count = 0;
const skipped = [];
const processed = [];

for (const file of files) {
  const filePath = path.join(RACES_DIR, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  if (ALREADY_SEEDED.has(data.id)) {
    skipped.push(data.id);
    continue;
  }

  sql += `-- ==================\n-- ${data.name_ja} (${data.id})\n-- ==================\n`;
  sql += generateRaceSQL(data);
  sql += '\n\n';
  processed.push(data.id);
  count++;
}

fs.writeFileSync(OUTPUT_FILE, sql, 'utf-8');

console.log(`✅ 生成完了: ${OUTPUT_FILE}`);
console.log(`  処理: ${count} 件`);
console.log(`  スキップ: ${skipped.join(', ')}`);
console.log(`\n処理した大会:`);
processed.forEach(id => console.log(`  - ${id}`));

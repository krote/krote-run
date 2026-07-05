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

  // 子テーブルの既存データを先に削除する
  // race_course_highlights.category_id → race_categories.id は NO ACTION FK のため、
  // INSERT OR REPLACE INTO races のカスケード削除より前に手動削除が必要
  lines.push(`DELETE FROM race_course_highlights WHERE race_id = ${esc(r.id)};`);
  lines.push(`DELETE FROM race_categories WHERE race_id = ${esc(r.id)};`);
  lines.push(`DELETE FROM aid_stations WHERE race_id = ${esc(r.id)};`);
  lines.push(`DELETE FROM checkpoints WHERE race_id = ${esc(r.id)};`);
  lines.push(`DELETE FROM access_points WHERE race_id = ${esc(r.id)};`);
  lines.push(`DELETE FROM nearby_spots WHERE race_id = ${esc(r.id)};`);
  lines.push(`DELETE FROM weather_history WHERE race_id = ${esc(r.id)};`);
  lines.push(`DELETE FROM participation_gifts WHERE race_id = ${esc(r.id)};`);
  lines.push(`DELETE FROM completion_gifts WHERE race_id = ${esc(r.id)};`);
  lines.push(`DELETE FROM race_entry_links WHERE race_id = ${esc(r.id)};`);
  lines.push(`DELETE FROM race_entry_periods WHERE race_id = ${esc(r.id)};`);
  lines.push(`DELETE FROM race_results WHERE race_id = ${esc(r.id)};`);
  lines.push(`DELETE FROM race_gallery WHERE race_id = ${esc(r.id)};`);
  lines.push(`DELETE FROM race_voices WHERE race_id = ${esc(r.id)};`);
  lines.push(`DELETE FROM race_time_buckets WHERE race_id = ${esc(r.id)};`);

  // races テーブル: INSERT OR REPLACE ではなく ON CONFLICT DO UPDATE を使う。
  // INSERT OR REPLACE は内部的に DELETE+INSERT のため user_races の ON DELETE CASCADE が発火してユーザーデータが消える。
  lines.push(`INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
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
  ${r.entry_closed ? '1' : '0'},
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
  ${esc(r.motif)},
  ${esc(r.motif_color)},
  ${esc(r.motif_romaji)},
  ${esc(r.tagline_ja)},
  ${esc(r.tagline_en)},
  ${esc(r.hero_image_url)},
  ${esc(r.hero_caption_ja)},
  ${esc(r.hero_caption_en)},
  ${esc(r.venue_name_ja ?? null)},
  ${esc(r.venue_name_en ?? null)},
  ${esc(r.venue_address ?? null)},
  ${esc(r.start_lat ?? null)},
  ${esc(r.start_lng ?? null)},
  ${esc(r.created_at)},
  ${esc(r.updated_at)}
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;`);

  // race_categories（+ カテゴリに付随する course_highlights）
  if (r.categories && r.categories.length > 0) {
    r.categories.forEach((cat, idx) => {
      lines.push(`INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  (${esc(r.id)}, ${esc(cat.distance_type)}, ${esc(cat.distance_km)}, ${esc(cat.time_limit_minutes || 0)}, ${esc(cat.start_time || '')}, ${esc(cat.capacity || 0)}, ${esc(cat.entry_fee ?? null)}, ${esc(cat.entry_fee_u25 ?? null)}, ${esc(cat.name_ja ?? null)}, ${esc(cat.name_en ?? null)}, ${esc(cat.description_ja ?? null)}, ${esc(cat.description_en ?? null)}, ${esc(cat.eligibility_ja ?? null)}, ${esc(cat.eligibility_en ?? null)}, ${esc(cat.course_gpx_file ?? null)}, ${escJson(cat.waves || [])}, ${idx});`);
      // カテゴリ直下の course_highlights: サブクエリで category_id を取得
      // （last_insert_rowid() は race_course_highlights INSERT後に更新されるため使用不可）
      if (cat.course_highlights && cat.course_highlights.length > 0) {
        cat.course_highlights.forEach((ch, cidx) => {
          lines.push(`INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  (${esc(r.id)}, (SELECT id FROM race_categories WHERE race_id = ${esc(r.id)} AND distance_type = ${esc(cat.distance_type)} ORDER BY id DESC LIMIT 1), ${esc(ch.km)}, ${esc(ch.name_ja)}, ${esc(ch.name_en ?? null)}, ${esc(ch.note_ja ?? null)}, ${esc(ch.note_en ?? null)}, ${cidx});`);
        });
      }
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
      lines.push(`INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  (${esc(r.id)}, ${esc(ap.station_name_ja)}, ${esc(ap.station_name_en || '')}, ${esc(ap.station_code || '')}, ${esc(ap.transport_to_venue_ja || '')}, ${esc(ap.transport_to_venue_en || '')}, ${esc(ap.latitude || 0)}, ${esc(ap.longitude || 0)}, ${esc(ap.walk_minutes ?? null)}, ${ap.is_primary ? '1' : '0'}, ${idx});`);
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

  // completion_gifts
  if (r.completion_gifts && r.completion_gifts.length > 0) {
    r.completion_gifts.forEach((cg, idx) => {
      lines.push(`INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  (${esc(r.id)}, ${escJson(cg.gift_categories)}, ${esc(cg.description_ja || '')}, ${esc(cg.description_en || '')}, ${esc(cg.image ?? null)}, ${idx});`);
    });
  }

  // race_entry_links
  if (r.entry_links && r.entry_links.length > 0) {
    r.entry_links.forEach((el, idx) => {
      lines.push(`INSERT OR REPLACE INTO race_entry_links (race_id, site_name, url, sort_order) VALUES
  (${esc(r.id)}, ${esc(el.site_name)}, ${esc(el.url)}, ${idx});`);
    });
  }

  // race_entry_periods
  if (r.entry_periods && r.entry_periods.length > 0) {
    r.entry_periods.forEach((ep, idx) => {
      lines.push(`INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  (${esc(r.id)}, ${esc(ep.category_id ?? null)}, ${esc(ep.label_ja || '一般エントリー')}, ${esc(ep.label_en || 'General Entry')}, ${esc(ep.start_date)}, ${esc(ep.end_date)}, ${esc(ep.entry_fee ?? null)}, ${idx});`);
    });
  }

  // race_gallery
  if (r.gallery && r.gallery.length > 0) {
    r.gallery.forEach((g, idx) => {
      lines.push(`INSERT OR REPLACE INTO race_gallery (race_id, src, caption_ja, caption_en, sort_order) VALUES
  (${esc(r.id)}, ${esc(g.src)}, ${esc(g.caption_ja ?? null)}, ${esc(g.caption_en ?? null)}, ${idx});`);
    });
  }

  // race_voices
  if (r.voices && r.voices.length > 0) {
    r.voices.forEach((v, idx) => {
      lines.push(`INSERT OR REPLACE INTO race_voices (race_id, quote_ja, author, sort_order) VALUES
  (${esc(r.id)}, ${esc(v.quote_ja)}, ${esc(v.author ?? null)}, ${idx});`);
    });
  }

  // race_time_buckets
  if (r.time_buckets && r.time_buckets.length > 0) {
    r.time_buckets.forEach((tb, idx) => {
      lines.push(`INSERT OR REPLACE INTO race_time_buckets (race_id, bucket, pct, sort_order) VALUES
  (${esc(r.id)}, ${esc(tb.bucket)}, ${esc(tb.pct)}, ${idx});`);
    });
  }

  // race_course_highlights（レースレベル: category_id = NULL → メインカテゴリに振り分け）
  if (r.course_highlights && r.course_highlights.length > 0) {
    r.course_highlights.forEach((ch, idx) => {
      lines.push(`INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  (${esc(r.id)}, NULL, ${esc(ch.km)}, ${esc(ch.name_ja)}, ${esc(ch.name_en ?? null)}, ${esc(ch.note_ja ?? null)}, ${esc(ch.note_en ?? null)}, ${idx});`);
    });
  }

  // race_results
  if (r.result) {
    const res = r.result;
    lines.push(`INSERT OR REPLACE INTO race_results (race_id, participants_count, finishers_count, finisher_rate_pct, weather_condition_ja, weather_condition_en, temperature_c, max_temp_c, min_temp_c, wind_speed_ms, humidity_pct, notes_ja, notes_en, avg_time) VALUES
  (${esc(r.id)}, ${esc(res.participants_count ?? null)}, ${esc(res.finishers_count ?? null)}, ${esc(res.finisher_rate_pct ?? null)}, ${esc(res.weather_condition_ja || '')}, ${esc(res.weather_condition_en || '')}, ${esc(res.temperature_c ?? null)}, ${esc(res.max_temp_c ?? null)}, ${esc(res.min_temp_c ?? null)}, ${esc(res.wind_speed_ms ?? null)}, ${esc(res.humidity_pct ?? null)}, ${esc(res.notes_ja ?? null)}, ${esc(res.notes_en ?? null)}, ${esc(res.avg_time ?? null)});`);
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

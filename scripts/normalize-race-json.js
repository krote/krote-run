/**
 * normalize-race-json.js
 *
 * src/data/races/*.json を読み込み、最新の型定義に合わせてフィールドを補完・正規化する。
 * - result: null を追加（未開催分）
 * - entry_fee_by_category の補完
 * - course_info.notes_ja/en の補完
 * - categories の各サブフィールド補完
 * - 既存データは上書きしない（欠落フィールドのみ追加）
 */

const fs = require('fs');
const path = require('path');

const RACES_DIR = path.join(__dirname, '../src/data/races');

const files = fs.readdirSync(RACES_DIR)
  .filter(f => f.endsWith('.json') && f !== 'index.json')
  .sort();

let updated = 0;

for (const file of files) {
  const filePath = path.join(RACES_DIR, file);
  const original = fs.readFileSync(filePath, 'utf-8');
  const r = JSON.parse(original);
  let changed = false;

  // ── トップレベルフィールド ──────────────────────────────

  if (!('entry_fee_by_category' in r)) {
    r.entry_fee_by_category = false;
    changed = true;
  }

  if (!('result' in r)) {
    r.result = null;
    changed = true;
  }

  // ── course_info ─────────────────────────────────────────

  if (r.course_info) {
    if (!('notes_ja' in r.course_info)) {
      r.course_info.notes_ja = null;
      changed = true;
    }
    if (!('notes_en' in r.course_info)) {
      r.course_info.notes_en = null;
      changed = true;
    }
  }

  // ── categories ──────────────────────────────────────────

  if (Array.isArray(r.categories)) {
    r.categories = r.categories.map(cat => {
      const updated = { ...cat };
      let catChanged = false;

      const defaults = {
        entry_fee: null,
        entry_fee_u25: null,
        name_ja: null,
        name_en: null,
        description_ja: null,
        description_en: null,
        waves: null,
      };

      for (const [key, val] of Object.entries(defaults)) {
        if (!(key in updated)) {
          updated[key] = val;
          catChanged = true;
        }
      }

      if (catChanged) changed = true;
      return updated;
    });
  }

  // ── フィールド順序を型定義に合わせて整理 ────────────────

  const ordered = {
    id:                    r.id,
    name_ja:               r.name_ja,
    name_en:               r.name_en,
    date:                  r.date,
    prefecture:            r.prefecture,
    city_ja:               r.city_ja,
    city_en:               r.city_en,
    description_ja:        r.description_ja,
    description_en:        r.description_en,
    official_url:          r.official_url,
    entry_fee:             r.entry_fee ?? null,
    entry_fee_by_category: r.entry_fee_by_category,
    entry_capacity:        r.entry_capacity,
    entry_start_date:      r.entry_start_date ?? null,
    entry_end_date:        r.entry_end_date ?? null,
    reception_type:        r.reception_type,
    reception_note_ja:     r.reception_note_ja ?? '',
    reception_note_en:     r.reception_note_en ?? '',
    tags:                  r.tags ?? [],
    course_gpx_file:       r.course_gpx_file ?? null,
    course_info:           r.course_info,
    categories:            r.categories,
    aid_stations:          r.aid_stations ?? [],
    checkpoints:           r.checkpoints ?? [],
    access_points:         r.access_points ?? [],
    nearby_spots:          r.nearby_spots ?? [],
    weather_history:       r.weather_history ?? [],
    participation_gifts:   r.participation_gifts ?? [],
    result:                r.result,
    created_at:            r.created_at,
    updated_at:            r.updated_at,
    // _metadata は末尾に保持
    ...(r._metadata ? { _metadata: r._metadata } : {}),
  };

  const newContent = JSON.stringify(ordered, null, 2) + '\n';

  // 実際に内容が変わった場合のみ書き込む
  if (newContent !== original) {
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`✓ ${file}`);
    updated++;
  }
}

console.log(`\n完了: ${updated}/${files.length} ファイルを更新しました。`);

-- Issue #37: エントリー情報拡張
-- 1. races.entry_closed: 定員到達等で受付終了フラグ
-- 2. race_categories.eligibility_ja/en: 参加資格
-- 3. race_entry_links: 外部エントリーサイトへのリンク

ALTER TABLE races ADD COLUMN entry_closed INTEGER NOT NULL DEFAULT 0;

ALTER TABLE race_categories ADD COLUMN eligibility_ja TEXT;
ALTER TABLE race_categories ADD COLUMN eligibility_en TEXT;

CREATE TABLE IF NOT EXISTS race_entry_links (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  race_id TEXT NOT NULL REFERENCES races(id) ON DELETE CASCADE,
  site_name TEXT NOT NULL,
  url TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS race_entry_links_race_id_idx ON race_entry_links(race_id);

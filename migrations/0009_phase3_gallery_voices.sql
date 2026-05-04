-- Phase 3: race_gallery / race_voices / race_time_buckets / race_course_highlights テーブルを追加

CREATE TABLE IF NOT EXISTS race_gallery (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  race_id    TEXT NOT NULL REFERENCES races(id) ON DELETE CASCADE,
  src        TEXT NOT NULL,
  caption_ja TEXT,
  caption_en TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS race_gallery_race_id_idx ON race_gallery(race_id);

CREATE TABLE IF NOT EXISTS race_voices (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  race_id    TEXT NOT NULL REFERENCES races(id) ON DELETE CASCADE,
  quote_ja   TEXT NOT NULL,
  author     TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS race_voices_race_id_idx ON race_voices(race_id);

CREATE TABLE IF NOT EXISTS race_time_buckets (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  race_id    TEXT NOT NULL REFERENCES races(id) ON DELETE CASCADE,
  bucket     TEXT NOT NULL,
  pct        REAL NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS race_time_buckets_race_id_idx ON race_time_buckets(race_id);

CREATE TABLE IF NOT EXISTS race_course_highlights (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  race_id    TEXT NOT NULL REFERENCES races(id) ON DELETE CASCADE,
  km         REAL NOT NULL,
  name_ja    TEXT NOT NULL,
  name_en    TEXT,
  note_ja    TEXT,
  note_en    TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS race_course_highlights_race_id_idx ON race_course_highlights(race_id);

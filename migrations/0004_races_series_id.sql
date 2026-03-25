-- races テーブルに series_id 外部キーを追加
ALTER TABLE races ADD COLUMN series_id TEXT REFERENCES race_series(id);

-- 既存レースのseries_idをレースIDの末尾-YYYYを除いた値で埋める
-- 例: 'tokyo-marathon-2026' → 'tokyo-marathon'
UPDATE races SET series_id = SUBSTR(id, 1, LENGTH(id) - 5)
WHERE id GLOB '*-[0-9][0-9][0-9][0-9]';

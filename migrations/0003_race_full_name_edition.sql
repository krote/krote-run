-- Migration: races テーブルに正式名称・回次フィールドを追加
ALTER TABLE races ADD COLUMN full_name_ja TEXT;
ALTER TABLE races ADD COLUMN full_name_en TEXT;
ALTER TABLE races ADD COLUMN edition INTEGER;

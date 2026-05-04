-- Phase 2: races テーブルにビジュアル拡張フィールドを追加
ALTER TABLE races ADD COLUMN motif TEXT;
ALTER TABLE races ADD COLUMN motif_color TEXT;
ALTER TABLE races ADD COLUMN motif_romaji TEXT;
ALTER TABLE races ADD COLUMN tagline_ja TEXT;
ALTER TABLE races ADD COLUMN tagline_en TEXT;
ALTER TABLE races ADD COLUMN hero_image_url TEXT;
ALTER TABLE races ADD COLUMN hero_caption_ja TEXT;
ALTER TABLE races ADD COLUMN hero_caption_en TEXT;

-- Phase 2: race_results テーブルに平均フィニッシュタイムを追加
ALTER TABLE race_results ADD COLUMN avg_time TEXT;

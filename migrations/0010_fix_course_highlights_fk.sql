-- race_course_highlights.category_id FK を ON DELETE CASCADE に修正
-- schema.ts では onDelete: "cascade" と定義しているが、
-- 0007_yielding_obadiah_stane.sql が ALTER TABLE で追加した際に ON DELETE 句が欠落していた。
-- SQLite は ALTER TABLE ... DROP CONSTRAINT が使えないためテーブル再作成で対応する。

CREATE TABLE `race_course_highlights_new` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `race_id` text NOT NULL,
  `km` real,
  `name_ja` text NOT NULL,
  `name_en` text,
  `note_ja` text,
  `note_en` text,
  `sort_order` integer DEFAULT 0 NOT NULL,
  `category_id` integer,
  FOREIGN KEY (`race_id`) REFERENCES `races`(`id`) ON UPDATE no action ON DELETE cascade,
  FOREIGN KEY (`category_id`) REFERENCES `race_categories`(`id`) ON UPDATE no action ON DELETE cascade
);
INSERT INTO `race_course_highlights_new` (`id`, `race_id`, `km`, `name_ja`, `name_en`, `note_ja`, `note_en`, `sort_order`, `category_id`)
  SELECT `id`, `race_id`, `km`, `name_ja`, `name_en`, `note_ja`, `note_en`, `sort_order`, `category_id`
  FROM `race_course_highlights`;
DROP TABLE `race_course_highlights`;
ALTER TABLE `race_course_highlights_new` RENAME TO `race_course_highlights`;
CREATE INDEX `race_course_highlights_race_id_idx` ON `race_course_highlights` (`race_id`);

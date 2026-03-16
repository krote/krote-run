-- entry_start_date / entry_end_date を NULL 許容に変更
-- SQLite は ALTER COLUMN 非対応のため、テーブル再作成で対応

PRAGMA foreign_keys=OFF;
--> statement-breakpoint

CREATE TABLE `races_new` (
	`id` text PRIMARY KEY NOT NULL,
	`name_ja` text NOT NULL,
	`name_en` text NOT NULL,
	`date` text NOT NULL,
	`prefecture` text NOT NULL,
	`city_ja` text NOT NULL,
	`city_en` text NOT NULL,
	`description_ja` text DEFAULT '' NOT NULL,
	`description_en` text DEFAULT '' NOT NULL,
	`official_url` text DEFAULT '' NOT NULL,
	`entry_fee` integer,
	`entry_fee_by_category` integer DEFAULT false NOT NULL,
	`entry_capacity` integer DEFAULT 0 NOT NULL,
	`entry_start_date` text,
	`entry_end_date` text,
	`reception_type` text DEFAULT 'race_day' NOT NULL,
	`reception_note_ja` text DEFAULT '' NOT NULL,
	`reception_note_en` text DEFAULT '' NOT NULL,
	`tags` text DEFAULT '[]' NOT NULL,
	`course_gpx_file` text,
	`course_max_elevation_m` real DEFAULT 0 NOT NULL,
	`course_min_elevation_m` real DEFAULT 0 NOT NULL,
	`course_elevation_diff_m` real DEFAULT 0 NOT NULL,
	`course_surface` text DEFAULT 'road' NOT NULL,
	`course_certification` text DEFAULT '[]' NOT NULL,
	`course_highlights_ja` text DEFAULT '' NOT NULL,
	`course_highlights_en` text DEFAULT '' NOT NULL,
	`course_notes_ja` text,
	`course_notes_en` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint

INSERT INTO `races_new` SELECT * FROM `races`;
--> statement-breakpoint

DROP TABLE `races`;
--> statement-breakpoint

ALTER TABLE `races_new` RENAME TO `races`;
--> statement-breakpoint

CREATE INDEX `races_date_idx` ON `races` (`date`);
--> statement-breakpoint
CREATE INDEX `races_prefecture_idx` ON `races` (`prefecture`);
--> statement-breakpoint

PRAGMA foreign_keys=ON;

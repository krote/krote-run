CREATE TABLE `race_entry_periods` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`race_id` text NOT NULL,
	`category_id` integer,
	`label_ja` text DEFAULT '一般エントリー' NOT NULL,
	`label_en` text DEFAULT 'General Entry' NOT NULL,
	`start_date` text NOT NULL,
	`end_date` text NOT NULL,
	`entry_fee` integer,
	`sort_order` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`race_id`) REFERENCES `races`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`category_id`) REFERENCES `race_categories`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `race_entry_periods_race_id_idx` ON `race_entry_periods` (`race_id`);--> statement-breakpoint
CREATE TABLE `race_results` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`race_id` text NOT NULL,
	`participants_count` integer,
	`finishers_count` integer,
	`finisher_rate_pct` real,
	`weather_condition_ja` text DEFAULT '' NOT NULL,
	`weather_condition_en` text DEFAULT '' NOT NULL,
	`temperature_c` real,
	`max_temp_c` real,
	`min_temp_c` real,
	`wind_speed_ms` real,
	`humidity_pct` real,
	`notes_ja` text,
	`notes_en` text,
	FOREIGN KEY (`race_id`) REFERENCES `races`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `race_results_race_id_idx` ON `race_results` (`race_id`);--> statement-breakpoint
CREATE TABLE `race_series` (
	`id` text PRIMARY KEY NOT NULL,
	`name_ja` text NOT NULL,
	`name_en` text NOT NULL,
	`first_held_year` integer,
	`website_url` text
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_races` (
	`id` text PRIMARY KEY NOT NULL,
	`name_ja` text NOT NULL,
	`name_en` text NOT NULL,
	`series_id` text,
	`full_name_ja` text,
	`full_name_en` text,
	`edition` integer,
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
	`updated_at` text NOT NULL,
	FOREIGN KEY (`series_id`) REFERENCES `race_series`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_races`("id", "name_ja", "name_en", "series_id", "full_name_ja", "full_name_en", "edition", "date", "prefecture", "city_ja", "city_en", "description_ja", "description_en", "official_url", "entry_fee", "entry_fee_by_category", "entry_capacity", "entry_start_date", "entry_end_date", "reception_type", "reception_note_ja", "reception_note_en", "tags", "course_gpx_file", "course_max_elevation_m", "course_min_elevation_m", "course_elevation_diff_m", "course_surface", "course_certification", "course_highlights_ja", "course_highlights_en", "course_notes_ja", "course_notes_en", "created_at", "updated_at") SELECT "id", "name_ja", "name_en", "series_id", "full_name_ja", "full_name_en", "edition", "date", "prefecture", "city_ja", "city_en", "description_ja", "description_en", "official_url", "entry_fee", "entry_fee_by_category", "entry_capacity", "entry_start_date", "entry_end_date", "reception_type", "reception_note_ja", "reception_note_en", "tags", "course_gpx_file", "course_max_elevation_m", "course_min_elevation_m", "course_elevation_diff_m", "course_surface", "course_certification", "course_highlights_ja", "course_highlights_en", "course_notes_ja", "course_notes_en", "created_at", "updated_at" FROM `races`;--> statement-breakpoint
DROP TABLE `races`;--> statement-breakpoint
ALTER TABLE `__new_races` RENAME TO `races`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE INDEX `races_date_idx` ON `races` (`date`);--> statement-breakpoint
CREATE INDEX `races_prefecture_idx` ON `races` (`prefecture`);
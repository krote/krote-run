CREATE TABLE `access_points` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`race_id` text NOT NULL,
	`station_name_ja` text NOT NULL,
	`station_name_en` text DEFAULT '' NOT NULL,
	`station_code` text DEFAULT '' NOT NULL,
	`transport_to_venue_ja` text DEFAULT '' NOT NULL,
	`transport_to_venue_en` text DEFAULT '' NOT NULL,
	`latitude` real DEFAULT 0 NOT NULL,
	`longitude` real DEFAULT 0 NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`race_id`) REFERENCES `races`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `access_points_race_id_idx` ON `access_points` (`race_id`);--> statement-breakpoint
CREATE TABLE `aid_stations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`race_id` text NOT NULL,
	`distance_km` real NOT NULL,
	`offerings_ja` text DEFAULT '' NOT NULL,
	`offerings_en` text DEFAULT '' NOT NULL,
	`is_featured` integer DEFAULT false NOT NULL,
	FOREIGN KEY (`race_id`) REFERENCES `races`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `aid_stations_race_id_idx` ON `aid_stations` (`race_id`);--> statement-breakpoint
CREATE TABLE `checkpoints` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`race_id` text NOT NULL,
	`distance_km` real NOT NULL,
	`closing_time` text NOT NULL,
	FOREIGN KEY (`race_id`) REFERENCES `races`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `checkpoints_race_id_idx` ON `checkpoints` (`race_id`);--> statement-breakpoint
CREATE TABLE `gift_categories` (
	`id` text PRIMARY KEY NOT NULL,
	`name_ja` text NOT NULL,
	`name_en` text NOT NULL,
	`icon` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `nearby_spots` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`race_id` text NOT NULL,
	`type` text NOT NULL,
	`name_ja` text NOT NULL,
	`name_en` text DEFAULT '' NOT NULL,
	`description_ja` text DEFAULT '' NOT NULL,
	`description_en` text DEFAULT '' NOT NULL,
	`distance_from_venue` text DEFAULT '' NOT NULL,
	`url` text,
	`latitude` real DEFAULT 0 NOT NULL,
	`longitude` real DEFAULT 0 NOT NULL,
	FOREIGN KEY (`race_id`) REFERENCES `races`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `nearby_spots_race_id_idx` ON `nearby_spots` (`race_id`);--> statement-breakpoint
CREATE TABLE `participation_gifts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`race_id` text NOT NULL,
	`gift_categories` text DEFAULT '[]' NOT NULL,
	`description_ja` text DEFAULT '' NOT NULL,
	`description_en` text DEFAULT '' NOT NULL,
	`image` text,
	`sort_order` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`race_id`) REFERENCES `races`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `participation_gifts_race_id_idx` ON `participation_gifts` (`race_id`);--> statement-breakpoint
CREATE TABLE `prefectures` (
	`code` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`name_en` text NOT NULL,
	`region` text NOT NULL,
	`region_en` text NOT NULL,
	`lat` real NOT NULL,
	`lng` real NOT NULL
);
--> statement-breakpoint
CREATE TABLE `race_categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`race_id` text NOT NULL,
	`distance_type` text NOT NULL,
	`distance_km` real NOT NULL,
	`time_limit_minutes` integer DEFAULT 0 NOT NULL,
	`start_time` text DEFAULT '' NOT NULL,
	`capacity` integer DEFAULT 0 NOT NULL,
	`entry_fee` integer,
	`entry_fee_u25` integer,
	`name_ja` text,
	`name_en` text,
	`description_ja` text,
	`description_en` text,
	`waves` text DEFAULT '[]' NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`race_id`) REFERENCES `races`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `race_categories_race_id_idx` ON `race_categories` (`race_id`);--> statement-breakpoint
CREATE TABLE `races` (
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
	`entry_start_date` text NOT NULL,
	`entry_end_date` text NOT NULL,
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
CREATE INDEX `races_date_idx` ON `races` (`date`);--> statement-breakpoint
CREATE INDEX `races_prefecture_idx` ON `races` (`prefecture`);--> statement-breakpoint
CREATE TABLE `weather_history` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`race_id` text NOT NULL,
	`year` integer NOT NULL,
	`avg_temp` real DEFAULT 0 NOT NULL,
	`max_temp` real DEFAULT 0 NOT NULL,
	`min_temp` real DEFAULT 0 NOT NULL,
	`humidity_pct` real DEFAULT 0 NOT NULL,
	`precipitation_mm` real DEFAULT 0 NOT NULL,
	`wind_speed_ms` real DEFAULT 0 NOT NULL,
	FOREIGN KEY (`race_id`) REFERENCES `races`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `weather_history_race_id_idx` ON `weather_history` (`race_id`);
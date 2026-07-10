CREATE TABLE `reception_sessions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`race_id` text NOT NULL,
	`date` text NOT NULL,
	`open_time` text,
	`close_time` text,
	`location_ja` text DEFAULT '' NOT NULL,
	`location_en` text DEFAULT '' NOT NULL,
	`note_ja` text DEFAULT '' NOT NULL,
	`note_en` text DEFAULT '' NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`race_id`) REFERENCES `races`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `reception_sessions_race_id_idx` ON `reception_sessions` (`race_id`);
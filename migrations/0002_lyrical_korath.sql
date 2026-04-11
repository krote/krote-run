CREATE TABLE `user_races` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`race_id` text NOT NULL,
	`is_planning` integer DEFAULT false NOT NULL,
	`gcal_race_event_id` text,
	`entry_reminder` integer DEFAULT false NOT NULL,
	`gcal_entry_event_id` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`race_id`) REFERENCES `races`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `user_races_user_id_idx` ON `user_races` (`user_id`);--> statement-breakpoint
CREATE INDEX `user_races_race_id_idx` ON `user_races` (`race_id`);--> statement-breakpoint
CREATE INDEX `user_races_user_race_idx` ON `user_races` (`user_id`,`race_id`);

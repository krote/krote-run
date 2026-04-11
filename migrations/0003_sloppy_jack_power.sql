ALTER TABLE `user_races` DROP COLUMN `entry_reminder`;
--> statement-breakpoint
ALTER TABLE `user_races` DROP COLUMN `gcal_entry_event_id`;
--> statement-breakpoint
ALTER TABLE `user_races` ADD `planning_category_id` integer REFERENCES `race_categories`(`id`) ON UPDATE no action ON DELETE set null;
--> statement-breakpoint
ALTER TABLE `user_races` ADD `entry_reminder_period_ids` text DEFAULT '[]' NOT NULL;
--> statement-breakpoint
ALTER TABLE `user_races` ADD `gcal_entry_event_ids` text DEFAULT '{}' NOT NULL;

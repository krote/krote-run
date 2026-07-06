CREATE TABLE `user_gear` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`category` text NOT NULL,
	`brand` text DEFAULT '' NOT NULL,
	`name` text NOT NULL,
	`amazon_url` text,
	`asin` text,
	`usage_tag` text DEFAULT 'both' NOT NULL,
	`memo` text DEFAULT '' NOT NULL,
	`is_retired` integer DEFAULT false NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `user_gear_user_id_idx` ON `user_gear` (`user_id`);--> statement-breakpoint
CREATE TABLE `user_race_gear` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_race_id` text NOT NULL,
	`gear_id` text NOT NULL,
	`quantity` integer DEFAULT 1 NOT NULL,
	`used` integer,
	`used_quantity` integer,
	`note` text DEFAULT '' NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`user_race_id`) REFERENCES `user_races`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`gear_id`) REFERENCES `user_gear`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `user_race_gear_user_race_id_idx` ON `user_race_gear` (`user_race_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_race_gear_unique_idx` ON `user_race_gear` (`user_race_id`,`gear_id`);--> statement-breakpoint
CREATE TABLE `user_race_results` (
	`id` text PRIMARY KEY NOT NULL,
	`user_race_id` text NOT NULL,
	`category_id` integer,
	`status` text NOT NULL,
	`finish_time_sec` integer,
	`note` text DEFAULT '' NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`user_race_id`) REFERENCES `user_races`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`category_id`) REFERENCES `race_categories`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_race_results_user_race_id_unique` ON `user_race_results` (`user_race_id`);--> statement-breakpoint
CREATE INDEX `user_race_results_user_race_id_idx` ON `user_race_results` (`user_race_id`);--> statement-breakpoint
ALTER TABLE `user_races` ADD `gear_is_public` integer DEFAULT false NOT NULL;
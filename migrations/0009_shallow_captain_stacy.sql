CREATE TABLE `completion_gifts` (
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
CREATE INDEX `completion_gifts_race_id_idx` ON `completion_gifts` (`race_id`);
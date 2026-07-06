CREATE TABLE `race_travel_times` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`race_id` text NOT NULL,
	`hub_id` text NOT NULL,
	`duration_minutes` integer NOT NULL,
	`departure_time` text,
	`calculated_at` text NOT NULL,
	FOREIGN KEY (`race_id`) REFERENCES `races`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `race_travel_times_race_hub_idx` ON `race_travel_times` (`race_id`,`hub_id`);
ALTER TABLE `access_points` ADD `walk_minutes` integer;--> statement-breakpoint
ALTER TABLE `access_points` ADD `is_primary` integer DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `races` ADD `venue_name_ja` text;--> statement-breakpoint
ALTER TABLE `races` ADD `venue_name_en` text;--> statement-breakpoint
ALTER TABLE `races` ADD `venue_address` text;--> statement-breakpoint
ALTER TABLE `races` ADD `start_lat` real;--> statement-breakpoint
ALTER TABLE `races` ADD `start_lng` real;
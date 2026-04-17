CREATE TABLE `contact_submissions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`category` text NOT NULL,
	`message` text NOT NULL,
	`user_id` text,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE INDEX `contact_submissions_status_idx` ON `contact_submissions` (`status`);--> statement-breakpoint
CREATE INDEX `contact_submissions_created_at_idx` ON `contact_submissions` (`created_at`);

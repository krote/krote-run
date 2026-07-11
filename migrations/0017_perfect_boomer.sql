ALTER TABLE `contact_submissions` ADD `ip_address` text;--> statement-breakpoint
ALTER TABLE `contact_submissions` ADD `user_agent` text;--> statement-breakpoint
CREATE INDEX `contact_submissions_ip_created_idx` ON `contact_submissions` (`ip_address`,`created_at`);
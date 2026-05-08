-- race_course_highlights.km を NOT NULL → nullable に変更（SQLite はテーブル再構築が必要）
CREATE TABLE `race_course_highlights_new` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`race_id` text NOT NULL,
	`km` real,
	`name_ja` text NOT NULL,
	`name_en` text,
	`note_ja` text,
	`note_en` text,
	`sort_order` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`race_id`) REFERENCES `races`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `race_course_highlights_new` SELECT `id`, `race_id`, `km`, `name_ja`, `name_en`, `note_ja`, `note_en`, `sort_order` FROM `race_course_highlights`;
--> statement-breakpoint
DROP TABLE `race_course_highlights`;
--> statement-breakpoint
ALTER TABLE `race_course_highlights_new` RENAME TO `race_course_highlights`;
--> statement-breakpoint
CREATE INDEX `race_course_highlights_race_id_idx` ON `race_course_highlights` (`race_id`);

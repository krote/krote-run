PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_race_entry_periods` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`race_id` text NOT NULL,
	`category_id` integer,
	`label_ja` text DEFAULT '一般エントリー' NOT NULL,
	`label_en` text DEFAULT 'General Entry' NOT NULL,
	`start_date` text NOT NULL,
	`end_date` text,
	`entry_fee` integer,
	`sort_order` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`race_id`) REFERENCES `races`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`category_id`) REFERENCES `race_categories`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_race_entry_periods`("id", "race_id", "category_id", "label_ja", "label_en", "start_date", "end_date", "entry_fee", "sort_order") SELECT "id", "race_id", "category_id", "label_ja", "label_en", "start_date", "end_date", "entry_fee", "sort_order" FROM `race_entry_periods`;--> statement-breakpoint
DROP TABLE `race_entry_periods`;--> statement-breakpoint
ALTER TABLE `__new_race_entry_periods` RENAME TO `race_entry_periods`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE INDEX `race_entry_periods_race_id_idx` ON `race_entry_periods` (`race_id`);
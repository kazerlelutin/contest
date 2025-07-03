PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_challengers` (
	`id` text PRIMARY KEY DEFAULT '0197cf1e-34a0-7845-43b7-d03819586f75' NOT NULL,
	`contest_id` text,
	`name` text,
	`email` text,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP,
	`updated_at` integer DEFAULT CURRENT_TIMESTAMP,
	`deleted_at` integer,
	`is_active` integer DEFAULT 1,
	FOREIGN KEY (`contest_id`) REFERENCES `contests `(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_challengers`("id", "contest_id", "name", "email", "created_at", "updated_at", "deleted_at", "is_active") SELECT "id", "contest_id", "name", "email", "created_at", "updated_at", "deleted_at", "is_active" FROM `challengers`;--> statement-breakpoint
DROP TABLE `challengers`;--> statement-breakpoint
ALTER TABLE `__new_challengers` RENAME TO `challengers`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_contests ` (
	`id` text PRIMARY KEY DEFAULT '0197cf1e-349c-7ff2-95ac-0875c8ceb841' NOT NULL,
	`name` text,
	`gift` text,
	`key` text DEFAULT '0197cf1e-349f-735e-0b40-c3ffdac55629',
	`min_challengers` integer,
	`max_challengers` integer,
	`start_date` integer,
	`end_date` integer,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP,
	`updated_at` integer DEFAULT CURRENT_TIMESTAMP,
	`deleted_at` integer,
	`is_active` integer DEFAULT 1
);
--> statement-breakpoint
INSERT INTO `__new_contests `("id", "name", "gift", "key", "min_challengers", "max_challengers", "start_date", "end_date", "created_at", "updated_at", "deleted_at", "is_active") SELECT "id", "name", "gift", "key", "min_challengers", "max_challengers", "start_date", "end_date", "created_at", "updated_at", "deleted_at", "is_active" FROM `contests `;--> statement-breakpoint
DROP TABLE `contests `;--> statement-breakpoint
ALTER TABLE `__new_contests ` RENAME TO `contests `;
CREATE TABLE `challengers` (
	`id` text PRIMARY KEY DEFAULT '0197d0ec-2b77-7893-6216-c1cb57c6d061' NOT NULL,
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
CREATE TABLE `contests ` (
	`id` text PRIMARY KEY DEFAULT '0197d0ec-2b76-7fa9-1266-ee833a327893' NOT NULL,
	`name` text,
	`gift` text,
	`key` text DEFAULT '0197d0ec-2b76-7997-bc90-94ff5a0d419f',
	`min_challengers` integer,
	`max_challengers` integer,
	`start_date` integer,
	`end_date` integer,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP,
	`updated_at` integer DEFAULT CURRENT_TIMESTAMP,
	`deleted_at` integer,
	`is_active` integer DEFAULT 1
);

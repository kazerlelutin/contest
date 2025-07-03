CREATE TABLE `challengers` (
	`id` integer PRIMARY KEY NOT NULL,
	`contest_id` integer,
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
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`gift` text,
	`key` text DEFAULT '0197c7bb-c22d-788d-c93c-b9699620593a',
	`min_challengers` integer,
	`max_challengers` integer,
	`start_date` integer,
	`end_date` integer,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP,
	`updated_at` integer DEFAULT CURRENT_TIMESTAMP,
	`deleted_at` integer,
	`is_active` integer DEFAULT 1
);

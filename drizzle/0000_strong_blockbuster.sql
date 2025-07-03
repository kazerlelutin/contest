CREATE TABLE `challengers` (
	`id` text PRIMARY KEY DEFAULT '0197d0e0-3358-7545-a32d-fb79dcd87a72' NOT NULL,
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
	`id` text PRIMARY KEY DEFAULT '0197d0e0-3356-784e-e43f-a8f2e0201538' NOT NULL,
	`name` text,
	`gift` text,
	`key` text DEFAULT '0197d0e0-3357-7420-1b39-5a865593c26b',
	`min_challengers` integer,
	`max_challengers` integer,
	`start_date` integer,
	`end_date` integer,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP,
	`updated_at` integer DEFAULT CURRENT_TIMESTAMP,
	`deleted_at` integer,
	`is_active` integer DEFAULT 1
);

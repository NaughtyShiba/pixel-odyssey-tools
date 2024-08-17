CREATE TABLE `destinations` (
	`id` text PRIMARY KEY NOT NULL,
	`location` text NOT NULL,
	`description` text
);
--> statement-breakpoint
CREATE TABLE `enemies` (
	`id` text PRIMARY KEY NOT NULL,
	`location` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `enemiesToLocations` (
	`destination_id` integer NOT NULL,
	`enemy_id` integer NOT NULL,
	PRIMARY KEY(`destination_id`, `enemy_id`),
	FOREIGN KEY (`destination_id`) REFERENCES `destinations`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`enemy_id`) REFERENCES `enemies`(`id`) ON UPDATE no action ON DELETE no action
);

CREATE TABLE `craftRecipes` (
	`material_id` text,
	`amount` integer,
	`crafted_item` text,
	PRIMARY KEY(`material_id`, `crafted_item`),
	FOREIGN KEY (`material_id`) REFERENCES `items`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`crafted_item`) REFERENCES `items`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `destinations` (
	`id` text PRIMARY KEY NOT NULL,
	`label` text NOT NULL,
	`description` text
);
--> statement-breakpoint
CREATE TABLE `enemies` (
	`id` text PRIMARY KEY NOT NULL,
	`label` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `enemiesToLocations` (
	`destination_id` text NOT NULL,
	`enemy_id` text NOT NULL,
	PRIMARY KEY(`destination_id`, `enemy_id`),
	FOREIGN KEY (`destination_id`) REFERENCES `destinations`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`enemy_id`) REFERENCES `enemies`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `enemyDrops` (
	`item_id` text NOT NULL,
	`enemy_id` text NOT NULL,
	`drop_chance` integer,
	PRIMARY KEY(`item_id`, `enemy_id`),
	FOREIGN KEY (`item_id`) REFERENCES `items`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`enemy_id`) REFERENCES `enemies`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `items` (
	`id` text PRIMARY KEY NOT NULL,
	`label` text NOT NULL,
	`type` text NOT NULL,
	`slot` text,
	`stats` text
);
--> statement-breakpoint
CREATE TABLE `itemsToDestinations` (
	`destination_id` text NOT NULL,
	`item_id` text NOT NULL,
	PRIMARY KEY(`destination_id`, `item_id`),
	FOREIGN KEY (`destination_id`) REFERENCES `destinations`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`item_id`) REFERENCES `items`(`id`) ON UPDATE no action ON DELETE no action
);

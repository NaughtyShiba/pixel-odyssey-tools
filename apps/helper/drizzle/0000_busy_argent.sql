CREATE TABLE IF NOT EXISTS "craftRecipes" (
	"material_id" text,
	"amount" integer,
	"crafted_item" text,
	CONSTRAINT "craftRecipes_composite_key" PRIMARY KEY("material_id","crafted_item")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "destinations" (
	"id" text PRIMARY KEY NOT NULL,
	"label" text NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "enemies" (
	"id" text PRIMARY KEY NOT NULL,
	"label" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "enemiesToLocations" (
	"destination_id" text NOT NULL,
	"enemy_id" text NOT NULL,
	CONSTRAINT "enemiesToLocations_composite_key" PRIMARY KEY("destination_id","enemy_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "enemyDrops" (
	"item_id" text NOT NULL,
	"enemy_id" text NOT NULL,
	"drop_chance" integer,
	CONSTRAINT "enemyDrops_composite_key" PRIMARY KEY("item_id","enemy_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "items" (
	"id" text PRIMARY KEY NOT NULL,
	"label" text NOT NULL,
	"type" text NOT NULL,
	"slot" text,
	"stats" json
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "itemsToDestinations" (
	"destination_id" text NOT NULL,
	"item_id" text NOT NULL,
	CONSTRAINT "itemsToDestinations_composite_key" PRIMARY KEY("destination_id","item_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "craftRecipes" ADD CONSTRAINT "craftRecipes_material_id_items_id_fk" FOREIGN KEY ("material_id") REFERENCES "public"."items"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "craftRecipes" ADD CONSTRAINT "craftRecipes_crafted_item_items_id_fk" FOREIGN KEY ("crafted_item") REFERENCES "public"."items"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "enemiesToLocations" ADD CONSTRAINT "enemiesToLocations_destination_id_destinations_id_fk" FOREIGN KEY ("destination_id") REFERENCES "public"."destinations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "enemiesToLocations" ADD CONSTRAINT "enemiesToLocations_enemy_id_enemies_id_fk" FOREIGN KEY ("enemy_id") REFERENCES "public"."enemies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "enemyDrops" ADD CONSTRAINT "enemyDrops_item_id_items_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."items"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "enemyDrops" ADD CONSTRAINT "enemyDrops_enemy_id_enemies_id_fk" FOREIGN KEY ("enemy_id") REFERENCES "public"."enemies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "itemsToDestinations" ADD CONSTRAINT "itemsToDestinations_destination_id_destinations_id_fk" FOREIGN KEY ("destination_id") REFERENCES "public"."destinations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "itemsToDestinations" ADD CONSTRAINT "itemsToDestinations_item_id_items_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."items"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

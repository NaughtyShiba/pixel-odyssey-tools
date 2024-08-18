import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { primaryKey } from "drizzle-orm/sqlite-core";
import type { StatType } from "@/src/models/items/types";

export const destinations = sqliteTable("destinations", {
	id: text("id").primaryKey(),
	label: text("label").notNull(),
	description: text("description"),
});

export const enemies = sqliteTable("enemies", {
	id: text("id").primaryKey(),
	label: text("label").notNull(),
});

export const items = sqliteTable("items", {
	id: text("id").primaryKey(),
	label: text("label").notNull(),
	type: text("type").notNull(),
	slot: text("slot"),
	stats: text("stats", { mode: "json" }).$type<
		Partial<Record<StatType, number>>
	>(),
});

export const craftRecipes = sqliteTable(
	"craftRecipes",
	{
		materialId: text("material_id").references(() => items.id),
		amount: integer("amount"),
		craftedItem: text("crafted_item").references(() => items.id),
	},
	(t) => ({
		pk: primaryKey({ columns: [t.materialId, t.craftedItem] }),
	}),
);

export const recipesRelations = relations(craftRecipes, ({ one }) => ({
	material: one(items, {
		fields: [craftRecipes.materialId],
		references: [items.id],
	}),
	craft: one(items, {
		fields: [craftRecipes.craftedItem],
		references: [items.id],
	}),
}));

export const enemiesRelations = relations(enemies, ({ many }) => ({
	enemiesToDestinations: many(enemiesToDestinations),
	enemiesToItems: many(enemiesToItems),
}));
export const destinationsRelations = relations(enemies, ({ many }) => ({
	enemiesToDestinations: many(enemiesToDestinations),
	itemsToDestinations: many(itemsToDestinations),
}));
export const itemsRelations = relations(items, ({ many }) => ({
	enemiesToItems: many(enemiesToItems),
	itemsToDestinations: many(itemsToDestinations),
	craftRecipes: many(craftRecipes),
}));

export const enemiesToDestinations = sqliteTable(
	"enemiesToLocations",
	{
		destinationId: text("destination_id")
			.notNull()
			.references(() => destinations.id),
		enemyId: text("enemy_id")
			.notNull()
			.references(() => enemies.id),
	},
	(t) => ({
		pk: primaryKey({ columns: [t.destinationId, t.enemyId] }),
	}),
);

export const itemsToDestinations = sqliteTable(
	"itemsToDestinations",
	{
		destinationId: text("destination_id")
			.notNull()
			.references(() => destinations.id),
		itemId: text("item_id")
			.notNull()
			.references(() => items.id),
	},
	(t) => ({
		pk: primaryKey({ columns: [t.destinationId, t.itemId] }),
	}),
);

export const enemiesToItems = sqliteTable(
	"enemyDrops",
	{
		itemId: text("item_id")
			.notNull()
			.references(() => items.id),
		enemyId: text("enemy_id")
			.notNull()
			.references(() => enemies.id),
		chance: integer("drop_chance"),
	},
	(t) => ({
		pk: primaryKey({ columns: [t.itemId, t.enemyId] }),
	}),
);

export const itemsToDestinationsRelations = relations(
	itemsToDestinations,
	({ one }) => ({
		destination: one(destinations, {
			fields: [itemsToDestinations.destinationId],
			references: [destinations.id],
		}),
		item: one(items, {
			fields: [itemsToDestinations.itemId],
			references: [items.id],
		}),
	}),
);
export const enemiesToDestinationsRelations = relations(
	enemiesToDestinations,
	({ one }) => ({
		destination: one(destinations, {
			fields: [enemiesToDestinations.destinationId],
			references: [destinations.id],
		}),
		enemy: one(enemies, {
			fields: [enemiesToDestinations.enemyId],
			references: [enemies.id],
		}),
	}),
);
export const enemiesToItemsRelations = relations(enemiesToItems, ({ one }) => ({
	item: one(items, {
		fields: [enemiesToItems.itemId],
		references: [items.id],
	}),
	enemy: one(enemies, {
		fields: [enemiesToItems.enemyId],
		references: [enemies.id],
	}),
}));

export type Location = typeof destinations.$inferSelect;
export type InsertLocation = typeof destinations.$inferInsert;
export type Enemy = typeof enemies.$inferSelect;
export type InsertEnemy = typeof enemies.$inferInsert;
export type Item = typeof items.$inferSelect;
export type InsertItem = typeof items.$inferInsert;

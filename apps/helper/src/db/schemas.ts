import { text, pgTable, integer, json } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { primaryKey } from "drizzle-orm/pg-core";
import type { StatType } from "@/models/items/types";
// import type { AdapterAccountType } from "next-auth/adapters";

// === DESTINATIONS ===

export const destinations = pgTable("destinations", {
	id: text("id").primaryKey(),
	label: text("label").notNull(),
	description: text("description"),
});

export const destinationsRelations = relations(destinations, ({ many }) => ({
	enemies: many(enemiesToDestinations),
	items: many(itemsToDestinations),
}));

// === ENEMIES ===

export const enemies = pgTable("enemies", {
	id: text("id").primaryKey(),
	label: text("label").notNull(),
});
export const enemiesRelations = relations(enemies, ({ many }) => ({
	destinations: many(enemiesToDestinations),
	items: many(enemiesToItems),
}));

// === ITEMS ===

export const items = pgTable("items", {
	id: text("id").primaryKey(),
	label: text("label").notNull(),
	type: text("type").notNull(),
	slot: text("slot"),
	stats: json("stats").$type<Partial<Record<StatType, number>>>(),
});
export const itemsRelations = relations(items, ({ many }) => ({
	enemies: many(enemiesToItems),
	destinations: many(itemsToDestinations),
	materialForRecipes: many(craftRecipes, {
		relationName: "materialForRecipes",
	}),
	craftedFromRecipes: many(craftRecipes, {
		relationName: "craftedFromRecipes",
	}),
}));

// === RECIPES ===

export const craftRecipes = pgTable(
	"craftRecipes",
	{
		materialId: text("material_id").references(() => items.id),
		amount: integer("amount"),
		craftedItem: text("crafted_item").references(() => items.id),
	},
	(t) => ({
		cpk: primaryKey({
			name: "craftRecipes_composite_key",
			columns: [t.materialId, t.craftedItem],
		}),
	}),
);

export const recipesRelations = relations(craftRecipes, ({ one }) => ({
	material: one(items, {
		fields: [craftRecipes.materialId],
		references: [items.id],
		relationName: "materialForRecipes",
	}),
	craft: one(items, {
		fields: [craftRecipes.craftedItem],
		references: [items.id],
		relationName: "craftedFromRecipes",
	}),
}));

// === ENEMIES <-> DESTINATIONS

export const enemiesToDestinations = pgTable(
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
		cpk: primaryKey({
			name: "enemiesToLocations_composite_key",
			columns: [t.destinationId, t.enemyId],
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

// === ITEMS <-> DESTINATIONS

export const itemsToDestinations = pgTable(
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
		cpk: primaryKey({
			name: "itemsToDestinations_composite_key",
			columns: [t.destinationId, t.itemId],
		}),
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

// === ENEMIES TO ITEMS

export const enemiesToItems = pgTable(
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
		cpk: primaryKey({
			name: "enemyDrops_composite_key",
			columns: [t.itemId, t.enemyId],
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

// export const users = pgTable("user", {
// 	id: text("id")
// 		.primaryKey()
// 		.$defaultFn(() => crypto.randomUUID()),
// 	name: text("name"),
// 	password: text("password"),
// 	email: text("email").unique(),
// 	emailVerified: integer("emailVerified"),
// 	image: text("image"),
// });

// export const accounts = pgTable(
// 	"account",
// 	{
// 		userId: text("userId")
// 			.notNull()
// 			.references(() => users.id, { onDelete: "cascade" }),
// 		type: text("type").$type<AdapterAccountType>().notNull(),
// 		provider: text("provider").notNull(),
// 		providerAccountId: text("providerAccountId").notNull(),
// 		refresh_token: text("refresh_token"),
// 		access_token: text("access_token"),
// 		expires_at: integer("expires_at"),
// 		token_type: text("token_type"),
// 		scope: text("scope"),
// 		id_token: text("id_token"),
// 		session_state: text("session_state"),
// 	},
// 	(account) => ({
// 		compoundKey: primaryKey({
// 			columns: [account.provider, account.providerAccountId],
// 		}),
// 	}),
// );

// export const sessions = pgTable("session", {
// 	sessionToken: text("sessionToken").primaryKey(),
// 	userId: text("userId")
// 		.notNull()
// 		.references(() => users.id, { onDelete: "cascade" }),
// 	expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
// });

// export const verificationTokens = pgTable(
// 	"verificationToken",
// 	{
// 		identifier: text("identifier").notNull(),
// 		token: text("token").notNull(),
// 		expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
// 	},
// 	(verificationToken) => ({
// 		compositePk: primaryKey({
// 			columns: [verificationToken.identifier, verificationToken.token],
// 		}),
// 	}),
// );

// export const authenticators = pgTable(
// 	"authenticator",
// 	{
// 		credentialID: text("credentialID").notNull().unique(),
// 		userId: text("userId")
// 			.notNull()
// 			.references(() => users.id, { onDelete: "cascade" }),
// 		providerAccountId: text("providerAccountId").notNull(),
// 		credentialPublicKey: text("credentialPublicKey").notNull(),
// 		counter: integer("counter").notNull(),
// 		credentialDeviceType: text("credentialDeviceType").notNull(),
// 		credentialBackedUp: integer("credentialBackedUp", {
// 			mode: "boolean",
// 		}).notNull(),
// 		transports: text("transports"),
// 	},
// 	(authenticator) => ({
// 		compositePK: primaryKey({
// 			columns: [authenticator.userId, authenticator.credentialID],
// 		}),
// 	}),
// );

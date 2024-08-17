import { text, sqliteTable } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { integer } from "drizzle-orm/sqlite-core";
import { primaryKey } from "drizzle-orm/sqlite-core";

export const destinations = sqliteTable("destinations", {
	id: text("id").primaryKey(),
	label: text("location").notNull(),
	description: text("description"),
});
export type Location = typeof destinations.$inferSelect;
export type InsertLocation = typeof destinations.$inferInsert;

export const enemies = sqliteTable("enemies", {
	id: text("id").primaryKey(),
	label: text("location").notNull(),
});

export type Enemy = typeof enemies.$inferSelect;
export type InsertEnemy = typeof enemies.$inferInsert;

export const enemiesRelations = relations(enemies, ({ many }) => ({
	enemiesToDestinations: many(enemiesToDestinations),
}));
export const destinationsRelations = relations(destinations, ({ many }) => ({
	enemiesToDestinations: many(enemiesToDestinations),
}));

export const enemiesToDestinations = sqliteTable(
	"enemiesToLocations",
	{
		destinationId: integer("destination_id")
			.notNull()
			.references(() => destinations.id),
		enemyId: integer("enemy_id")
			.notNull()
			.references(() => enemies.id),
	},
	(t) => ({
		pk: primaryKey({ columns: [t.destinationId, t.enemyId] }),
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

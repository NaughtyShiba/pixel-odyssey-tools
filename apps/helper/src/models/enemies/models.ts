"use server";

import { db } from "@/db/db";
import {
	destinations,
	enemies,
	enemiesToDestinations,
	enemiesToItems,
	items,
} from "@/db/schemas";
import { eq, sql } from "drizzle-orm";

export async function getAllEnemies() {
	return await db
		.select({
			id: enemies.id,
			label: enemies.label,
		})
		.from(enemies);
}

export async function getEnemyEntry(id: string) {
	return await db.select().from(enemies).where(eq(enemies.id, id)).get();
}

export async function getEnemy(id: string) {
	const data = await db
		.select({
			id: enemies.id,
			label: enemies.label,
			destinations: sql<string>`
       COALESCE(
         CASE WHEN ${destinations.id} IS NOT NULL THEN json_group_array(DISTINCT
           CASE WHEN ${destinations.id} IS NOT NULL THEN ${destinations.id} ELSE NULL END
         ) ELSE NULL END,
         '[]'
       )
     `.as("destinations"),
			items: sql<string>`
       COALESCE(
         CASE WHEN ${enemiesToItems.itemId} IS NOT NULL THEN json_group_array(
            json_object('itemId', ${enemiesToItems.itemId}, 'chance', ${enemiesToItems.chance})
            ) ELSE NULL END,
         '[]'
       )
     `.as("items"),
		})
		.from(enemies)
		.leftJoin(
			enemiesToDestinations,
			eq(enemies.id, enemiesToDestinations.enemyId),
		)
		.leftJoin(
			destinations,
			eq(enemiesToDestinations.destinationId, destinations.id),
		)
		.leftJoin(enemiesToItems, eq(enemies.id, enemiesToItems.enemyId))
		.leftJoin(items, eq(enemiesToItems.itemId, items.id))
		.where(eq(enemies.id, id))
		.groupBy(enemies.id)
		.get();

	return data
		? {
				...data,
				destinations: JSON.parse(data.destinations) as string[],
				items: JSON.parse(data.items) as Array<{
					itemId: string;
					chance: number;
				}>,
			}
		: undefined;
}

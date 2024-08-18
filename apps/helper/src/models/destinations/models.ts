"use server";

import {
	destinations,
	enemies,
	enemiesToDestinations,
	items,
	itemsToDestinations,
} from "@/db/schemas";
import { db } from "@/db/db";
import { eq, sql } from "drizzle-orm";

export async function getAllDestinations() {
	return await db
		.select({
			id: destinations.id,
			label: destinations.label,
		})
		.from(destinations);
}

export async function getDestination(id: string) {
	const data = await db
		.select({
			id: destinations.id,
			label: destinations.label,
			description: destinations.description,
			enemies: sql<string>`
      COALESCE(
        CASE WHEN ${enemies.id} IS NOT NULL THEN json_group_array(DISTINCT
          CASE WHEN ${enemies.id} IS NOT NULL THEN ${enemies.id} ELSE NULL END
        ) ELSE NULL END,
        '[]'
      )
    `.as("enemies"),
			items: sql<string>`
      COALESCE(
        CASE WHEN ${items.id} IS NOT NULL THEN json_group_array(DISTINCT
          CASE WHEN ${items.id} IS NOT NULL THEN ${items.id} ELSE NULL END
        ) ELSE NULL END,
        '[]'
      )
    `.as("items"),
		})
		.from(destinations)
		.leftJoin(
			enemiesToDestinations,
			eq(destinations.id, enemiesToDestinations.destinationId),
		)
		.leftJoin(enemies, eq(enemiesToDestinations.enemyId, enemies.id))
		.leftJoin(
			itemsToDestinations,
			eq(destinations.id, itemsToDestinations.destinationId),
		)
		.leftJoin(items, eq(itemsToDestinations.itemId, items.id))
		.where(eq(destinations.id, id))
		.groupBy(destinations.id)
		.get();

	return data
		? {
				...data,
				enemies: JSON.parse(data.enemies) as string[],
				items: JSON.parse(data.items) as string[],
			}
		: undefined;
}

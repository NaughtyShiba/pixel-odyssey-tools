"use server";

import { db } from "@/db/db";
import {
	destinations,
	enemies,
	enemiesToItems,
	// destinations,
	// enemies,
	// enemiesToDestinations,
	// enemiesToItems,
	items,
	itemsToDestinations,
} from "@/db/schemas";
import { eq, or, sql } from "drizzle-orm";
import { calculatePerfectRefine } from "./utils";

export async function getAllItems() {
	return await db
		.select({
			id: items.id,
			label: items.label,
			slot: items.slot,
			type: items.type,
		})
		.from(items);
}

export async function getItemsCategories() {
	return await db
		.select({
			category: sql<string>`DISTINCT COALESCE(${items.slot}, ${items.type})`.as(
				"category",
			),
		})
		.from(items)
		.all();
}

export async function getItemsByCategory(category: string) {
	return await db
		.select({
			id: items.id,
			label: items.label,
			slot: items.slot,
			type: items.type,
		})
		.from(items)
		.where(or(eq(items.slot, category), eq(items.type, category)));
}

export async function getItemEntry(id: string) {
	return await db.select().from(items).where(eq(items.id, id)).get();
}

export async function getItem(id: string) {
	const data = await db
		.select({
			id: items.id,
			label: items.label,
			stats: items.stats,
			enemies: sql<string>`
			COALESCE(
         CASE WHEN ${enemiesToItems.enemyId} IS NOT NULL THEN json_group_array(
            json_object('enemyId', ${enemiesToItems.enemyId}, 'chance', ${enemiesToItems.chance})
            )  ELSE NULL END,
         '[]'
       )
    `.as("enemies"),
			destinations: sql<string>`
      COALESCE(
        CASE WHEN ${destinations.id} IS NOT NULL THEN json_group_array(DISTINCT
          CASE WHEN ${destinations.id} IS NOT NULL THEN ${destinations.id} ELSE NULL END
        ) ELSE NULL END,
        '[]'
      )
    `.as("destinations"),
			usedToCraft: sql<string>`
      COALESCE(
        (SELECT json_group_array(json_object('itemId', crafted_item, 'amount', amount))
         FROM craftRecipes
         WHERE craftRecipes.material_id = ${items.id}),
        '[]'
      )
    `.as("usedToCraft"),
			craftedWith: sql<string>`
      COALESCE(
        (SELECT json_group_array(json_object('itemId', material_id, 'amount', amount))
         FROM craftRecipes
         WHERE craftRecipes.crafted_item = ${items.id}),
        '[]'
      )
    `.as("craftedWith"),
		})
		.from(items)
		.leftJoin(enemiesToItems, eq(items.id, enemiesToItems.itemId))
		.leftJoin(enemies, eq(enemiesToItems.enemyId, enemies.id))
		.leftJoin(itemsToDestinations, eq(items.id, itemsToDestinations.itemId))
		.leftJoin(
			destinations,
			eq(itemsToDestinations.destinationId, destinations.id),
		)
		.where(eq(items.id, id))
		.get();

	return data
		? {
				...data,
				destinations: JSON.parse(data.destinations) as string[],
				enemies: JSON.parse(data.enemies) as string[],
				usedToCraft: JSON.parse(data.usedToCraft) as Array<{
					id: string;
					amount: number;
				}>,
				craftedWith: JSON.parse(data.craftedWith) as Array<{
					id: string;
					amount: number;
				}>,
				...(data.stats
					? { perfectRefine: calculatePerfectRefine(data.stats) }
					: {}),
			}
		: undefined;
}

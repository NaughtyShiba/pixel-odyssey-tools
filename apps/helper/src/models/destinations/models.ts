"use server";

import {
	destinations,
	enemies,
	enemiesToDestinations,
	items,
	itemsToDestinations,
} from "@/db/schemas";
import { db } from "@/db/db";
import { and, eq, inArray, sql } from "drizzle-orm";

export async function getAllDestinations() {
	return await db
		.select({
			id: destinations.id,
			label: destinations.label,
		})
		.from(destinations);
}

const slugify = (str: string) => {
	return str
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9 ]/g, "") // remove all chars not letters, numbers and spaces (to be replaced)
		.replace(/\s+/g, "-"); // separator
};

export async function updateDestination(data: {
	id: string | null;
	label: string;
	description: string | null;
	enemies: string[];
	// npcs: string[];
	items: string[];
}) {
	return await db.transaction(async (tx) => {
		// Upsert destination
		let destinationId = data.id;
		if (destinationId) {
			await tx
				.update(destinations)
				.set({
					id: destinationId,
					label: data.label,
					description: data.description,
				})
				.where(eq(destinations.id, destinationId));
		} else {
			destinationId = slugify(data.label);
			await tx.insert(destinations).values({
				id: slugify(data.label),
				label: data.label,
				description: data.description,
			});
		}

		// Get current enemies ids
		const currentEnemiesIds = (
			await tx
				.select({ enemyId: enemiesToDestinations.enemyId })
				.from(enemiesToDestinations)
				.where(eq(enemiesToDestinations.destinationId, destinationId))
		).map((relation) => relation.enemyId);

		// Remove old relations
		const enemiesToRemove = currentEnemiesIds.filter(
			(id) => !data.enemies.includes(id),
		);
		if (enemiesToRemove.length > 0) {
			await tx
				.delete(enemiesToDestinations)
				.where(
					and(
						eq(enemiesToDestinations.destinationId, destinationId),
						inArray(enemiesToDestinations.enemyId, enemiesToRemove),
					),
				);
		}

		// Add new relations
		const enemiesToAdd = data.enemies.filter(
			(id) => !currentEnemiesIds.includes(id),
		);
		if (enemiesToAdd.length > 0) {
			await tx.insert(enemiesToDestinations).values(
				enemiesToAdd.map((enemyId) => ({
					destinationId: destinationId,
					enemyId: enemyId,
				})),
			);
		}

		// Get current items relations
		const currentItemsIds = (
			await tx
				.select({ itemId: itemsToDestinations.itemId })
				.from(itemsToDestinations)
				.where(eq(itemsToDestinations.destinationId, destinationId))
		).map((relation) => relation.itemId);

		const itemsToRemove = currentItemsIds.filter(
			(id) => !data.items.includes(id),
		);
		const itemsToAdd = data.items.filter((id) => !currentItemsIds.includes(id));
		// Remove old relations
		if (itemsToRemove.length > 0) {
			await tx
				.delete(itemsToDestinations)
				.where(
					and(
						eq(itemsToDestinations.destinationId, destinationId),
						inArray(itemsToDestinations.itemId, itemsToRemove),
					),
				);
		}
		// Add new relations
		if (itemsToAdd.length > 0) {
			await tx.insert(itemsToDestinations).values(
				itemsToAdd.map((itemId) => ({
					destinationId: destinationId,
					itemId: itemId,
				})),
			);
		}
	});
}

export async function deleteDestination(id: string) {
	return await db.transaction(async (tx) => {
		await tx
			.delete(itemsToDestinations)
			.where(eq(itemsToDestinations.destinationId, id));
		await tx
			.delete(enemiesToDestinations)
			.where(eq(enemiesToDestinations.destinationId, id));
		await tx.delete(destinations).where(eq(destinations.id, id));
	});
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

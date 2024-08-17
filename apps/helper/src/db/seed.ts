import {
	craftRecipes,
	destinations,
	enemies,
	enemiesToDestinations,
	enemyDrops,
	items,
	itemsToDestinations,
} from "./schemas";
import { db } from "./db";

// Seeds enemies and enemy-item relations
async function seedEnemies() {
	const enemiesJSON = (await import("@repo/helper/seed/enemies.json")).default;

	for (const [enemyId, enemy] of Object.entries(enemiesJSON)) {
		const res = await db
			.insert(enemies)
			.values({
				id: enemyId,
				label: enemy.name,
			})
			.onConflictDoNothing();
		for (const { item, chance } of enemy.drops) {
			await db
				.insert(enemyDrops)
				.values({
					itemId: item,
					enemyId,
					chance,
				})
				.onConflictDoNothing();
		}
	}
}

// Seends locations and location-item and locaation-enemy relations
async function seedLocations() {
	const destinationsJSON = (await import("@repo/helper/seed/locations.json"))
		.default;
	for (const [destinationId, destination] of Object.entries(destinationsJSON)) {
		await db
			.insert(destinations)
			.values({
				id: destinationId,
				label: destination.label,
				description: "",
			})
			.onConflictDoNothing();

		// Add Enemy relations
		for (const enemyId of destination.enemies) {
			await db
				.insert(enemiesToDestinations)
				.values({
					destinationId,
					enemyId,
				})
				.onConflictDoNothing();
		}

		// Add area drops relations
		for (const itemId of destination.items) {
			await db
				.insert(itemsToDestinations)
				.values({
					destinationId,
					itemId,
				})
				.onConflictDoNothing();
		}
	}
}

// Seeds items and recipes
async function seedItems() {
	const itemsJSON = (await import("@repo/helper/seed/items.json")).default;

	// First insert all items
	for (const [itemId, item] of Object.entries(itemsJSON)) {
		await db
			.insert(items)
			.values({
				id: itemId,
				label: item.label,
				type: item.type,
				slot: "slot" in item ? item.slot : null,
				stats: "stats" in item ? item.stats : null,
			})
			.onConflictDoNothing();
	}
	// Then add craft recipes
	for (const [itemId, item] of Object.entries(itemsJSON)) {
		if ("craft" in item) {
			for (const [materialId, amount] of Object.entries(item.craft)) {
				await db
					.insert(craftRecipes)
					.values({
						materialId,
						amount,
						craftedItem: itemId,
					})
					.onConflictDoNothing();
			}
		}
	}
}

const main = async () => {
	await seedItems();
	await seedEnemies();
	await seedLocations();
};

main();

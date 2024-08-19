"use server";

import { db } from "@/db/db";
import { items } from "@/db/schemas";
import { eq, or, sql } from "drizzle-orm";
import { calculatePerfectRefine } from "./utils";

export async function getAllItems() {
	return await db.query.items.findMany({
		columns: { id: true, label: true, slot: true, type: true },
	});
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
	return await db.query.items.findMany({
		columns: { id: true, label: true, slot: true, type: true },
		where: or(eq(items.slot, category), eq(items.type, category)),
	});
}

export async function getItemEntry(id: string) {
	return await db.query.items.findMany({
		columns: { id: true, label: true, slot: true, type: true },
		with: { enemies: true, destinations: true, recipes: true },
		where: or(eq(items.id, id)),
	});
}

export async function getItem(id: string) {
	const data = await db.query.items.findFirst({
		with: {
			enemies: true,
			destinations: true,
			materialForRecipes: true,
			craftedFromRecipes: true,
		},
		where: or(eq(items.id, id)),
	});

	console.log(data);

	return data
		? {
				...data,
				destinations: data.destinations.map((d) => d.destinationId),
				enemies: data.enemies.map((e) => ({
					enemyId: e.enemyId,
					chance: e.chance,
				})),
				materialForRecipes: data.materialForRecipes.map((m) => ({
					itemId: m.craftedItem,
					amount: m.amount,
				})),
				craftedFromRecipes: data.craftedFromRecipes.map((m) => ({
					itemId: m.materialId,
					amount: m.amount,
				})),
				...(data.stats
					? { perfectRefine: calculatePerfectRefine(data.stats) }
					: {}),
			}
		: undefined;
}

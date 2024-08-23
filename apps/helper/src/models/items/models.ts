"use server";

import { db } from "@/db/db";
import { items } from "@/db/schemas";
import { eq, or, SQL, sql } from "drizzle-orm";
import { calculatePerfectRefine } from "./utils";
import { createRelationQuery } from "@/libs/drizzle/utils";

export async function getAllItems() {
	return await db.query.items.findMany({
		columns: { id: true, label: true, slot: true, type: true },
	});
}
export type AllItems = ReturnType<typeof getAllItems>;

export async function getItemsCategories() {
	return await db
		.select({
			category: sql<string>`COALESCE(${items.slot}, ${items.type})`,
		})
		.from(items)
		.groupBy(sql`COALESCE(${items.slot}, ${items.type})`)
		.all();
}
export type ItemsCategories = Awaited<ReturnType<typeof getItemsCategories>>;

export async function getItemsByCategory(category: string) {
	return await db.query.items.findMany({
		columns: { id: true, label: true, slot: true, type: true },
		where: or(eq(items.slot, category), eq(items.type, category)),
	});
}
export type ItemsByCategory = ReturnType<typeof getItemsByCategory>;

export async function getItemEntry(id: string) {
	return await db.query.items.findFirst({
		columns: { id: true, label: true, slot: true, type: true },
		with: {
			enemies: true,
			destinations: true,
			materialForRecipes: true,
			craftedFromRecipes: true,
		},
		where: or(eq(items.id, id)),
	});
}

export async function getItem(id: string) {
	const data = await db.query.items.findFirst({
		with: {
			...createRelationQuery("enemies", "enemy", ["id", "label"] as const, {
				chance: true,
			}),
			...createRelationQuery("destinations", "destination", [
				"id",
				"label",
			] as const),
			...createRelationQuery(
				"materialForRecipes",
				"craft",
				["id", "label"] as const,
				{
					amount: true,
				},
			),
			...createRelationQuery(
				"craftedFromRecipes",
				"material",
				["id", "label"] as const,
				{
					amount: true,
				},
			),
		},
		where: or(eq(items.id, id)),
	});

	return data;
}

export type Item = Awaited<ReturnType<typeof getItem>>;

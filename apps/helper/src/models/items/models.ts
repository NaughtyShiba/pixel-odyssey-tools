"use server";

import { db } from "@/db/db";
import { items } from "@/db/schemas";
import { eq, or, SQL, sql } from "drizzle-orm";
import { calculatePerfectRefine } from "./utils";

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

type InferredColumns<T extends readonly string[]> = {
	[K in T[number]]: true;
};

type RelationQuery<
	TRelation extends string,
	TRelationPartner extends string,
	TColumns extends readonly string[],
	TAdditionalColumns extends Record<string, boolean>,
> = {
	[K in TRelation]: {
		with: {
			[K in TRelationPartner]: {
				columns: InferredColumns<TColumns>;
			};
		};
		columns: TAdditionalColumns;
	};
};

function createRelationQuery<
	TRelation extends string,
	TRelationPartner extends string,
	TColumns extends readonly string[],
	TAdditionalColumns extends Record<string, boolean>,
>(
	relationName: TRelation,
	relationPartnerName: TRelationPartner,
	columns: TColumns,
	additionalColumns: TAdditionalColumns = {} as TAdditionalColumns,
): RelationQuery<TRelation, TRelationPartner, TColumns, TAdditionalColumns> {
	return {
		[relationName]: {
			with: {
				[relationPartnerName]: {
					columns: columns.reduce(
						(acc, col) => ({ ...acc, [col]: true }),
						{},
					) as InferredColumns<TColumns>,
				},
			},
			columns: additionalColumns,
		},
	} as RelationQuery<TRelation, TRelationPartner, TColumns, TAdditionalColumns>;
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

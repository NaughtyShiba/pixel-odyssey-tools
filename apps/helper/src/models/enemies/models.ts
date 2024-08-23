"use server";

import { db } from "@/db/db";
import { enemies } from "@/db/schemas";
import { createRelationQuery } from "@/libs/drizzle/utils";
import { eq } from "drizzle-orm";

export async function getAllEnemies() {
	return await db.query.enemies.findMany({
		columns: { id: true, label: true },
	});
}

export async function getEnemy(id: string) {
	const a = await db.query.enemies.findFirst({
		where: eq(enemies.id, id),
		with: {
			...createRelationQuery("destinations", "destination", [
				"id",
				"label",
			] as const),
			...createRelationQuery("items", "item", ["id", "label"] as const, {
				chance: true,
			}),
		},
	});
	console.log({ id, a });
	return a;
}
export type Enemy = Awaited<ReturnType<typeof getEnemy>>;

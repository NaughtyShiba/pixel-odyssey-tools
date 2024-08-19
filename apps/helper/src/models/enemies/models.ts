"use server";

import { db } from "@/db/db";
import { enemies } from "@/db/schemas";
import { eq } from "drizzle-orm";

export async function getAllEnemies() {
	return await db.query.enemies.findMany({
		columns: { id: true, label: true },
	});
}

export async function getEnemy(id: string) {
	const data = await db.query.enemies.findFirst({
		where: eq(enemies.id, id),
		with: { destinations: true, items: true },
	});

	return data
		? {
				...data,
				destinations: data.destinations.map((d) => d.destinationId),
				items: data.items.map((i) => ({ itemId: i.itemId, chance: i.chance })),
			}
		: undefined;
}

"use server";

import { updateDestination } from "@/models/destinations/models";

export async function submitLocation(data: {
	id: string;
	label: string;
	description: string;
	enemies: string[];
	// npcs: string[];
	// items: string[];
}) {
	await new Promise((resolve) => {
		resolve(null);
	});
	await updateDestination(data, data.id);

	// for (const enemy of data.enemies) {
	// 	// sync drop locaton
	// }

	// for (const item of data.items) {
	// 	// sync drop locaton
	// }

	// for (const npc of data.npcs) {
	// 	// sync appear locaton
	// }
}

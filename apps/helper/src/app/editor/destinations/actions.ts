"use server";

export async function submitLocation(
	data: Partial<{
		label: string;
		enemies: string[];
		npcs: string[];
		items: string[];
	}>,
) {
	await new Promise((resolve) => {
		resolve(null);
	});

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

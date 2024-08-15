export interface Enemy {
	name: string;
	drops: Array<{ item: string; chance: number }>;
	locations: string[];
}

export interface EnemyMinimal {
	label: string;
}

export async function getEnemies() {
	try {
		const res = await import("@repo/helper/data/enemies.json");
		return res.default;
	} catch (ex) {
		console.error(ex);
		throw ex;
	}
}

export async function getEnemy(slug: string) {
	try {
		const res = await import(`@repo/helper/data/enemies/${slug}.json`);
		return res.default as Enemy;
	} catch (ex) {
		console.error(ex);
		throw ex;
	}
}

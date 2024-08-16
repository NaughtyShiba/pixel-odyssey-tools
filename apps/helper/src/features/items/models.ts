import type {
	Craftable,
	DroppedByEnemies,
	DroppedByStepping,
	Refineable,
} from "./types";

export interface Item
	extends ItemMinimal,
		Partial<Craftable>,
		Partial<Refineable>,
		Partial<DroppedByEnemies>,
		Partial<DroppedByStepping> {
	enemies: string[];
	items: string[];
	npcs: string[];
}

export interface ItemMinimal {
	label: string;
	type: string;
	slot: string | null;
}

export async function getItems(): Promise<Record<string, ItemMinimal>> {
	try {
		const res = await import("@repo/helper/data/items.json");
		return res.default as Record<string, ItemMinimal>;
	} catch (ex) {
		console.error(ex);
		throw ex;
	}
}

export async function getCategories(): Promise<
	Record<string, { label: string }>
> {
	try {
		const res = await import("@repo/helper/data/categories.json");
		return res.default as Record<string, { label: string }>;
	} catch (ex) {
		console.error(ex);
		throw ex;
	}
}

export async function getItem(slug: string) {
	try {
		const res = await import(`@repo/helper/data/items/${slug}.json`);
		return res.default as Item;
	} catch (ex) {
		console.error(ex);
		throw ex;
	}
}

export interface MapLocation extends MapLocationMinimal {
	enemies: string[];
	items: string[];
	npcs: string[];
}

export interface MapLocationMinimal {
	label: string;
}

export async function getLocations() {
	try {
		const res = await import("@repo/helper/data/locations.json");
		return res.default as Record<string, MapLocationMinimal>;
	} catch (ex) {
		console.error(ex);
		throw ex;
	}
}

export async function getLocation(slug: string) {
	try {
		const res = await import(`@repo/helper/data/locations/${slug}.json`);
		return res.default as MapLocation;
	} catch (ex) {
		console.error(ex);
		throw ex;
	}
}

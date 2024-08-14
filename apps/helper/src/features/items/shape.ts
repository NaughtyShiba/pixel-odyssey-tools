export interface Craftable {
	craft: Record<string, number>;
	total_craft: Record<string, number>;
}
export const isCraftable = (item?: object): item is Craftable =>
	typeof item === "object" && "craft" in item && "total_craft" in item;

export interface Refineable {
	perfect_refine: Record<
		string,
		{
			total_items: number;
			stats: Record<string, number>;
			refine_with?: {
				perfect: boolean;
				level: number;
			};
		}
	>;
	imperfect_refine: Record<
		string,
		{
			stats: Record<string, number>;
		}
	>;
}
export const isRefineable = (item?: object): item is Refineable =>
	typeof item === "object" &&
	"perfect_refine" in item &&
	"imperfect_refine" in item;

export interface DroppedByEnemies {
	enemy_drop: Record<string, number>;
}
export const isDroppedByEnemies = (item?: object): item is DroppedByEnemies =>
	typeof item === "object" && "enemy_drop" in item;

export interface DroppedByStepping {
	stepping_drop: string[];
}
export const isDroppedByStepping = (item?: object): item is DroppedByStepping =>
	typeof item === "object" && "stepping_drop" in item;

export interface Craftable {
	craft: Record<string, number>;
	total_craft: Record<string, number>;
}

export interface RecipeIngredient {
	recipe: Record<string, number>;
}

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

export interface DroppedByEnemies {
	enemy_drop: Record<string, number>;
}

export interface DroppedByStepping {
	stepping_drop: string[];
}

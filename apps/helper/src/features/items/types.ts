export interface Craftable {
	craftedFromRecipes: Array<{ itemId: string; amount: number }>;
	// total_craft: Record<string, number>;
}

export interface RecipeIngredient {
	materialForRecipes: Array<{ itemId: string; amount: number }>;
}

export interface Refineable {
	perfectRefine: Record<
		string,
		{
			itemsRequired: number;
			stats: Record<string, number>;
			cheapestItem?: {
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
	enemies: Array<{
		enemyId: string;
		chance: number;
	}>;
}

export interface DroppedByStepping {
	destinations: string[];
}

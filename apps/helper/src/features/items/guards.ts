import type {
	Craftable,
	DroppedByEnemies,
	DroppedByStepping,
	RecipeIngredient,
	Refineable,
} from "./types";

export const isDroppedByStepping = (item?: object): item is DroppedByStepping =>
	typeof item === "object" && "stepping_drop" in item;
export const isDroppedByEnemies = (item?: object): item is DroppedByEnemies =>
	typeof item === "object" && "enemy_drop" in item;
export const isRefineable = (item?: object): item is Refineable =>
	typeof item === "object" &&
	"perfect_refine" in item &&
	"imperfect_refine" in item;
export const isCraftable = (item?: object): item is Craftable =>
	typeof item === "object" && "craft" in item && "total_craft" in item;
export const isRecipeIngredient = (item?: object): item is RecipeIngredient =>
	typeof item === "object" && "recipe" in item;

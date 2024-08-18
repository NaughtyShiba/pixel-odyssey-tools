import type {
	Craftable,
	DroppedByEnemies,
	DroppedByStepping,
	RecipeIngredient,
	Refineable,
} from "./types";

export const isDroppedByStepping = (item?: object): item is DroppedByStepping =>
	typeof item === "object" && "destinations" in item;
export const isDroppedByEnemies = (item?: object): item is DroppedByEnemies =>
	typeof item === "object" && "enemies" in item;
export const isRefineable = (item?: object): item is Refineable =>
	typeof item === "object" && "perfectRefine" in item;
export const isCraftable = (item?: object): item is Craftable =>
	typeof item === "object" && "craftedWith" in item;
export const isRecipeIngredient = (item?: object): item is RecipeIngredient =>
	typeof item === "object" && "usedToCraft" in item;

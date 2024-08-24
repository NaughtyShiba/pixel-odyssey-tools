"use client";

import { PageArticle, PageContent, PageTitle } from "@/components/page";
import {
	isCraftable,
	isDroppedByEnemies,
	isDroppedByStepping,
	isRecipeIngredient,
} from "../guards";
import { CraftInfo } from "./craft-info";
import { EnemyDropInfo } from "./enemy-drop-info";
import { RecipeInfo } from "./recipe-info";
import { StepDropInfo } from "./step-drop-info";
import { use } from "react";
import type { Item } from "@/models/items/models";
import { RefineInfo } from "./refine-info";
import {
	calculateImperfectRefine,
	calculatePerfectRefine,
} from "@/models/items/utils";

interface ItemInfoProps {
	item: Promise<Item>;
}

export function ItemInfo(props: ItemInfoProps) {
	const item = use(props.item);

	const perfectRefine = item?.stats
		? calculatePerfectRefine(item?.stats)
		: null;
	const imperfectRefine = item?.stats
		? calculateImperfectRefine(item?.stats)
		: null;

	return (
		<PageArticle>
			<PageTitle>{item?.label}</PageTitle>
			<PageContent>
				{perfectRefine && imperfectRefine && (
					<RefineInfo
						perfectRefine={perfectRefine}
						imperfect_refine={imperfectRefine}
					/>
				)}
				{isCraftable(item) && (
					<CraftInfo craftedFromRecipes={item.craftedFromRecipes} />
				)}
				{isRecipeIngredient(item) && (
					<RecipeInfo materialForRecipes={item.materialForRecipes} />
				)}{" "}
				{isDroppedByEnemies(item) && <EnemyDropInfo enemies={item.enemies} />}
				{isDroppedByStepping(item) && (
					<StepDropInfo destinations={item.destinations} />
				)}
			</PageContent>
		</PageArticle>
	);
}

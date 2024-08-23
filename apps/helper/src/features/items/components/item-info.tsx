"use client";

import { PageArticle, PageContent, PageTitle } from "@/components/page";
import {
	isCraftable,
	isDroppedByEnemies,
	isDroppedByStepping,
	isRecipeIngredient,
	isRefineable,
} from "../guards";
import { CraftInfo } from "./craft-info";
import { EnemyDropInfo } from "./enemy-drop-info";
import { RecipeInfo } from "./recipe-info";
import { StepDropInfo } from "./step-drop-info";
import { use } from "react";
import type { Item } from "@/models/items/models";

interface ItemInfoProps {
	item: Promise<Item>;
}

export function ItemInfo(props: ItemInfoProps) {
	const item = use(props.item);

	return (
		<PageArticle>
			<PageTitle>{item?.label}</PageTitle>
			<PageContent>
				{isCraftable(item) && <CraftInfo {...item} />}
				{isRecipeIngredient(item) && <RecipeInfo {...item} />}{" "}
				{isDroppedByEnemies(item) && <EnemyDropInfo {...item} />}
				{isDroppedByStepping(item) && (
					<StepDropInfo destinations={item.destinations} />
				)}
			</PageContent>
		</PageArticle>
	);
}

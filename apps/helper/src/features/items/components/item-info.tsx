"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import {
	isCraftable,
	isDroppedByEnemies,
	isDroppedByStepping,
	isRecipeIngredient,
	isRefineable,
} from "../guards";
import { PageArticle, PageTitle, PageContent } from "@/src/components/page";
import { getItemQueryKey } from "../utils";
import { CraftInfo } from "./craft-info";
import { EnemyDropInfo } from "./enemy-drop-info";
import { RefineInfo } from "./refine-info";
import { StepDropInfo } from "./step-drop-info";
import { getItem } from "../models";
import { RecipeInfo } from "./recipe-info";

export function ItemInfo() {
	const { itemName } = useParams<{ itemName: string }>();
	const { data: item } = useQuery({
		queryKey: getItemQueryKey(itemName),
		queryFn: () => getItem(itemName),
	});

	return (
		<PageArticle>
			<PageTitle>{item?.label}</PageTitle>
			<PageContent>
				{isRefineable(item) && <RefineInfo {...item} />}
				{isCraftable(item) && <CraftInfo {...item} />}{" "}
				{isDroppedByEnemies(item) && <EnemyDropInfo {...item} />}
				{isDroppedByStepping(item) && <StepDropInfo {...item} />}
				{isRecipeIngredient(item) && <RecipeInfo {...item} />}
			</PageContent>
		</PageArticle>
	);
}

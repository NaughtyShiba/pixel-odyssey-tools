"use client";

import { PageArticle, PageContent, PageTitle } from "@/src/components/page";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import {
	isCraftable,
	isDroppedByEnemies,
	isDroppedByStepping,
	isRecipeIngredient,
	isRefineable,
} from "../guards";
import { getItem } from "../models";
import { getItemQueryKey } from "../utils";
import { CraftInfo } from "./craft-info";
import { EnemyDropInfo } from "./enemy-drop-info";
import { RecipeInfo } from "./recipe-info";
import { RefineInfo } from "./refine-info";
import { StepDropInfo } from "./step-drop-info";

export function ItemInfo() {
	const { slug } = useParams<{ slug: string }>();
	const { data: item } = useQuery({
		queryKey: getItemQueryKey(slug),
		queryFn: () => getItem(slug),
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

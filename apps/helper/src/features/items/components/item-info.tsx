"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import {
	isCraftable,
	isDroppedByEnemies,
	isDroppedByStepping,
	isRefineable,
} from "../guards";
import { PageArticle, PageTitle, PageContent } from "@/src/components/page";
import { getItemQueryKey } from "../utils";
import { CraftInfo } from "./craft-info";
import { EnemyDropInfo } from "./enemy-drop-info";
import { RefineInfo } from "./refine-info";
import { StepDropInfo } from "./step-drop-info";
import { getItem } from "../models";

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
			</PageContent>
		</PageArticle>
	);
}

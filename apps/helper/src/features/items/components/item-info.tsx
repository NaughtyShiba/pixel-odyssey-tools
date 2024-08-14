"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
	isCraftable,
	isDroppedByEnemies,
	isDroppedByStepping,
	isRefineable,
} from "../shape";
import { CraftInfo } from "./craft-info";
import { EnemyDropInfo } from "./enemy-drop-info";
import { ItemSelector } from "./item-selector";
import { RefineInfo } from "./refine-info";
import { StepDropInfo } from "./step-drop-info";

interface ItemInfoProps {
	items: Array<{ value: string; label: string }>;
}

export function ItemInfo({ items }: ItemInfoProps) {
	const [selectedItem, setSelectedItem] = useState("");
	const { data } = useQuery({
		queryKey: ["item", selectedItem],
		enabled: Boolean(selectedItem),
		async queryFn() {
			const res = await fetch(`/api/item/${selectedItem}`);
			return (await res.json()) as object;
		},
	});

	return (
		<div className="flex flex-col w-full gap-16">
			<ItemSelector
				items={items}
				value={selectedItem}
				onSelect={(value) => {
					setSelectedItem(value);
				}}
			/>
			{isRefineable(data) && <RefineInfo {...data} />}
			{isCraftable(data) && <CraftInfo {...data} />}
			{isDroppedByEnemies(data) && <EnemyDropInfo {...data} />}
			{isDroppedByStepping(data) && <StepDropInfo {...data} />}
		</div>
	);
}

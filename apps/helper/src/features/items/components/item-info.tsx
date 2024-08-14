"use client";

import { useState } from "react";
import { ItemSelector } from "./item-selector";
import { useQuery } from "@tanstack/react-query";
import { isCraftable, isRefineable } from "../shape";
import { RefineInfo } from "./refine-info";
import { CraftInfo } from "./craft-info";

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
		<div>
			<ItemSelector
				items={items}
				value={selectedItem}
				onSelect={(value) => {
					setSelectedItem(value);
				}}
			/>
			{isRefineable(data) && <RefineInfo {...data} />}
			{isCraftable(data) && <CraftInfo {...data} />}
		</div>
	);
}

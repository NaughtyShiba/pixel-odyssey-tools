"use client";

import { useState } from "react";
import { EnemySelector } from "./enemy-selector";
import { useQuery } from "@tanstack/react-query";
// import { RefineInfo } from "./refine-info";
// import { CraftInfo } from "./craft-info";
// import { EnemyDropInfo } from "./enemy-drop-info";
// import { StepDropInfo } from "./step-drop-info";

interface EnemyInfoProps {
	enemies: Array<{ value: string; label: string }>;
}

export function EnemyInfo({ enemies }: EnemyInfoProps) {
	const [selectedItem, setSelectedItem] = useState("");
	const { data } = useQuery({
		queryKey: ["enemy", selectedItem],
		enabled: Boolean(selectedItem),
		async queryFn() {
			const res = await fetch(`/api/enemy/${selectedItem}`);
			return (await res.json()) as object;
		},
	});

	return (
		<div className="flex flex-col w-full gap-16">
			<EnemySelector
				items={enemies}
				value={selectedItem}
				onSelect={(value) => {
					setSelectedItem(value);
				}}
			/>
			<pre>{JSON.stringify(data, null, "  ")}</pre>
		</div>
	);
}

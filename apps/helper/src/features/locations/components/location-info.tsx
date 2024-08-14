"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { LocationSelector } from "./location-selector";
// import { RefineInfo } from "./refine-info";
// import { CraftInfo } from "./craft-info";
// import { EnemyDropInfo } from "./enemy-drop-info";
// import { StepDropInfo } from "./step-drop-info";

interface LocationInfoProps {
	locations: Array<{ value: string; label: string }>;
}

export function LocationInfo({ locations }: LocationInfoProps) {
	const [selectedItem, setSelectedItem] = useState("");
	const { data } = useQuery({
		queryKey: ["location", selectedItem],
		enabled: Boolean(selectedItem),
		async queryFn() {
			const res = await fetch(`/api/location/${selectedItem}`);
			return (await res.json()) as object;
		},
	});

	return (
		<div className="flex flex-col w-full gap-16">
			<LocationSelector
				items={locations}
				value={selectedItem}
				onSelect={(value) => {
					setSelectedItem(value);
				}}
			/>
			<pre>{JSON.stringify(data, null, "  ")}</pre>
		</div>
	);
}

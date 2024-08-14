"use client";

import { useState } from "react";
import { ItemSelector } from "./item-selector";
import { useQuery } from "@tanstack/react-query";
import {
	Table,
	TableRow,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
} from "@repo/ui/components/table";

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
			return await res.json();
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
			{data?.perfect_refine && (
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Target level</TableHead>
							<TableHead>Source Item Level</TableHead>
							<TableHead>Sacrifice Item Level</TableHead>
							<TableHead>Sacrifice Item Perfect</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{Object.entries(data.perfect_refine).map(([key, entry]) =>
							key === "1" ? (
								<TableRow key={key}>
									<TableCell>{key}</TableCell>
									<TableCell>-</TableCell>
									<TableCell>-</TableCell>
									<TableCell>-</TableCell>
								</TableRow>
							) : (
								<TableRow key={key}>
									<TableCell>{key}</TableCell>
									<TableCell>{key - 1}</TableCell>
									<TableCell>{entry.refine_with.level}</TableCell>
									<TableCell>
										{entry.refine_with.perfect ? "yes" : "no"}
									</TableCell>
								</TableRow>
							),
						)}
					</TableBody>
				</Table>
			)}
		</div>
	);
}

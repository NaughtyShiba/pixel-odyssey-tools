"use client";

import { useQuery } from "@tanstack/react-query";
import { getItemsQueryKey } from "../utils";
import { getItems } from "../models";
import Link from "next/link";
import { useParams } from "next/navigation";

export function ItemsList() {
	const { category } = useParams<{ category: string }>();
	const { data: items } = useQuery({
		queryKey: getItemsQueryKey(),
		queryFn: getItems,
	});

	const groupsItems = Object.entries(items ?? {}).filter(
		([key, item]) => item.slot === category || item.type === category,
	);

	return (
		<div>
			<ul>
				{groupsItems?.map(([key, item]) => (
					<li key={key}>
						<Link href={`/items/${item.slot ?? item.type}/${key}`}>
							{item.label}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

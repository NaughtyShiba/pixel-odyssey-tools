"use client";

import { useQuery } from "@tanstack/react-query";
import { getItemsQueryKey } from "../utils";
import { getItems } from "../models";
import { groupBy } from "@/src/libs/fn/group-by";
import { PageSubTitle } from "@/src/components/page";
import Link from "next/link";

export function ItemsList() {
	const { data: items } = useQuery({
		queryKey: getItemsQueryKey(),
		queryFn: getItems,
	});
	const groupedItems = items
		? groupBy(
				Object.entries(items).map(([key, item]) => ({ ...item, id: key })),
				"type",
			)
		: {};
	return (
		<>
			{Object.entries(groupedItems).map(([groupId, group]) => {
				return (
					<div key={groupId}>
						<PageSubTitle>{groupId}</PageSubTitle>
						<ul>
							{group?.map((item) => (
								<li key={item.id}>
									<Link href={`/items/${item.id}`}>{item.label}</Link>
								</li>
							))}
						</ul>
					</div>
				);
			})}
		</>
	);
}

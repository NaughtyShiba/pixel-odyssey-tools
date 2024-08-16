"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getItems } from "../models";
import { getItemsQueryKey } from "../utils";

export function ItemsList() {
	const { slug } = useParams<{ slug: string }>();
	const { data: items } = useQuery({
		queryKey: getItemsQueryKey(),
		queryFn: getItems,
	});

	const groupsItems = Object.entries(items ?? {}).filter(
		([, item]) => item.slot === slug || item.type === slug,
	);

	return (
		<div>
			<ul className="list-disc">
				{groupsItems?.map(([key, item]) => (
					<li key={key}>
						<Link className="underline" href={`/items/${key}`}>
							{item.label}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

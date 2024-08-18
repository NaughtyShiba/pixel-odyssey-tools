"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getItemsByCategoryQuery } from "@/models/items/queries";

export function ItemsList() {
	const { slug } = useParams<{ slug: string }>();
	const { data: items } = useQuery(getItemsByCategoryQuery(slug));

	const groupsItems = Object.values(items ?? {}).filter(
		(item) => ("slot" in item && item.slot === slug) || item.type === slug,
	);

	return (
		<div>
			<ul className="list-disc">
				{groupsItems?.map(({ id, label }) => (
					<li key={id}>
						<Link className="underline" href={`/items/${id}`}>
							{label}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

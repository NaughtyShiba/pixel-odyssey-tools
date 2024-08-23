"use client";

import Link from "next/link";
import type { ItemsByCategory } from "@/models/items/models";
import { use } from "react";

interface ItemsListProps {
	items: ItemsByCategory;
}
export function ItemsList({ items }: ItemsListProps) {
	const itemsList = use(items);

	return (
		<div>
			<ul className="list-disc">
				{itemsList?.map(({ id, label }) => (
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

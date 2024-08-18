"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getAllEnemiesQuery } from "@/src/models/enemies/queries";

export function EnemiesList() {
	const { data: enemies } = useQuery(getAllEnemiesQuery());

	return (
		<ul className="list-disc">
			{enemies
				? enemies.map(({ id, label }) => (
						<li key={id}>
							<Link className="underline" href={`/enemies/${id}`}>
								{label}
							</Link>
						</li>
					))
				: null}
		</ul>
	);
}

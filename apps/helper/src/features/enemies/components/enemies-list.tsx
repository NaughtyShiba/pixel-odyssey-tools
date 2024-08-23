"use client";

import Link from "next/link";
import { use } from "react";

interface EnemiesListProp {
	enemies: Promise<
		{
			id: string;
			label: string;
		}[]
	>;
}

export function EnemiesList(props: EnemiesListProp) {
	const enemies = use(props.enemies);

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

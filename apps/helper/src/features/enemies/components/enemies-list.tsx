"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getEnemies } from "../models";
import { getEnemiesQueryKey } from "../utils";

export function EnemiesList() {
	const { data: enemies } = useQuery({
		queryKey: getEnemiesQueryKey(),
		queryFn: getEnemies,
	});

	return (
		<ul className="list-disc">
			{enemies
				? Object.entries(enemies).map(([enemyName, enemy]) => (
						<li key={enemyName}>
							<Link className="underline" href={`/enemies/${enemyName}`}>
								{enemy.label}
							</Link>
						</li>
					))
				: null}
		</ul>
	);
}

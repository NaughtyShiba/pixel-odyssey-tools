"use client";

import Link from "next/link";
import { getEnemies } from "../models";
import { getEnemiesQueryKey } from "../utils";
import { useQuery } from "@tanstack/react-query";

export function EnemiesList() {
	const { data: enemies } = useQuery({
		queryKey: getEnemiesQueryKey(),
		queryFn: getEnemies,
	});

	return (
		<ul>
			{enemies
				? Object.entries(enemies).map(([enemyName, enemy]) => (
						<li key={enemyName}>
							<Link href={`/enemies/${enemyName}`}>{enemy.label}</Link>
						</li>
					))
				: null}
		</ul>
	);
}

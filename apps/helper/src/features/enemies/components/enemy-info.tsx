"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import type { Enemy } from "../shape";
import {
	PageArticle,
	PageTitle,
	PageSubTitle,
	PageContent,
} from "@/src/components/page";
import { getEnemyQueryKey } from "../utils";

export function EnemyInfo() {
	const { slug } = useParams<{ slug: string }>();
	console.log(slug);
	const { data: enemy } = useQuery({
		queryKey: getEnemyQueryKey(slug),
		async queryFn() {
			const res = await fetch(`/api/enemies/${slug}`);
			return (await res.json()) as Enemy;
		},
	});

	return (
		<PageArticle>
			<PageTitle>{enemy?.name}</PageTitle>
			<PageContent>
				<PageSubTitle>Drops</PageSubTitle>
				<ul>
					{enemy?.drops.map(({ item, chance }) => (
						<li key={item}>
							{item} - {chance}%
						</li>
					))}
				</ul>
				<PageSubTitle>Locations</PageSubTitle>
				<ul>
					{enemy?.locations.map((location) => (
						<li key={location}>{location}</li>
					))}
				</ul>
			</PageContent>
		</PageArticle>
	);
}

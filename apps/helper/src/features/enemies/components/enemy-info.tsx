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
import { getItemsQueryKey } from "../../items/utils";
import { getLocationsQueryKey } from "../../locations/utils";
import Link from "next/link";

export function EnemyInfo() {
	const { slug } = useParams<{ slug: string }>();
	const { data: enemy } = useQuery({
		queryKey: getEnemyQueryKey(slug),
		async queryFn() {
			const res = await fetch(`/api/enemies/${slug}`);
			return (await res.json()) as Enemy;
		},
	});

	const { data: items } = useQuery({ queryKey: getItemsQueryKey() });
	const { data: locations } = useQuery({ queryKey: getLocationsQueryKey() });

	return (
		<PageArticle>
			<PageTitle>{enemy?.name}</PageTitle>
			<PageContent>
				<PageSubTitle>Drops</PageSubTitle>
				<ul>
					{enemy?.drops.map(({ item, chance }) => (
						<li key={item}>
							<Link href={`/items/${item}`}>
								{(items as Record<string, { label: string }>)[item].label} -{" "}
								{chance}%
							</Link>
						</li>
					))}
				</ul>
				<PageSubTitle>Locations</PageSubTitle>
				<ul>
					{enemy?.locations.map((location) => (
						<li key={location}>
							<Link href={`/locations/${location}`}>
								{
									(locations as Array<Record<string, string>>).find(
										(loc) => loc.value === location,
									)?.label
								}
							</Link>
						</li>
					))}
				</ul>
			</PageContent>
		</PageArticle>
	);
}

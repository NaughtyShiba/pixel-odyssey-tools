"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
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
import { getEnemy } from "../models";
import { getLocations } from "../../locations/models";
import { getItems } from "../../items/models";

export function EnemyInfo() {
	const { slug } = useParams<{ slug: string }>();
	const { data: enemy } = useQuery({
		queryKey: getEnemyQueryKey(slug),
		queryFn: () => getEnemy(slug),
	});

	const { data: items } = useQuery({
		queryKey: getItemsQueryKey(),
		queryFn: getItems,
	});
	const { data: locations } = useQuery({
		queryKey: getLocationsQueryKey(),
		queryFn: getLocations,
	});

	return (
		<PageArticle>
			<PageTitle>{enemy?.name}</PageTitle>
			<PageContent>
				<div>
					<PageSubTitle>Drops</PageSubTitle>
					<ul>
						{enemy?.drops?.map(({ item, chance }) => (
							<li key={item}>
								<Link href={`/items/${item}`}>
									{(items as Record<string, { label: string }>)[item].label} -{" "}
									{chance}%
								</Link>
							</li>
						))}
					</ul>
				</div>
				<div>
					<PageSubTitle>Locations</PageSubTitle>
					<ul>
						{enemy?.locations?.map((location) => (
							<li key={location}>
								<Link href={`/locations/${location}`}>
									{locations?.[location as keyof typeof locations]?.label}
								</Link>
							</li>
						))}
					</ul>
				</div>
			</PageContent>
		</PageArticle>
	);
}

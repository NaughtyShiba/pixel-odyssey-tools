"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import {
	PageArticle,
	PageTitle,
	PageSubTitle,
	PageContent,
} from "@/src/components/page";
import { getLocationQueryKey } from "../utils";
import { getEnemiesQueryKey } from "../../enemies/utils";
import { getItemsQueryKey } from "../../items/utils";
import Link from "next/link";
import { getItems } from "../../items/models";
import { getEnemies } from "../../enemies/models";
import { getLocation } from "../models";

export function LocationInfo() {
	const { slug } = useParams<{ slug: string }>();
	console.log(slug);
	const { data: location } = useQuery({
		queryKey: getLocationQueryKey(slug),
		queryFn: () => getLocation(slug),
	});
	console.log({ location });

	const { data: items } = useQuery({
		queryKey: getItemsQueryKey(),
		queryFn: getItems,
	});
	const { data: enemies } = useQuery({
		queryKey: getEnemiesQueryKey(),
		queryFn: getEnemies,
	});

	return (
		<PageArticle>
			<PageTitle>{location?.label}</PageTitle>
			<PageContent>
				<PageSubTitle>Enemies</PageSubTitle>
				<ul>
					{location?.enemies?.map((enemy) => (
						<li key={enemy}>
							<Link href={`/enemies/${enemy}`}>
								{enemies?.[enemy as keyof typeof enemies]?.label}
							</Link>
						</li>
					))}
				</ul>
				<PageSubTitle>Items</PageSubTitle>
				<ul>
					{location?.items?.map((item) =>
						item in (items ?? {}) ? (
							<li key={item}>
								<Link href={`/items/${item}`}>
									{(items as Record<string, { label: string }>)[item].label}
								</Link>
							</li>
						) : null,
					)}
				</ul>
				<PageSubTitle>NPCs</PageSubTitle>
				<ul>
					{location?.npcs?.map((npc) => (
						<li key={npc}>{npc}</li>
					))}
				</ul>
			</PageContent>
		</PageArticle>
	);
}

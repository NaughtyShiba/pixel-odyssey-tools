"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import type { LocationShape } from "../shape";
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

export function LocationInfo() {
	const { slug } = useParams<{ slug: string }>();
	console.log(slug);
	const { data: location } = useQuery({
		queryKey: getLocationQueryKey(slug),
		async queryFn() {
			const res = await fetch(`/api/locations/${slug}`);
			return (await res.json()) as LocationShape;
		},
	});

	const { data: items } = useQuery({ queryKey: getItemsQueryKey() });
	const { data: enemies } = useQuery({ queryKey: getEnemiesQueryKey() });

	return (
		<PageArticle>
			<PageTitle>{location?.label}</PageTitle>
			<PageContent>
				<PageSubTitle>Enemies</PageSubTitle>
				<ul>
					{location?.enemies.map((enemy) => (
						<li key={enemy}>
							<Link href={`/enemies/${enemy}`}>
								{(enemies as Record<string, string>)[enemy]}
							</Link>
						</li>
					))}
				</ul>
				<PageSubTitle>Items</PageSubTitle>
				<ul>
					{location?.items.map((item) =>
						item in (items as Record<string, string>) ? (
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
					{location?.npcs.map((npc) => (
						<li key={npc}>{npc}</li>
					))}
				</ul>
			</PageContent>
		</PageArticle>
	);
}

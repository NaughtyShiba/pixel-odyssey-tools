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

export function LocationInfo() {
	const { slug } = useParams<{ slug: string }>();
	console.log(slug);
	const { data: location } = useQuery({
		queryKey: getLocationQueryKey(slug),
		async queryFn() {
			const res = await fetch(`/api/location/${slug}`);
			return (await res.json()) as LocationShape;
		},
	});

	return (
		<PageArticle>
			<PageTitle>{location?.label}</PageTitle>
			<PageContent>
				<PageSubTitle>Enemies</PageSubTitle>
				<ul>
					{location?.enemies.map((enemy) => (
						<li key={enemy}>{enemy}</li>
					))}
				</ul>
				<PageSubTitle>Items</PageSubTitle>
				<ul>
					{location?.items.map((item) => (
						<li key={item}>{item}</li>
					))}
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

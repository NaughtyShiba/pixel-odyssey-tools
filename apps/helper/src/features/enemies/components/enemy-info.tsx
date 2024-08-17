"use client";

import {
	PageArticle,
	PageContent,
	PageSubTitle,
	PageTitle,
} from "@/src/components/page";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@repo/ui/components/table";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getItems } from "../../items/models";
import { getItemsQueryKey } from "../../items/utils";
import { getLocations } from "../../locations/models";
import { getLocationsQueryKey } from "../../locations/utils";
import { getEnemy } from "../models";
import { getEnemyQueryKey } from "../utils";

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
				<div className="flex flex-col gap-8">
					<PageSubTitle>Drops</PageSubTitle>
					<Table className="w-auto">
						<TableHeader>
							<TableRow>
								<TableHead>Item</TableHead>
								<TableHead>Rarity</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{enemy?.drops?.map(({ item, chance }) => (
								<TableRow key={item}>
									<TableCell>
										<Link className="underline" href={`/items/${item}`}>
											{(items as Record<string, { label: string }>)[item].label}
										</Link>
									</TableCell>
									<TableCell>{chance}%</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
				<div className="flex flex-col gap-8">
					<PageSubTitle>Locations</PageSubTitle>
					<Table className="w-auto">
						<TableHeader>
							<TableRow>
								<TableHead>Area</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{enemy?.locations?.map((location) => (
								<TableRow key={location}>
									<TableCell>
										<Link
											className="underline"
											href={`/destinations/${location}`}>
											{locations?.[location as keyof typeof locations]?.label}
										</Link>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</PageContent>
		</PageArticle>
	);
}

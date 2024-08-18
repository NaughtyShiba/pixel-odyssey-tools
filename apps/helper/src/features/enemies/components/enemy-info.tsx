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
import { getEnemyQuery } from "@/src/models/enemies/queries";
import { getAllDestinationsQuery } from "@/src/models/destinations/queries";
import { getAllItemsQuery } from "@/src/models/items/queries";

export function EnemyInfo() {
	const { slug } = useParams<{ slug: string }>();
	const { data: enemy } = useQuery(getEnemyQuery(slug));
	const { data: items } = useQuery(getAllItemsQuery());
	const { data: locations } = useQuery(getAllDestinationsQuery());

	return (
		<PageArticle>
			<PageTitle>{enemy?.label}</PageTitle>
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
							{enemy?.items?.map(({ itemId, chance }) => (
								<TableRow key={itemId}>
									<TableCell>
										<Link className="underline" href={`/items/${itemId}`}>
											{items?.find((i) => i.id === itemId)?.label}
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
							{enemy?.destinations?.map((destination) => (
								<TableRow key={destination}>
									<TableCell>
										<Link
											className="underline"
											href={`/destinations/${destination}`}>
											{locations?.find((l) => l.id === destination)?.label}
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

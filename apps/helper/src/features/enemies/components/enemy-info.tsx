"use client";

import {
	PageArticle,
	PageContent,
	PageSubTitle,
	PageTitle,
} from "@/components/page";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@repo/ui/components/table";
import Link from "next/link";
import { use } from "react";

interface EnemyInfoProps {
	destinations: Promise<
		{
			id: string;
			label: string;
		}[]
	>;
	items: Promise<
		{
			id: string;
			label: string;
			type: string;
			slot: string | null;
		}[]
	>;
	enemy: Promise<
		| {
				destinations: string[];
				items: {
					itemId: string;
					chance: number | null;
				}[];
				id: string;
				label: string;
		  }
		| undefined
	>;
}

export function EnemyInfo(props: EnemyInfoProps) {
	const destinations = use(props.destinations);
	const items = use(props.items);
	const enemy = use(props.enemy);

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
											{destinations?.find((l) => l.id === destination)?.label}
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

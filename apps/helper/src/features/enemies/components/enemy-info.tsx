// "use client";

import {
	PageArticle,
	PageContent,
	PageSubTitle,
	PageTitle,
} from "@/components/page";
import { ItemLink } from "@/features/mdx/components/item-link";
import type { Enemy } from "@/models/enemies/models";
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
	enemy: Promise<Enemy>;
}

export function EnemyInfo(props: EnemyInfoProps) {
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
							{enemy?.items?.map(({ item, chance }) => (
								<TableRow key={item?.id}>
									<TableCell>
										<ItemLink itemName={item?.id ?? ""} />
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
							{enemy?.destinations?.map(({ destination }) => (
								<TableRow key={destination.id}>
									<TableCell>
										<Link
											className="underline"
											href={`/destinations/${destination.id}`}>
											{destination?.label}
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

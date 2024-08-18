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
import { getDestinationQuery } from "@/src/models/destinations/queries";
import { getAllEnemiesQuery } from "@/src/models/enemies/queries";
import { getAllItemsQuery } from "@/src/models/items/queries";

const COMMON_DROPS = [
	"acorn",
	"arrowhead",
	"basic_key",
	"big_pouch",
	"bone",
	"empty_potion",
	"emerald",
	"flask",
	"medium_empty_potion",
	"nail",
	"pouch",
	"rabbits_foot",
	"ring",
	"sardine_tin",
	"shirt",
	"small_pouch",
	"tower_reverse_rune",
	"wishbone",
];

export function LocationInfo() {
	const { slug } = useParams<{ slug: string }>();

	const { data: location } = useQuery(getDestinationQuery(slug));
	const { data: items } = useQuery(getAllItemsQuery());
	const { data: enemies } = useQuery(getAllEnemiesQuery());

	if (!location) return null;

	return (
		<PageArticle>
			<PageTitle>{location?.label}</PageTitle>
			<PageContent>
				<div className="flex flex-col gap-8">
					<PageSubTitle>Enemies</PageSubTitle>
					<Table className="w-auto">
						<TableHeader>
							<TableRow>
								<TableHead>Area</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{location?.enemies?.map((enemy) => (
								<TableRow key={enemy}>
									<TableCell>
										<Link className="underline" href={`/enemies/${enemy}`}>
											{enemies?.find((e) => e.id === enemy)?.label}
										</Link>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
				<div className="flex flex-col gap-8">
					<PageSubTitle>Area Drops</PageSubTitle>
					<Table className="w-auto">
						<TableHeader>
							<TableRow>
								<TableHead>Area</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{location?.items?.map((item) =>
								items?.find((i) => i.id === item) ? (
									<TableRow key={item}>
										<TableCell>
											<Link className="underline" href={`/items/${item}`}>
												{items?.find((i) => i.id === item)?.label}
											</Link>
										</TableCell>
									</TableRow>
								) : null,
							)}
						</TableBody>
					</Table>
				</div>
				<div className="flex flex-col gap-8">
					<PageSubTitle>Common Drops</PageSubTitle>
					<Table className="w-auto">
						<TableHeader>
							<TableRow>
								<TableHead>Area</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{COMMON_DROPS.map((item) =>
								items?.find((i) => i.id === item) ? (
									<TableRow key={item}>
										<TableCell>
											<Link className="underline" href={`/items/${item}`}>
												{items?.find((i) => i.id === item)?.label}
											</Link>
										</TableCell>
									</TableRow>
								) : null,
							)}
						</TableBody>
					</Table>
				</div>
			</PageContent>
		</PageArticle>
	);
}

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
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from "@repo/ui/components/table";

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

	const { data: location } = useQuery({
		queryKey: getLocationQueryKey(slug),
		queryFn: () => getLocation(slug),
	});

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
										<Link href={`/enemies/${enemy}`}>
											{enemies?.[enemy as keyof typeof enemies]?.label}
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
								items?.[item]?.label ? (
									<TableRow key={item}>
										<TableCell>
											<Link href={`/items/${item}`}>
												{items?.[item]?.label}
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
								items?.[item]?.label ? (
									<TableRow key={item}>
										<TableCell>
											<Link href={`/items/${item}`}>
												{items?.[item]?.label}
											</Link>
										</TableCell>
									</TableRow>
								) : null,
							)}
						</TableBody>
					</Table>
				</div>
				<div className="flex flex-col gap-8">
					<PageSubTitle>NPCs</PageSubTitle>
					<Table className="w-auto">
						<TableHeader>
							<TableRow>
								<TableHead>Area</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{location?.npcs?.map((npc) => (
								<TableRow key={npc}>
									<TableCell>
										<Link href={`/npc/${npc}`}>{npc}</Link>
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

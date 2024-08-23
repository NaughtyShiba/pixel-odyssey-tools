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

interface LocationInfoProps {
	destination: Promise<
		| {
				enemies: string[];
				items: string[];
				id: string;
				label: string;
				description: string | null;
		  }
		| undefined
	>;
	items: Promise<
		{
			id: string;
			label: string;
			type: string;
			slot: string | null;
		}[]
	>;
	enemies: Promise<
		{
			id: string;
			label: string;
		}[]
	>;
}

export function LocationInfo(props: LocationInfoProps) {
	const destination = use(props.destination);
	const enemies = use(props.enemies);
	const items = use(props.items);

	if (!destination || !enemies || !items) return <div>Loading...</div>;

	return (
		<PageArticle>
			<PageTitle>{destination?.label}</PageTitle>
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
							{destination?.enemies?.map((enemy) => (
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
							{destination?.items?.map((item) =>
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

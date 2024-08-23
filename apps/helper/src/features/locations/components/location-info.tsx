import { EnemyLink } from "@/components/enemy-link";
import { ItemLink } from "@/components/item-link";
import {
	PageArticle,
	PageContent,
	PageSubTitle,
	PageTitle,
} from "@/components/page";
import type { Destination } from "@/models/destinations/models";
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
	destination: Promise<Destination>;
}

export function LocationInfo(props: LocationInfoProps) {
	const destination = use(props.destination);

	// if (!destination) return <div>Loading...</div>;
	console.log("abc", { destination });
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
							{destination?.enemies?.map(({ enemy }) => (
								<TableRow key={enemy?.id}>
									<TableCell>
										<EnemyLink id={enemy?.id} label={enemy.label} />
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
							{destination?.items?.map(({ item }) => (
								<TableRow key={item?.id}>
									<TableCell>
										<ItemLink id={item.id} label={item.label} />
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
				{/*<div className="flex flex-col gap-8">
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
				</div>*/}
			</PageContent>
		</PageArticle>
	);
}

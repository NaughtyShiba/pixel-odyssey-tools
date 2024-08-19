import { PageSubTitle } from "@/components/page";
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
import type { Craftable } from "../types";
import { getAllItemsQuery } from "@/models/items/queries";

interface CraftInfoProps extends Craftable {}
export function CraftInfo({ craftedFromRecipes }: CraftInfoProps) {
	const { data: items } = useQuery(getAllItemsQuery());

	if (craftedFromRecipes.length === 0) return null;

	return (
		<>
			<section className="flex flex-col gap-8">
				<PageSubTitle>Craft requirements:</PageSubTitle>
				<Table className="w-auto">
					<TableHeader>
						<TableRow>
							<TableHead>Item</TableHead>
							<TableHead>Amount</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{craftedFromRecipes.map(({ itemId, amount }) => (
							<TableRow key={itemId}>
								<TableCell className="flex gap-2 items-center">
									<Link className="underline" href={`/items/${itemId}`}>
										{items?.find((i) => i.id === itemId)?.label}
									</Link>
								</TableCell>
								<TableCell>{amount}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</section>
			{/*<section className="flex flex-col gap-8">
				<PageSubTitle>Total Items required:</PageSubTitle>
				<Table className="w-auto">
					<TableHeader>
						<TableRow>
							<TableHead>Item</TableHead>
							<TableHead>Amount</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{Object.entries(total_craft).map(([itemName, amount]) => (
							<TableRow key={itemName}>
								<TableCell className="flex gap-2 items-center">
									<Link className="underline" href={`/items/${itemName}`}>
										{
											(items as Record<string, { label: string }>)[itemName]
												.label
										}
									</Link>
								</TableCell>
								<TableCell>{amount}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</section>*/}
		</>
	);
}

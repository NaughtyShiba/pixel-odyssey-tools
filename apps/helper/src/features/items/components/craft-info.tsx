import { PageSubTitle } from "@/src/components/page";
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
import { getItemsQueryKey } from "../utils";

interface CraftInfoProps extends Craftable {}
export function CraftInfo({ craft, total_craft }: CraftInfoProps) {
	const { data: items } = useQuery({ queryKey: getItemsQueryKey() });

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
						{Object.entries(craft).map(([itemName, amount]) => (
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
			</section>
			<section className="flex flex-col gap-8">
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
			</section>
		</>
	);
}

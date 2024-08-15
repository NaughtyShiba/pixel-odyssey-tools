import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@repo/ui/components/table";
import type { RecipeIngredient } from "../types";
import { getItemsQueryKey } from "../utils";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { PageSubTitle } from "@/src/components/page";

interface RecipeInfoProps extends RecipeIngredient {}
export function RecipeInfo({ recipe }: RecipeInfoProps) {
	const { data: items } = useQuery({ queryKey: getItemsQueryKey() });

	return (
		<>
			<section className="flex flex-col gap-8">
				<PageSubTitle>Used to craft:</PageSubTitle>
				<Table className="w-auto">
					<TableHeader>
						<TableRow>
							<TableHead>Recipe</TableHead>
							<TableHead>Amount</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{Object.entries(recipe).map(([itemName, amount]) => (
							<TableRow key={itemName}>
								<TableCell className="flex gap-2 items-center">
									<Link href={`/items/${itemName}`}>
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

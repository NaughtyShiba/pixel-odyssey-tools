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
import type { RecipeIngredient } from "../types";
import { getAllItemsQuery } from "@/models/items/queries";

interface RecipeInfoProps extends RecipeIngredient {}
export function RecipeInfo({ usedToCraft }: RecipeInfoProps) {
	const { data: items } = useQuery(getAllItemsQuery());

	if (usedToCraft.length === 0) return null;

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
						{usedToCraft.map(({ itemId, amount }) => (
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
		</>
	);
}

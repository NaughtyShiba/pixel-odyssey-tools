import { PageSubTitle } from "@/components/page";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@repo/ui/components/table";
import Link from "next/link";
import type { Item } from "@/models/items/models";

interface RecipeInfoProps {
	materialForRecipes: NonNullable<Item>["materialForRecipes"];
}

export function RecipeInfo({ materialForRecipes }: RecipeInfoProps) {
	if (materialForRecipes.length === 0) return null;

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
						{materialForRecipes.map(({ craft, amount }) => (
							<TableRow key={craft?.id}>
								<TableCell className="flex gap-2 items-center">
									<Link className="underline" href={`/items/${craft?.id}`}>
										{craft?.label}
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

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

interface CraftInfoProps {
	craftedFromRecipes: NonNullable<Item>["craftedFromRecipes"];
}
export function CraftInfo({ craftedFromRecipes }: CraftInfoProps) {
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
						{craftedFromRecipes.map(({ material, amount }) => (
							<TableRow key={material?.id}>
								<TableCell className="flex gap-2 items-center">
									<Link className="underline" href={`/items/${material?.id}`}>
										{material?.label}
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

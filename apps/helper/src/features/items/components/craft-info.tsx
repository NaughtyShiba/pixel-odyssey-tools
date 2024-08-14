import type { Craftable, Refineable } from "../shape";
import {
	Table,
	TableRow,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
} from "@repo/ui/components/table";

interface CraftInfoProps extends Craftable {}
export function CraftInfo({ craft, total_craft }: CraftInfoProps) {
	return (
		<>
			<section className="flex flex-col gap-1">
				<h3 className="text-sm text-muted-foreground">Craft requirements:</h3>
				<Table>
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
									<span>{itemName}</span>
								</TableCell>
								<TableCell>{amount}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</section>
			<section className="flex flex-col gap-1">
				<h3 className="text-sm text-muted-foreground">Total Items required:</h3>
				<Table>
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
									<span>{itemName}</span>
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

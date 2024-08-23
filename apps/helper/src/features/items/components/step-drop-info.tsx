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

interface StepDropInfoProps {
	destinations: NonNullable<Item>["destinations"];
}
export function StepDropInfo({ destinations }: StepDropInfoProps) {
	if (destinations.length === 0) return null;

	return (
		<section className="flex flex-col gap-8">
			<PageSubTitle>Found in:</PageSubTitle>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Location</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{destinations.map(({ destination }) => (
						<TableRow key={destination?.id}>
							<TableCell>
								<Link
									className="underline"
									href={`/destinations/${destination?.id}`}>
									{destination?.label}
								</Link>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</section>
	);
}

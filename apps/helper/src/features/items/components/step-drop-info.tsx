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
import type { DroppedByStepping } from "../types";
import { getAllDestinationsQuery } from "@/models/destinations/queries";

interface StepDropInfoProps extends DroppedByStepping {}
export function StepDropInfo({ destinations }: StepDropInfoProps) {
	const { data: locations } = useQuery(getAllDestinationsQuery());

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
					{destinations.map((destination) => (
						<TableRow key={destination}>
							<TableCell>
								<Link
									className="underline"
									href={`/destinations/${destination}`}>
									{locations?.find((l) => l.id === destination)?.label}
								</Link>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</section>
	);
}

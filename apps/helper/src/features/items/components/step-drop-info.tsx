import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@repo/ui/components/table";
import type { DroppedByStepping } from "../types";
import { useQuery } from "@tanstack/react-query";
import { getLocationsQueryKey } from "../../locations/utils";
import Link from "next/link";
import { getLocations } from "../../locations/models";

interface StepDropInfoProps extends DroppedByStepping {}
export function StepDropInfo({ stepping_drop }: StepDropInfoProps) {
	const { data: locations } = useQuery({
		queryKey: getLocationsQueryKey(),
		queryFn: getLocations,
	});

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Location</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{stepping_drop.map((location) => (
					<TableRow key={location}>
						<TableCell>
							<Link href={`/locations/${location}`}>
								{locations?.[location]?.label}
							</Link>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}

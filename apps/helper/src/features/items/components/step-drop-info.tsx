import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@repo/ui/components/table";
import type { DroppedByStepping } from "../shape";

interface StepDropInfoProps extends DroppedByStepping {}
export function StepDropInfo({ stepping_drop }: StepDropInfoProps) {
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
						<TableCell>{location}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}

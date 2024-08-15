import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@repo/ui/components/table";
import type { Refineable } from "../types";

interface RefineInfoProps extends Refineable {}
export function RefineInfo({ perfect_refine }: RefineInfoProps) {
	return (
		<section className="flex flex-col gap-1">
			<h3 className="text-xl">Perfect refine:</h3>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Target level</TableHead>
						<TableHead>Source Item Level</TableHead>
						<TableHead>Sacrifice Item Level</TableHead>
						<TableHead>Sacrifice Item Perfect</TableHead>
						<TableHead>Total Level 1 Items Required</TableHead>
						{Object.keys(perfect_refine[1].stats).map((stat) => (
							<TableHead key={stat}>{stat}</TableHead>
						))}
					</TableRow>
				</TableHeader>
				<TableBody>
					{Object.entries(perfect_refine).map(([key, entry]) =>
						typeof entry.refine_with === "undefined" ? (
							<TableRow key={key}>
								<TableCell>{key}</TableCell>
								<TableCell>-</TableCell>
								<TableCell>-</TableCell>
								<TableCell>-</TableCell>
								<TableCell>-</TableCell>
								{Object.entries(entry.stats).map(([stat, value]) => (
									<TableCell key={stat}>{value}</TableCell>
								))}
							</TableRow>
						) : (
							<TableRow key={key}>
								<TableCell>{key}</TableCell>
								<TableCell>{Number(key) - 1}</TableCell>
								<TableCell>{entry.refine_with.level}</TableCell>
								<TableCell>
									{entry.refine_with.perfect ? "yes" : "no"}
								</TableCell>
								<TableCell>{entry.total_items}</TableCell>
								{Object.entries(entry.stats).map(([stat, value]) => (
									<TableCell key={stat}>{value}</TableCell>
								))}
							</TableRow>
						),
					)}
				</TableBody>
			</Table>
		</section>
	);
}

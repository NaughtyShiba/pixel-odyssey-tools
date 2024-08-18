import { PageSubTitle } from "@/src/components/page";
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
export function RefineInfo({ perfectRefine }: RefineInfoProps) {
	return (
		<section className="flex flex-col gap-8">
			<PageSubTitle>Perfect refine:</PageSubTitle>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Target level</TableHead>
						<TableHead>Source Item Level</TableHead>
						<TableHead>Sacrifice Item Level</TableHead>
						<TableHead>Sacrifice Item Perfect</TableHead>
						<TableHead>Total Level 1 Items Required</TableHead>
						{Object.keys(perfectRefine[1].stats).map((stat) => (
							<TableHead key={stat}>{stat}</TableHead>
						))}
					</TableRow>
				</TableHeader>
				<TableBody>
					{Object.entries(perfectRefine).map(([key, entry]) =>
						typeof entry.cheapestItem === "undefined" ||
						entry.cheapestItem === null ? (
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
								<TableCell>{entry.cheapestItem.level}</TableCell>
								<TableCell>
									{entry.cheapestItem.perfect ? "yes" : "no"}
								</TableCell>
								<TableCell>{entry.itemsRequired}</TableCell>
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

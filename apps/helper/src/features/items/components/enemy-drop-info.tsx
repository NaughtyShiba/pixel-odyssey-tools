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

interface EnemyDropInfoProps {
	enemies: NonNullable<Item>["enemies"];
}
export function EnemyDropInfo({ enemies }: EnemyDropInfoProps) {
	if (enemies.length === 0) return null;

	return (
		<section className="flex flex-col gap-8">
			<PageSubTitle>Drop rate from enemies:</PageSubTitle>
			<Table className="w-auto">
				<TableHeader>
					<TableRow>
						<TableHead>Enemy</TableHead>
						<TableHead>Chance</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{enemies.map(({ enemy, chance }) => (
						<TableRow key={enemy?.id}>
							<TableCell>
								<Link className="underline" href={`/enemies/${enemy?.id}`}>
									{enemy?.label}
								</Link>
							</TableCell>
							<TableCell>{chance}%</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</section>
	);
}

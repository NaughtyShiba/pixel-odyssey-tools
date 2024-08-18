import { PageSubTitle } from "@/src/components/page";
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
import type { DroppedByEnemies } from "../types";
import { getAllEnemiesQuery } from "@/src/models/enemies/queries";

interface EnemyDropInfoProps extends DroppedByEnemies {}
export function EnemyDropInfo({
	enemies: enemiesDroppedBy,
}: EnemyDropInfoProps) {
	const { data: enemies } = useQuery(getAllEnemiesQuery());

	if (enemiesDroppedBy.length === 0) return null;

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
					{enemiesDroppedBy.map(({ enemyId, chance }) => (
						<TableRow key={enemyId}>
							<TableCell>
								<Link className="underline" href={`/enemies/${enemyId}`}>
									{enemies?.find((e) => e.id === enemyId)?.label}
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

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
import { getEnemies } from "../../enemies/models";
import { getEnemiesQueryKey } from "../../enemies/utils";
import type { DroppedByEnemies } from "../types";

interface EnemyDropInfoProps extends DroppedByEnemies {}
export function EnemyDropInfo({ enemy_drop }: EnemyDropInfoProps) {
	const { data: enemies } = useQuery({
		queryKey: getEnemiesQueryKey(),
		queryFn: () => getEnemies(),
	});

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
					{Object.entries(enemy_drop).map(([enemyName, chance]) => (
						<TableRow key={enemyName}>
							<TableCell>
								<Link className="underline" href={`/enemies/${enemyName}`}>
									{enemies?.[enemyName as keyof typeof enemies]?.label}
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

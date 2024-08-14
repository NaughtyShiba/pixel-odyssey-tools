import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@repo/ui/components/table";
import type { DroppedByEnemies } from "../shape";

interface EnemyDropInfoProps extends DroppedByEnemies {}
export function EnemyDropInfo({ enemy_drop }: EnemyDropInfoProps) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Enemy</TableHead>
					<TableHead>Chance</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{Object.entries(enemy_drop).map(([enemyName, chance]) => (
					<TableRow key={enemyName}>
						<TableCell>{enemyName}</TableCell>
						<TableCell>{chance}%</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}

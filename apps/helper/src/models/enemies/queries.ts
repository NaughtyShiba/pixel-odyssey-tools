import { getAllEnemies, getEnemy } from "./models";

export function getAllEnemiesQuery() {
	return {
		queryKey: ["enemies"],
		async queryFn() {
			return await getAllEnemies();
		},
	};
}

export function getEnemyQuery(id: string) {
	return {
		queryKey: ["enemies", id],
		async queryFn() {
			return await getEnemy(id);
		},
	};
}

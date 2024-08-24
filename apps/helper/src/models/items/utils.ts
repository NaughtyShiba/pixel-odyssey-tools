import type { StatType } from "./types";

const statsRefineBonus: Record<StatType, number> = {
	air_damage: 25,
	air_defense: 25,
	attack: 25,
	defense: 25,
	earth_damage: 25,
	earth_defense: 25,
	fire_damage: 25,
	fire_defense: 25,
	health: 25,
	luck: 25,
	mana: 25,
	mana_regen: 25,
	speed: 25,
	water_damage: 25,
	water_defense: 25,
	crit_chance: 16.75,
	crit_damage: 16.75,
	mining: 12.5,
	berry: 12.5,
	mush: 12.5,
};

type StatName = keyof typeof statsRefineBonus;
type Stats = Partial<Record<keyof typeof statsRefineBonus, number>>;

interface StatRecord {
	level: number;
	stats: Stats;
	itemsRequired: number;
	perfect: boolean;
	cheapestItem?: StatRecord | null;
}

type NumbersPerLevel = { [key: number]: StatRecord };
type NumbersPerPerfectLevel = { [key: number]: StatRecord };

function betterForRefine(newStats: Stats, potentialNewStats: Stats): boolean {
	return Object.entries(newStats).some(
		([stat, val]) => val > (potentialNewStats[stat as StatName] || 0),
	);
}

export function calculateImperfectRefine(stats: Stats): NumbersPerLevel {
	const numbersPerLevel: NumbersPerLevel = {
		1: {
			level: 1,
			stats: stats,
			itemsRequired: 1.0,
			perfect: false,
		},
	};

	for (let targetLevel = 2; targetLevel <= 10; targetLevel++) {
		const previousLevelStats = numbersPerLevel[targetLevel - 1].stats;
		const currentLevelStats: Stats = {};
		for (const [stat, val] of Object.entries(previousLevelStats)) {
			const nextVal =
				val +
				Math.max(
					Math.floor(
						((stats[stat as StatName] ?? 1) / 100) *
							statsRefineBonus[stat as StatName],
					),
					2,
				);
			currentLevelStats[stat as StatName] = nextVal;
		}
		numbersPerLevel[targetLevel] = {
			level: targetLevel,
			itemsRequired: targetLevel,
			stats: currentLevelStats,
			perfect: false,
		};
	}

	return numbersPerLevel;
}

export function calculatePerfectRefine(stats: Stats): NumbersPerPerfectLevel {
	const numbersPerImperfectLevel = calculateImperfectRefine(stats);
	const numbersPerPerfectLevel: NumbersPerPerfectLevel = {
		1: {
			level: 1,
			stats: numbersPerImperfectLevel[1].stats,
			itemsRequired: numbersPerImperfectLevel[1].itemsRequired,
			cheapestItem: null,
			perfect: true,
		},
		2: {
			level: 2,
			stats: numbersPerImperfectLevel[2].stats,
			itemsRequired: numbersPerImperfectLevel[2].itemsRequired,
			cheapestItem: numbersPerImperfectLevel[1],
			perfect: true,
		},
	};

	for (let targetLevel = 3; targetLevel <= 10; targetLevel++) {
		let cheapestItemToRefineWith: StatRecord | null = null;
		const previousLevelStats = numbersPerPerfectLevel[targetLevel - 1].stats;
		let potentialNewStats = numbersPerPerfectLevel[targetLevel - 2].stats;

		for (
			let sacrificeLevel = 1;
			sacrificeLevel < targetLevel;
			sacrificeLevel++
		) {
			const sacrificeItem = numbersPerImperfectLevel[sacrificeLevel];
			const statsToCompare: Stats = {};
			for (const [stat, val] of Object.entries(previousLevelStats)) {
				const nextVal =
					val +
					Math.max(
						Math.floor(
							((sacrificeItem.stats[stat as StatName] ?? 1) / 100) *
								statsRefineBonus[stat as StatName],
						),
						2,
					);
				statsToCompare[stat as StatName] = nextVal;
			}
			if (betterForRefine(statsToCompare, potentialNewStats)) {
				potentialNewStats = statsToCompare;
				cheapestItemToRefineWith = sacrificeItem;
			}
		}

		for (
			let sacrificeLevel = 1;
			sacrificeLevel < targetLevel;
			sacrificeLevel++
		) {
			const sacrificeItem = numbersPerPerfectLevel[sacrificeLevel];
			const statsToCompare: Stats = {};
			for (const [stat, val] of Object.entries(previousLevelStats)) {
				const nextVal =
					val +
					Math.max(
						Math.floor(
							((sacrificeItem.stats[stat as StatName] ?? 1) / 100) *
								statsRefineBonus[stat as StatName],
						),
						2,
					);
				statsToCompare[stat as StatName] = nextVal;
			}
			if (betterForRefine(statsToCompare, potentialNewStats)) {
				potentialNewStats = statsToCompare;
				cheapestItemToRefineWith = sacrificeItem;
			}
		}

		if (cheapestItemToRefineWith) {
			numbersPerPerfectLevel[targetLevel] = {
				level: targetLevel,
				stats: potentialNewStats,
				itemsRequired:
					numbersPerPerfectLevel[targetLevel - 1].itemsRequired +
					cheapestItemToRefineWith.itemsRequired,
				cheapestItem: cheapestItemToRefineWith,
				perfect: true,
			};
		}
	}
	return numbersPerPerfectLevel;
}

export interface Enemy {
	name: string;
	drops: Array<{ item: string; chance: number }>;
	locations: string[];
}

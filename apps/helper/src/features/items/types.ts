interface Item {
	perfect_refine?: Record<
		string,
		{
			total_items: number;
			stats: Record<string, number>;
			refine_with?: {
				perfect: boolean;
				level: number;
			};
		}
	>;
}

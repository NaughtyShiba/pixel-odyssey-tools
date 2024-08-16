export const groupBy = <
	T extends Record<string, string | number | null>,
	K extends keyof T,
	G extends T[K],
>(
	list: T[],
	key: (item: T) => G,
) =>
	list.reduce(
		(previous, currentItem) => {
			const group = key(currentItem) as G;
			previous[group] ??= [];
			previous[group].push(currentItem);
			return previous;
		},
		{} as Record<G, T[]>,
	);

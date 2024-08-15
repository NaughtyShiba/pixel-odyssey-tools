export const groupBy = <
	T extends Record<string, string>,
	K extends keyof T,
	G extends T[K],
>(
	list: T[],
	key: K,
) =>
	list.reduce(
		(previous, currentItem) => {
			const group = currentItem[key] as G;
			previous[group] ??= [];
			previous[group].push(currentItem);
			return previous;
		},
		{} as Record<G, T[]>,
	);

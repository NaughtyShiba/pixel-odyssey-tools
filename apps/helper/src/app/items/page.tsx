import { ItemInfo } from "@repo/helper/features/items/components/item-info";

export default async function Page() {
	const data = (await import("@repo/helper/data/items.json")).default;
	const items = Array.from(Object.entries(data)).map(([key, label]) => ({
		value: key,
		label: label,
	}));

	return (
		<article className="w-full">
			<div className="mx-auto grid w-full max-w-6xl gap-2">
				<h1 className="text-3xl font-semibold">Items Info</h1>
			</div>
			<ItemInfo items={items} />
		</article>
	);
}

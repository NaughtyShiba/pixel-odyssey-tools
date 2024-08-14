import { ItemInfo } from "../features/items/components/item-info";
export default async function Page() {
	const data = await import("../../data/items.json");
	const items = Array.from(data).map((i) => ({ value: i, label: i }));

	return (
		<article className="w-full">
			<ItemInfo items={items} />
		</article>
	);
}

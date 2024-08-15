import { ItemInfo } from "@repo/helper/features/items/components/item-info";
import { PageArticle, PageContent, PageTitle } from "@/src/components/page";

export default async function Page() {
	const data = (await import("@repo/helper/data/items.json")).default;
	const items = Array.from(Object.entries(data)).map(([key, label]) => ({
		value: key,
		label: label,
	}));

	return (
		<PageArticle>
			<PageTitle>Items Info</PageTitle>
			<PageContent>
				<ItemInfo items={items} />
			</PageContent>
		</PageArticle>
	);
}

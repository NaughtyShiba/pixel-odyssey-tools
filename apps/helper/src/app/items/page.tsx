import {
	PageArticle,
	PageContent,
	PageSubTitle,
	PageTitle,
} from "@/src/components/page";
import Link from "next/link";

const groupBy = <T, K extends T[keyof T]>(list: T[], getKey: (item: T) => K) =>
	list.reduce(
		(previous, currentItem) => {
			const group = getKey(currentItem);
			if (!previous[group]) previous[group] = [];
			previous[group].push(currentItem);
			return previous;
		},
		{} as Record<K, T[]>,
	);

export default async function Page() {
	const items = (await import("@repo/helper/data/items.json")).default;
	const groupedItems = groupBy(
		Object.entries(items).map(([key, item]) => ({ ...item, id: key })),
		(item) => item.type,
	);

	return (
		<PageArticle>
			<PageTitle>Items Info</PageTitle>
			<PageContent>
				{Object.entries(groupedItems).map(([groupId, group]) => {
					return (
						<div key={groupId}>
							<PageSubTitle>{groupId}</PageSubTitle>
							<ul>
								{group?.map((item) => (
									<li key={item.id}>
										<Link href={`/items/${item.id}`}>{item.label}</Link>
									</li>
								))}
							</ul>
						</div>
					);
				})}
			</PageContent>
		</PageArticle>
	);
}

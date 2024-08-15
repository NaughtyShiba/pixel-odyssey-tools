import {
	PageArticle,
	PageContent,
	PageSubTitle,
	PageTitle,
} from "@/src/components/page";
import Link from "next/link";

const groupBy = <
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

export default async function Page() {
	const items = (await import("@repo/helper/data/items.json")).default;
	const groupedItems = groupBy(
		Object.entries(items).map(([key, item]) => ({ ...item, id: key })),
		"type",
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

import { PageArticle, PageContent, PageTitle } from "@/components/page";
import { ItemsList } from "@/features/items/components/items-list";
import { getItemsByCategory } from "@/models/items/models";

export default function Page({ params }: { params: { slug: string } }) {
	const items = getItemsByCategory(params.slug);

	return (
		<PageArticle>
			<PageTitle>Category</PageTitle>
			<PageContent>
				<ItemsList items={items} />
			</PageContent>
		</PageArticle>
	);
}

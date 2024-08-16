import { PageArticle, PageContent, PageTitle } from "@/src/components/page";
import { ItemsList } from "@/src/features/items/components/items-list";

export default function Page() {
	return (
		<PageArticle>
			<PageTitle>Category</PageTitle>
			<PageContent>
				<ItemsList />
			</PageContent>
		</PageArticle>
	);
}

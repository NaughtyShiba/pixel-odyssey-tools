import { PageArticle, PageContent, PageTitle } from "@/components/page";
import { GroupsList } from "@/features/items/components/groups-list";
import { getItemsCategories } from "@/models/items/models";

export default function Page() {
	const categories = getItemsCategories();

	return (
		<PageArticle>
			<PageTitle>Items Info</PageTitle>
			<PageContent>
				<GroupsList categories={categories} />
			</PageContent>
		</PageArticle>
	);
}

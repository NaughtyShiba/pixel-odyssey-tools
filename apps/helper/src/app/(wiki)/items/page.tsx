import { PageArticle, PageContent, PageTitle } from "@/src/components/page";
import { GroupsList } from "@/src/features/items/components/groups-list";

export default function Page() {
	return (
		<PageArticle>
			<PageTitle>Items Info</PageTitle>
			<PageContent>
				<GroupsList />
			</PageContent>
		</PageArticle>
	);
}

import { PageArticle, PageContent, PageTitle } from "@/src/components/page";
import { GroupsList } from "@/src/features/items/components/groups-list";
import { getItemsCategoriesQuery } from "@/src/models/items/queries";
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";

export default async function Page() {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery(getItemsCategoriesQuery());

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<PageArticle>
				<PageTitle>Items Info</PageTitle>
				<PageContent>
					<GroupsList />
				</PageContent>
			</PageArticle>
		</HydrationBoundary>
	);
}

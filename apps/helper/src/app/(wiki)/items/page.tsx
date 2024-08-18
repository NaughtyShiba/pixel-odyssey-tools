import { PageArticle, PageContent, PageTitle } from "@/components/page";
import { GroupsList } from "@/features/items/components/groups-list";
import { getItemsCategoriesQuery } from "@/models/items/queries";
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

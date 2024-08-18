import { PageArticle, PageContent, PageTitle } from "@/src/components/page";
import { ItemsList } from "@/src/features/items/components/items-list";
import { getItemsByCategoryQuery } from "@/src/models/items/queries";
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";

export default async function Page({ params }: { params: { slug: string } }) {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery(getItemsByCategoryQuery(params.slug));

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<PageArticle>
				<PageTitle>Category</PageTitle>
				<PageContent>
					<ItemsList />
				</PageContent>
			</PageArticle>
		</HydrationBoundary>
	);
}

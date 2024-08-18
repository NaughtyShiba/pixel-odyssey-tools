import { PageArticle, PageContent, PageTitle } from "@/components/page";
import { ItemsList } from "@/features/items/components/items-list";
import { getItemsByCategoryQuery } from "@/models/items/queries";
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

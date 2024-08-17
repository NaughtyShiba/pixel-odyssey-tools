import { PageArticle, PageContent, PageTitle } from "@/src/components/page";
import { getPostBySlug } from "@/src/features/mdx/utils";
import { getAllDestinationsQuery } from "@/src/models/destinations/queries";
import { LocationsList } from "@repo/helper/features/locations/components/locations-list";
import { QueryClient } from "@tanstack/react-query";

export default async function Page() {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery(getAllDestinationsQuery());

	const destinations = queryClient.getQueryData(
		getAllDestinationsQuery().queryKey,
	);

	const post = await getPostBySlug({
		slug: "locations",
		category: "pages",
		components: {
			LocationsList: () => (
				<LocationsList
					locations={destinations as Array<{ id: string; label: string }>}
				/>
			),
		},
	});

	return (
		<PageArticle>
			<PageTitle>{post.meta.title}</PageTitle>
			<PageContent>{post.content.content}</PageContent>
		</PageArticle>
	);
}

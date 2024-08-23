import { PageArticle, PageContent, PageTitle } from "@/components/page";
import { getPostBySlug } from "@/features/mdx/utils";
import { getAllDestinations } from "@/models/destinations/models";
import { LocationsList } from "@repo/helper/features/locations/components/locations-list";

export default async function Page() {
	const destinations = getAllDestinations();

	const post = await getPostBySlug({
		slug: "locations",
		category: "pages",
		components: {
			LocationsList: () => <LocationsList destinations={destinations} />,
		},
	});

	return (
		<PageArticle>
			<PageTitle>{post.meta.title}</PageTitle>
			<PageContent>{post.content.content}</PageContent>
		</PageArticle>
	);
}

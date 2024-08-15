import { getPostBySlug } from "@/src/features/mdx/utils";
import { LocationsList } from "@repo/helper/features/locations/components/locations-list";
import { PageArticle, PageContent, PageTitle } from "@/src/components/page";

export default async function Page() {
	const data = (await import("@repo/helper/data/locations.json")).default;
	const locations = Object.entries(data).map(([value, label]) => ({
		value,
		label: label.label,
	}));

	const post = await getPostBySlug({
		slug: "locations",
		category: "pages",
		components: {
			LocationsList: () => <LocationsList locations={locations} />,
		},
	});

	return (
		<PageArticle>
			<PageTitle>{post.meta.title}</PageTitle>
			<PageContent>{post.content.content}</PageContent>
		</PageArticle>
	);
}

import { PageArticle, PageContent, PageTitle } from "@/src/components/page";
import { getPostBySlug, getSlugsByCategory } from "@/src/features/mdx/utils";

export async function generateStaticParams() {
	return await getSlugsByCategory("guides");
}

export default async function Page({ params }: { params: { slug: string } }) {
	const post = await getPostBySlug({ slug: params.slug, category: "guides" });

	return (
		<PageArticle>
			<PageTitle>{post.meta.title}</PageTitle>
			<PageContent>{post.content.content}</PageContent>
		</PageArticle>
	);
}

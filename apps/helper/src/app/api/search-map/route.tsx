import type { SearchItems } from "@/src/features/command/types";
import { getSlugsByCategory } from "@/src/features/mdx/utils";

export async function GET() {
	try {
		const data = await import("@repo/helper/data/search_map.json");

		const map: SearchItems = [
			...data.default,
			{
				id: "guides",
				label: "Guides",
				items: (await getSlugsByCategory("guides")).map((slug) => ({
					id: slug.slug,
					slug: `/guides/${slug.slug}`,
					label: slug.slug,
				})),
			},
			{
				id: "pages",
				label: "Pages",
				items: (await getSlugsByCategory("pages")).map((slug) => ({
					id: slug.slug,
					slug: `/${slug.slug}`,
					label: slug.slug,
				})),
			},
		];

		return new Response(JSON.stringify(map), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (err) {
		if (
			err instanceof Error &&
			"code" in err &&
			err.code === "MODULE_NOT_FOUND"
		) {
			return new Response(JSON.stringify({ error: "Not Found" }), {
				status: 404,
				headers: {
					"Content-Type": "application/json",
				},
			});
		}
	}
}

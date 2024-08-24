import { db } from "@/db/db";
import { destinations, enemies, items } from "@/db/schemas";
import { sql } from "drizzle-orm";
import { getSlugsByCategory } from "../mdx/utils";

export async function getSearchMap() {
	return [
		{
			id: "items",
			label: "Items",
			items: await db
				.select({
					id: items.id,
					label: items.label,
					slug: sql<string>`'/items/' || ${items.id}`.as("slug"),
				})
				.from(items)
				.execute(),
		},
		{
			id: "enemies",
			label: "Enemies",
			items: await db
				.select({
					id: enemies.id,
					label: enemies.label,
					slug: sql<string>`'/enemies/' || ${enemies.id}`.as("slug"),
				})
				.from(enemies)
				.execute(),
		},
		{
			id: "destinations",
			label: "Destinations",
			items: await db
				.select({
					id: destinations.id,
					label: destinations.label,
					slug: sql<string>`'/destinations/' || ${destinations.id}`.as("slug"),
				})
				.from(destinations)
				.execute(),
		},
		{
			id: "guides",
			label: "Guides",
			items: await getSlugsByCategory("guides").then((slugs) =>
				slugs.map((slug) => ({
					id: slug.slug,
					slug: `/guides/${slug.slug}`,
					label: slug.slug,
				})),
			),
		},
		{
			id: "pages",
			label: "Pages",
			items: await getSlugsByCategory("pages").then((slugs) =>
				slugs.map((slug) => ({
					id: slug.slug,
					slug: `/${slug.slug}`,
					label: slug.slug,
				})),
			),
		},
	];
}

"use server";
import { db } from "@/db/db";
import { destinations, enemies, items } from "@/db/schemas";
import type { SearchItems } from "@/features/command/types";
import { getSlugsByCategory } from "@/features/mdx/utils";
import { sql } from "drizzle-orm";
import { cookies } from "next/headers";

export async function setThemeCookie(mode: "light" | "dark" | "system") {
	await cookies().set("theme", mode);
}

export async function getSearchMap() {
	try {
		const map: SearchItems = [
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
						slug: sql<string>`'/destinations/' || ${destinations.id}`.as(
							"slug",
						),
					})
					.from(destinations)
					.execute(),
			},
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

		return map;
	} catch (err) {
		return [];
	}
}

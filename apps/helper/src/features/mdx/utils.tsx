import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import fs from "node:fs/promises";
import path from "node:path";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@repo/ui/components/table";
import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";
import { getItem } from "@/models/items/models";
import { ItemLink } from "./components/item-link";

type Category = "guides" | "pages";

export async function getSlugsByCategory(category: Category) {
	const postsDirectory = path.join(process.cwd(), `content/${category}`);
	const filenames = await fs.readdir(postsDirectory);

	return filenames.map((filename) => ({
		slug: filename.replace(/\.mdx$/, ""),
	}));
}

interface GetPostBySlugProps {
	slug: string;
	category: Category;
	components?: Readonly<MDXComponents>;
}
export async function getPostBySlug({
	slug,
	category,
	components,
}: GetPostBySlugProps) {
	const postsDirectory = path.join(process.cwd(), `content/${category}`);
	const fullPath = path.join(postsDirectory, `${slug}.mdx`);
	const fileContents = await fs.readFile(fullPath, "utf8");

	const { data, content } = matter(fileContents);

	const mdxSource = await compileMDX({
		source: content,
		options: {
			parseFrontmatter: true,
			mdxOptions: { remarkPlugins: [remarkGfm] },
		},
		components: {
			table: Table,
			thead: TableHeader,
			th: TableHead,
			tbody: TableBody,
			trow: TableRow,
			td: TableCell,
			h1: ({ children }: React.HTMLAttributes<HTMLHeadingElement>) => (
				<h1 className="text-3xl">{children}</h1>
			),
			h2: ({ children }: React.HTMLAttributes<HTMLHeadingElement>) => (
				<h2 className="text-xl">{children}</h2>
			),
			h3: ({ children }: React.HTMLAttributes<HTMLHeadingElement>) => (
				<h3 className="text-lg">{children}</h3>
			),
			ul: ({ children }: React.HTMLAttributes<HTMLUListElement>) => (
				<ul className="list-disc pl-4">{children}</ul>
			),
			li: ({ children }: React.HTMLAttributes<HTMLLIElement>) => (
				<li>{children}</li>
			),
			Item: (props: { itemName: string; amount?: number }) => {
				return <ItemLink {...props} />;
			},
			...components,
		},
	});

	return {
		meta: data,
		content: mdxSource,
	};
}

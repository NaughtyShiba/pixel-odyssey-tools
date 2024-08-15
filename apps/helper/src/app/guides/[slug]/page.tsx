import Link from "next/link";
import { useRouter } from "next/navigation";
import { postComponents } from "@/src/utils/get-posts";

import path from "node:path";
import fs from "node:fs/promises";

import { compileMDX } from 'next-mdx-remote/rsc';
import matter from 'gray-matter';
import remarkGfm from "remark-gfm";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/ui/components/table";
import { ReactNode } from "react";

async function getPostBySlug(slug: string) {
  const postsDirectory = path.join(process.cwd(), 'content');
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = await fs.readFile(fullPath, 'utf8');

  const { data, content } = matter(fileContents);

  const mdxSource = await compileMDX({
    source: content,
    options: {
      parseFrontmatter: true,
      mdxOptions: { remarkPlugins: [remarkGfm]},
    },
    components: {
      "table": Table,
      "thead": TableHeader,
      "th": TableHead,
      "tbody": TableBody,
      "trow": TableRow,
      "td": TableCell,
      "h1": ({children}: React.HTMLAttributes<HTMLHeadingElement>) => <h1 className="text-5xl">{children}</h1>,
      "h2": ({children}: React.HTMLAttributes<HTMLHeadingElement>) => <h2 className="text-4xl">{children}</h2>,
    }
  });

  return {
    meta: data,
    content: mdxSource,
  };
}


export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'content');
  const filenames = await fs.readdir(postsDirectory);

  return filenames.map((filename) => ({
    slug: filename.replace(/\.mdx$/, ''),
  }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  return (
		<article className="w-full">
			<div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-5xl">{post.meta.title}</h1>
			</div>
      {post.content.content}
		</article>
	);
}

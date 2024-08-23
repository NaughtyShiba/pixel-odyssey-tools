"use client";

import { ItemsCategories } from "@/models/items/models";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@repo/ui/components/card";
import Link from "next/link";
import { use } from "react";

interface PlaceholderCardProps {
	title: string;
	href: string;
	image?: string;
}
function PlaceholderCard({ title, href, image }: PlaceholderCardProps) {
	return (
		<Link href={href}>
			<Card>
				<CardHeader className="pb-4">
					<CardTitle>{title}</CardTitle>
				</CardHeader>
				<CardContent className="p-0">
					<div className="h-32 overflow-hidden relative" />
				</CardContent>
			</Card>
		</Link>
	);
}

interface GroupsListProp {
	categories: Promise<ItemsCategories>;
}

export function GroupsList(props: GroupsListProp) {
	console.log({ categories: props.categories });
	const categories = use(props.categories);
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
			{categories?.map(({ category }) => (
				<PlaceholderCard
					key={category}
					title={category}
					href={`/catagories/${category}`}
					image={category}
				/>
			))}
		</div>
	);
}

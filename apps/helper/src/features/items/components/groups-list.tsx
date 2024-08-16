"use client";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@repo/ui/components/card";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getItems } from "../models";
import { getItemsQueryKey } from "../utils";
import { groupBy } from "@/src/libs/fn/group-by";

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
					<div className="h-32 overflow-hidden relative"></div>
				</CardContent>
			</Card>
		</Link>
	);
}

export function GroupsList() {
	const { data: items } = useQuery({
		queryKey: getItemsQueryKey(),
		queryFn: getItems,
	});

	const groupedItems = items
		? groupBy(
				Object.entries(items).map(([key, item]) => ({ ...item, id: key })),
				(item) => item.slot ?? item.type,
			)
		: {};
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
			{Object.keys(groupedItems).map((group) => (
				<PlaceholderCard
					key={group}
					title={group}
					href={`/items/${group}`}
					image={group}
				/>
			))}
		</div>
	);
}

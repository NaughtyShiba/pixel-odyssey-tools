"use client";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@repo/ui/components/card";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getCategories } from "../models";
import { getCategoriesQueryKey } from "../utils";

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

export function GroupsList() {
	const { data: groups } = useQuery({
		queryKey: getCategoriesQueryKey(),
		queryFn: getCategories,
	});

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
			{Object.entries(groups ?? {}).map(([groupId, group]) => (
				<PlaceholderCard
					key={groupId}
					title={group.label}
					href={`/catagories/${groupId}`}
					image={groupId}
				/>
			))}
		</div>
	);
}

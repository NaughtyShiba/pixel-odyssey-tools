"use client";

import { getAllDestinationsQuery } from "@/src/models/destinations/queries";
import { Button } from "@repo/ui/components/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@repo/ui/components/table";
import { useQuery } from "@tanstack/react-query";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

export function DestinationsTable() {
	const { data: destinations } = useQuery(getAllDestinationsQuery());
	if (!destinations) return null;

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Destination</TableHead>
					<TableHead>Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{destinations.map(({ id, label }) => (
					<TableRow key={id}>
						<TableCell className="font-medium">
							<Link href={`/editor/destinations/${id}`}>{label}</Link>
						</TableCell>
						<TableCell>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button aria-haspopup="true" size="icon" variant="ghost">
										<MoreHorizontal className="h-4 w-4" />
										<span className="sr-only">Toggle menu</span>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuLabel>Actions</DropdownMenuLabel>
									<DropdownMenuItem>Edit</DropdownMenuItem>
									<DropdownMenuItem>Delete</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}

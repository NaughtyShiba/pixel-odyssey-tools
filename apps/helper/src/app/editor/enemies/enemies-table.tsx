"use client";

import { getAllEnemiesQuery } from "@/src/models/enemies/queries";
import { Button } from "@repo/ui/components/button";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuItem,
} from "@repo/ui/components/dropdown-menu";
import {
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
	Table,
} from "@repo/ui/components/table";
import { useQuery } from "@tanstack/react-query";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

export function EnemiesTable() {
	const { data: enemies } = useQuery(getAllEnemiesQuery());

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Enemy Name</TableHead>
					<TableHead>Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{enemies?.map(({ id, label }) => (
					<TableRow key={id}>
						<TableCell className="font-medium">
							<Link href={`/editor/enemies/${id}`}>{label}</Link>
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
								</DropdownMenuContent>
							</DropdownMenu>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}

"use client";

import { deleteDestination } from "@/models/destinations/models";
import { getAllDestinationsQuery } from "@/models/destinations/queries";
import { Button } from "@repo/ui/components/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@repo/ui/components/dialog";
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
import { useState } from "react";

interface DeleteConfirmModalProps {
	id: string | null;
	label: string | null;
	open: boolean;
	changeCallback(open: boolean): void;
}
function DeleteConfirmModal({
	id,
	label,
	open,
	changeCallback,
}: DeleteConfirmModalProps) {
	return (
		<Dialog open={Boolean(open && id)} onOpenChange={changeCallback}>
			<DialogContent className="sm:max-w-[425px]">
				<form
					action={async (formData) => {
						const id = formData.get("id");
						if (typeof id !== "string") return;
						await deleteDestination(id);
					}}>
					<input hidden name="id" readOnly defaultValue={String(id)} />
					<DialogHeader>
						<DialogTitle>Delete destination</DialogTitle>
						<DialogDescription>
							Are you sure you want to delete {label} destination?
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button onClick={() => changeCallback(false)} variant="secondary">
							Cancel
						</Button>
						<Button type="submit">Delete</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}

export function DestinationsTable() {
	const { data: destinations } = useQuery(getAllDestinationsQuery());
	const [modalOpen, setModalOpen] = useState(false);
	const [modalData, setModalData] = useState<{
		id: string | null;
		label: string | null;
	}>({ id: null, label: null });
	if (!destinations) return null;

	return (
		<>
			<DeleteConfirmModal
				open={modalOpen}
				id={modalData.id}
				label={modalData.label}
				changeCallback={setModalOpen}
			/>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Destination</TableHead>
						<TableHead className="w-10">Actions</TableHead>
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
										<DropdownMenuItem>
											<Link
												className="block  w-full"
												href={`/editor/destinations/${id}`}>
												Edit
											</Link>
										</DropdownMenuItem>
										<DropdownMenuItem
											onClick={() => {
												setModalData({ id, label });
												setModalOpen(true);
											}}>
											Delete
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	);
}

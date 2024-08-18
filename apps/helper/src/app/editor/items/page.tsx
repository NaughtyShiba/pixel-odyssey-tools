import { getAllItems } from "@/models/items/models";
import { Button } from "@repo/ui/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@repo/ui/components/card";
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
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

export default async function Component() {
	const items = await getAllItems();

	if (!items) return null;

	return (
		<Card>
			<CardHeader className="flex-row justify-between">
				<div className="flex flex-col space-y-1.5">
					<CardTitle>Items</CardTitle>
					<CardDescription>Manage the items</CardDescription>
				</div>
				<div>
					<Link href="/editor/items/new">
						<Button>Add new item</Button>
					</Link>
				</div>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Item Name</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{items.map(({ id, label }) => (
							<TableRow key={id}>
								<TableCell className="font-medium">
									<Link href={`/editor/items/${id}`}>{label}</Link>
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
			</CardContent>
			<CardFooter>
				<div className="text-xs text-muted-foreground">
					Showing <strong>1-1</strong> of <strong>1</strong> users
				</div>
			</CardFooter>
		</Card>
	);
}

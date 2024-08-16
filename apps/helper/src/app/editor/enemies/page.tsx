import { MoreHorizontal } from "lucide-react";
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
import { getEnemies } from "@/src/features/enemies/models";
import Link from "next/link";

export default async function Component() {
	const enemies = await getEnemies();
	return (
		<Card>
			<CardHeader className="flex-row justify-between">
				<div className="flex flex-col space-y-1.5">
					<CardTitle>Enemies</CardTitle>
					<CardDescription>Manage the enemies</CardDescription>
				</div>
				<div>
					<Link href="/editor/enemies/new">
						<Button>Add new enemy</Button>
					</Link>
				</div>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Enemy Name</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{Object.entries(enemies).map(([id, enemy]) => (
							<TableRow key={id}>
								<TableCell className="font-medium">
									<Link href={`/editor/enemies/${id}`}>{enemy.label}</Link>
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
			</CardContent>
			<CardFooter>
				<div className="text-xs text-muted-foreground">
					Showing <strong>1-1</strong> of <strong>1</strong> users
				</div>
			</CardFooter>
		</Card>
	);
}

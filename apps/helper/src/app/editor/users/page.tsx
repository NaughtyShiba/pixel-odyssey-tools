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

interface User {
	id: string;
	username: string;
	role: "admin" | "editor";
}
const USERS: Array<User> = [
	{ id: "naughtyshiba", username: "NaughtyShiba", role: "admin" },
];

export default function Component() {
	return (
		<Card>
			<CardHeader className="flex-row justify-between">
				<div className="flex flex-col space-y-1.5">
					<CardTitle>Users</CardTitle>
					<CardDescription>Manage the users</CardDescription>
				</div>
				<div>
					<Button>
						<span className="flex flex-row gap-1 items-center">
							<span>Add New</span>
						</span>
					</Button>
				</div>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Username</TableHead>
							<TableHead>Role</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{USERS.map((user) => (
							<TableRow key={user.id}>
								<TableCell className="font-medium">{user.username}</TableCell>
								<TableCell>{user.role}</TableCell>
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

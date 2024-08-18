import { getAllEnemiesQuery } from "@/models/enemies/queries";
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
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";
import Link from "next/link";
import { EnemiesTable } from "./enemies-table";

export default async function Component() {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery(getAllEnemiesQuery());
	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
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
					<EnemiesTable />
				</CardContent>
				<CardFooter>
					<div className="text-xs text-muted-foreground">
						Showing <strong>1-1</strong> of <strong>1</strong> users
					</div>
				</CardFooter>
			</Card>
		</HydrationBoundary>
	);
}

import { getAllDestinationsQuery } from "@/src/models/destinations/queries";
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
import { DestinationsTable } from "./destinations-table";

export default async function Component() {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery(getAllDestinationsQuery());

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Card>
				<CardHeader className="flex-row justify-between">
					<div className="flex flex-col space-y-1.5">
						<CardTitle>Destinations</CardTitle>
						<CardDescription>Manage the area</CardDescription>
					</div>
					<div>
						<Link href="/editor/destinations/new">
							<Button>Add new location</Button>
						</Link>
					</div>
				</CardHeader>
				<CardContent>
					<DestinationsTable />
				</CardContent>
				<CardFooter>
					<div className="text-xs text-muted-foreground">
						Showing <strong>1-2</strong> of <strong>12</strong> users
					</div>
				</CardFooter>
			</Card>
		</HydrationBoundary>
	);
}

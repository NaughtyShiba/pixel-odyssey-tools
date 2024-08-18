import { LocationForm, LocationFormCard } from "../form";
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";
import { getAllEnemiesQuery } from "@/models/enemies/queries";
import { getAllItemsQuery } from "@/models/items/queries";
import { getDestinationQuery } from "@/models/destinations/queries";

export default async function ({ params }: { params: { slug: string } }) {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery(getAllEnemiesQuery());
	await queryClient.prefetchQuery(getAllItemsQuery());
	await queryClient.prefetchQuery(getDestinationQuery(params.slug));

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<LocationFormCard>
				<LocationForm />
			</LocationFormCard>
		</HydrationBoundary>
	);
}

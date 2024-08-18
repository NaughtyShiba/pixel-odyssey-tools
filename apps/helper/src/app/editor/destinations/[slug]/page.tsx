import { LocationForm, LocationFormCard } from "../form";
import { getDestination } from "@/models/destinations/models";
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";
import { getAllEnemiesQuery } from "@/models/enemies/queries";
import { getAllItemsQuery } from "@/models/items/queries";

export default async function ({ params }: { params: { slug: string } }) {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery(getAllEnemiesQuery());
	await queryClient.prefetchQuery(getAllItemsQuery());

	const destination = await getDestination(params.slug);
	if (!destination) throw new Error("Destination not found");

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<LocationFormCard title={destination.label} defaultFormData={destination}>
				<LocationForm />
			</LocationFormCard>
		</HydrationBoundary>
	);
}

import { LocationInfo } from "@/features/locations/components/location-info";
import { getDestinationQuery } from "@/models/destinations/queries";
import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from "@tanstack/react-query";

export default async function Page({ params }: { params: { slug: string } }) {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery(getDestinationQuery(params.slug));

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<LocationInfo />
		</HydrationBoundary>
	);
}
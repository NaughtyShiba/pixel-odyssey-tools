import { LocationForm, LocationFormCard } from "../form";
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";
import { getAllEnemiesQuery } from "@/models/enemies/queries";
import { getAllItemsQuery } from "@/models/items/queries";

export default async function () {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery(getAllEnemiesQuery());
	await queryClient.prefetchQuery(getAllItemsQuery());

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<LocationFormCard>
				<LocationForm />
			</LocationFormCard>
		</HydrationBoundary>
	);
}

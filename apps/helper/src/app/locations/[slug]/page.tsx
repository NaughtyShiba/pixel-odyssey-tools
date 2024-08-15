// import { getPostBySlug, getSlugsByCategory } from "@/src/features/mdx/utils";

import { LocationInfo } from "@/src/features/locations/components/location-info";
import { getLocation } from "@/src/features/locations/models";
import { getLocationQueryKey } from "@/src/features/locations/utils";
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";

export default async function Page({ params }: { params: { slug: string } }) {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: getLocationQueryKey(params.slug),
		queryFn: () => getLocation(params.slug),
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<LocationInfo />
		</HydrationBoundary>
	);
}

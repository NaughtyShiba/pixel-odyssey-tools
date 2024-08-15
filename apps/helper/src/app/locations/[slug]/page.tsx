// import { getPostBySlug, getSlugsByCategory } from "@/src/features/mdx/utils";

import { LocationInfo } from "@/src/features/locations/components/location-info";
import {
	getLocationQueryKey,
	getLocationsQueryKey,
} from "@/src/features/locations/utils";
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";

export default async function Page({ params }: { params: { slug: string } }) {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: getLocationsQueryKey(),
		async queryFn() {
			try {
				const res = await import("@repo/helper/data/locations.json");
				return res.default;
			} catch (ex) {
				console.error(ex);
				throw ex;
			}
		},
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<LocationInfo />
		</HydrationBoundary>
	);
}

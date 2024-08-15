// import { getPostBySlug, getSlugsByCategory } from "@/src/features/mdx/utils";

import { LocationInfo } from "@/src/features/locations/components/location-info";
import { getLocationQueryKey } from "@/src/features/locations/utils";
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";

export default async function Page({ params }: { params: { slug: string } }) {
	const queryClient = new QueryClient();

	console.log(params.slug);
	await queryClient.prefetchQuery({
		queryKey: getLocationQueryKey(params.slug),
		async queryFn() {
			try {
				const res = await import(
					`@repo/helper/data/locations/${params.slug}.json`
				);
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

// import { getPostBySlug, getSlugsByCategory } from "@/src/features/mdx/utils";

import { LocationInfo } from "@/src/features/locations/components/location-info";
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";

// export async function generateStaticParams() {
// 	return await getSlugsByCategory("guides");
// }

export default async function Page({ params }: { params: { slug: string } }) {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: ["locations", params.slug],
		async queryFn() {
			const res = await fetch(`/api/location/${params.slug}`);
			return (await res.json()) as Location;
		},
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<LocationInfo />
		</HydrationBoundary>
	);
}

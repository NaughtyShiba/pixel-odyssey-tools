import { ItemInfo } from "@/src/features/items/components/item-info";
import { getItemQueryKey } from "@/src/features/items/utils";
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";

export default async function Page({ params }: { params: { slug: string } }) {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: getItemQueryKey(params.slug),
		async queryFn() {
			try {
				const res = await import(`@repo/helper/data/items/${params.slug}.json`);
				return res.default;
			} catch (ex) {
				console.error(ex);
				throw ex;
			}
		},
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<ItemInfo />
		</HydrationBoundary>
	);
}

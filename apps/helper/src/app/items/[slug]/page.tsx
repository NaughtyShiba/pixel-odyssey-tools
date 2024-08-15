import { ItemInfo } from "@/src/features/items/components/item-info";
import { getItem } from "@/src/features/items/models";
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
		queryFn: () => getItem(params.slug),
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<ItemInfo />
		</HydrationBoundary>
	);
}

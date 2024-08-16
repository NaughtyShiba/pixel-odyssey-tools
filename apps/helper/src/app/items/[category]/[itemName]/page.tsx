import { ItemInfo } from "@/src/features/items/components/item-info";
import { getItem } from "@/src/features/items/models";
import { getItemQueryKey } from "@/src/features/items/utils";
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";

export default async function Page({ params }: { params: { item: string } }) {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: getItemQueryKey(params.item),
		queryFn: () => getItem(params.item),
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<ItemInfo />
		</HydrationBoundary>
	);
}

import { ItemInfo } from "@/features/items/components/item-info";
import { getItemQuery } from "@/models/items/queries";
import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from "@tanstack/react-query";

export default async function Page({ params }: { params: { slug: string } }) {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery(getItemQuery(params.slug));

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<ItemInfo />
		</HydrationBoundary>
	);
}

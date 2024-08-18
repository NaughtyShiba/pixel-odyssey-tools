import { EnemyInfo } from "@/features/enemies/components/enemy-info";
import { getEnemyQuery } from "@/models/enemies/queries";
import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from "@tanstack/react-query";

export default async function Page({ params }: { params: { slug: string } }) {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery(getEnemyQuery(params.slug));

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<EnemyInfo />
		</HydrationBoundary>
	);
}

import { EnemyInfo } from "@/src/features/enemies/components/enemy-info";
import { getEnemy } from "@/src/features/enemies/models";
import { getEnemyQueryKey } from "@/src/features/enemies/utils";
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";

export default async function Page({ params }: { params: { slug: string } }) {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: getEnemyQueryKey(params.slug),
		queryFn: () => getEnemy(params.slug),
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<EnemyInfo />
		</HydrationBoundary>
	);
}

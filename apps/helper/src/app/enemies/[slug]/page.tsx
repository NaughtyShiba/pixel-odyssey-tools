import { EnemyInfo } from "@/src/features/enemies/components/enemy-info";
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
		async queryFn() {
			try {
				const res = await import(
					`@repo/helper/data/enemies/${params.slug}.json`
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
			<EnemyInfo />
		</HydrationBoundary>
	);
}

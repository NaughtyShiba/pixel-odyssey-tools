import { getEnemyQuery } from "@/models/enemies/queries";
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";
import { EnemyEntryForm } from "../form";

export default async function ({ params }: { params: { slug: string } }) {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery(getEnemyQuery(params.slug));

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<EnemyEntryForm />
		</HydrationBoundary>
	);
}

import { PageArticle, PageContent, PageTitle } from "@/src/components/page";
import { getEnemiesQueryKey } from "@/src/features/enemies/utils";
import { EnemyInfo } from "@repo/helper/features/enemies/components/enemy-info";
import { QueryClient } from "@tanstack/react-query";
import Link from "next/link";

export default async function Page() {
	const queryClient = new QueryClient();
	const enemies = await queryClient.prefetchQuery({
		queryKey: getEnemiesQueryKey(),
		async queryFn() {
			const res = (await import("@repo/helper/data/enemies.json")).default;
			return Object.entries(res).map(([value, label]) => ({
				value,
				label,
			})) as Array<{ value: string; label: string }>;
		},
	});

	return (
		<PageArticle>
			<PageTitle>Enemies</PageTitle>
			<PageContent>
				<ul>
					{enemies.map((enemy) => (
						<li key={enemy.value}>
							<Link href={`/enemies/${enemy.value}`}>{enemy.label}</Link>
						</li>
					))}
				</ul>
			</PageContent>
		</PageArticle>
	);
}

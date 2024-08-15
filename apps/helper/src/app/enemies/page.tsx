import { PageArticle, PageContent, PageTitle } from "@/src/components/page";
import { EnemyInfo } from "@repo/helper/features/enemies/components/enemy-info";
import Link from "next/link";

export default async function Page() {
	const data = (await import("@repo/helper/data/enemies.json")).default;
	const enemies = Object.entries(data).map(([value, label]) => ({
		value,
		label,
	}));

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

import { PageArticle, PageContent, PageTitle } from "@/components/page";
import { EnemiesList } from "@/features/enemies/components/enemies-list";
import { getAllEnemies } from "@/models/enemies/models";

export default function Page() {
	const enemies = getAllEnemies();

	return (
		<PageArticle>
			<PageTitle>Enemies</PageTitle>
			<PageContent>
				<EnemiesList enemies={enemies} />
			</PageContent>
		</PageArticle>
	);
}

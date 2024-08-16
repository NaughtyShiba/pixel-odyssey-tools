import { PageArticle, PageContent, PageTitle } from "@/src/components/page";
import { EnemiesList } from "@/src/features/enemies/components/enemies-list";

export default function Page() {
	return (
		<PageArticle>
			<PageTitle>Enemies</PageTitle>
			<PageContent>
				<EnemiesList />
			</PageContent>
		</PageArticle>
	);
}

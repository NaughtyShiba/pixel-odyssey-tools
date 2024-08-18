import { PageArticle, PageContent, PageTitle } from "@/components/page";
import { EnemiesList } from "@/features/enemies/components/enemies-list";

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

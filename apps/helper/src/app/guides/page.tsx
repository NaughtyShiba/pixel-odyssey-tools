import { PageArticle, PageContent, PageTitle } from "@/src/components/page";
import Link from "next/link";

export default function Page() {
	return (
		<PageArticle>
			<PageTitle>Guides</PageTitle>
			<PageContent>
				<ul>
					<li>
						<Link href="/guides/refine" className="text-primary">
							Refine
						</Link>
					</li>
				</ul>
			</PageContent>
		</PageArticle>
	);
}

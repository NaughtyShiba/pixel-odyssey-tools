import {
	PageArticle,
	PageContent,
	PageTitle,
} from "@repo/helper/components/page";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@repo/ui/components/card";
import Link from "next/link";

interface PlaceholderCardProps {
	title: string;
	href: string;
	image?: string;
}
function PlaceholderCard({ title, href, image }: PlaceholderCardProps) {
	return (
		<Link href={href}>
			<Card>
				<CardContent className="p-0">
					<div className="h-32 bg-foreground opacity-5" />
				</CardContent>
				<CardHeader className="pt-4">
					<CardTitle>{title}</CardTitle>
				</CardHeader>
			</Card>
		</Link>
	);
}

export default function () {
	return (
		<PageArticle>
			<PageTitle>Pixel Odyssey Helper & Guide</PageTitle>
			<PageContent>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
					<PlaceholderCard title="Items" href="/items" />
					<PlaceholderCard title="Locations" href="/locations" />
					<PlaceholderCard title="Enemies" href="/enemies" />
					<PlaceholderCard title="Guides" href="/guides" />
				</div>
			</PageContent>
		</PageArticle>
	);
}

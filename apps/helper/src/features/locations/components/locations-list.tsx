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

interface LocationsListProps {
	locations: Array<{ value: string; label: string }>;
}

export function LocationsList({ locations }: LocationsListProps) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
			{locations.map((location) => (
				<PlaceholderCard
					key={location.value}
					title={location.label}
					href={`/locations/${location.value}`}
				/>
			))}
		</div>
	);
}

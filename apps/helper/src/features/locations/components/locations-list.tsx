import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@repo/ui/components/card";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";

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
					<div className="h-64 overflow-hidden relative">
						<Image
							alt={title}
							src={`/assets/destinations/${image}.png`}
							width="234"
							height="234"
							className="absolute top-0"
						/>
					</div>
				</CardContent>
				<CardHeader className="pt-4">
					<CardTitle>{title}</CardTitle>
				</CardHeader>
			</Card>
		</Link>
	);
}

interface LocationsListProps {
	destinations: Promise<Array<{ id: string; label: string }>>;
}

export function LocationsList(props: LocationsListProps) {
	const destinations = use(props.destinations);

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
			{destinations.map((destination) => (
				<PlaceholderCard
					key={destination.id}
					title={destination.label}
					href={`/destinations/${destination.id}`}
					image={destination.id}
				/>
			))}
		</div>
	);
}

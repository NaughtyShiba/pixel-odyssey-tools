import { LocationInfo } from "@/features/locations/components/location-info";
import { getDestination } from "@/models/destinations/models";
import { getAllEnemies } from "@/models/enemies/models";
import { getAllItems } from "@/models/items/models";

export default function Page({ params }: { params: { slug: string } }) {
	const destination = getDestination(params.slug);
	const items = getAllItems();
	const enemies = getAllEnemies();
	return (
		<LocationInfo destination={destination} items={items} enemies={enemies} />
	);
}

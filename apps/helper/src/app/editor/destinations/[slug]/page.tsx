import { getAllEnemies } from "@/src/models/enemies/models";
import { LocationForm, LocationFormCard } from "../form";
import { getDestination } from "@/src/models/destinations/models";

export default async function ({ params }: { params: { slug: string } }) {
	const enemies = await getAllEnemies();

	const destination = await getDestination(params.slug);
	if (!destination) throw new Error("Destination not found");

	return (
		<LocationFormCard title={destination.label} defaultFormData={destination}>
			<LocationForm enemies={enemies} />
		</LocationFormCard>
	);
}

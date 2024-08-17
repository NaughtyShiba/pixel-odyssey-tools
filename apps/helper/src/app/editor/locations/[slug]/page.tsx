import { getEnemies } from "@/src/features/enemies/models";
import { getLocation } from "@/src/features/locations/models";
import { LocationForm, LocationFormCard } from "../form";

export default async function ({ params }: { params: { slug: string } }) {
	const location = await getLocation(params.slug);
	const enemies = await getEnemies();

	return (
		<LocationFormCard title={location.label} defaultFormData={location}>
			<LocationForm enemies={enemies} />
		</LocationFormCard>
	);
}

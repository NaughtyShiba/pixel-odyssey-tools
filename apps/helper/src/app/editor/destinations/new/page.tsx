import { getEnemies } from "@/src/features/enemies/models";
import { LocationForm, LocationFormCard } from "../form";

export default async function () {
	const enemies = await getEnemies();
	return (
		<LocationFormCard title="New location">
			<LocationForm enemies={enemies} />
		</LocationFormCard>
	);
}

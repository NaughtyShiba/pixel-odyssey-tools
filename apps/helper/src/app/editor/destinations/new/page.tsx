import { getAllEnemies } from "@/src/models/enemies/models";
import { LocationForm, LocationFormCard } from "../form";

export default async function () {
	const enemies = await getAllEnemies();
	return (
		<LocationFormCard title="New location">
			<LocationForm enemies={enemies} />
		</LocationFormCard>
	);
}

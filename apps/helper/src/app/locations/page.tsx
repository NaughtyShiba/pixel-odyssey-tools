import { LocationInfo } from "@repo/helper/features/locations/components/location-info";
export default async function Page() {
	const data = (await import("@repo/helper/data/locations.json")).default;
	const locations = Object.entries(data).map(([value, label]) => ({
		value,
		label,
	}));

	return (
		<article className="w-full">
			<div className="mx-auto grid w-full max-w-6xl gap-2">
				<h1 className="text-3xl font-semibold">Locations Info</h1>
			</div>
			<LocationInfo locations={locations} />
		</article>
	);
}

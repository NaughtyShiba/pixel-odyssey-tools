import { LocationInfo } from "@/features/locations/components/location-info";
import { getDestination } from "@/models/destinations/models";

export default function Page({ params }: { params: { slug: string } }) {
	const destination = getDestination(params.slug);
	return <LocationInfo destination={destination} />;
}

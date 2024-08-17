import { getAllDestinations, getDestination } from "./models";

export function getAllDestinationsQuery() {
	return {
		queryKey: ["destinations"],
		async queryFn() {
			return await getAllDestinations();
		},
	};
}

export function getDestinationQuery(slug: string) {
	return {
		queryKey: ["destinations", slug],
		async queryFn() {
			return await getDestination(slug);
		},
	};
}

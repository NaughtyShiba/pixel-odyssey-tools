import { getDestination } from "./models";

export function getDestinationQuery(slug: string) {
	return {
		queryKey: ["locations", slug],
		async queryFn() {
			return await getDestination(slug);
		},
	};
}

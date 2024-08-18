"use server";

import { updateDestination } from "@/models/destinations/models";

export async function submitLocation(data: {
	id: string | null;
	label: string;
	description: string | null;
	enemies: string[];
	// npcs: string[];
	items: string[];
}) {
	await updateDestination(data);
}

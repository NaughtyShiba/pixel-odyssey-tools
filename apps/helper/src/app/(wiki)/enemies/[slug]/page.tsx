import { EnemyInfo } from "@/features/enemies/components/enemy-info";
import { getAllDestinations } from "@/models/destinations/models";
import { getEnemy } from "@/models/enemies/models";
import { getAllItems } from "@/models/items/models";

export default function Page({ params }: { params: { slug: string } }) {
	const enemy = getEnemy(params.slug);
	const items = getAllItems();
	const destinations = getAllDestinations();

	return <EnemyInfo enemy={enemy} items={items} destinations={destinations} />;
}

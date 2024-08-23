import { EnemyInfo } from "@/features/enemies/components/enemy-info";
import { getEnemy } from "@/models/enemies/models";

export default function Page({ params }: { params: { slug: string } }) {
	const enemy = getEnemy(params.slug);

	return <EnemyInfo enemy={enemy} />;
}

import { EnemyInfo } from "@repo/helper/features/enemies/components/enemy-info";

export default async function Page() {
	const data = (await import("@repo/helper/data/enemies.json")).default;
	const enemies = Object.entries(data).map(([value, label]) => ({
		value,
		label,
	}));

	return (
		<article className="w-full">
			<div className="mx-auto grid w-full max-w-6xl gap-2">
				<h1 className="text-3xl font-semibold">Enemies Info</h1>
			</div>
			<EnemyInfo enemies={enemies} />
		</article>
	);
}

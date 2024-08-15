import Link from "next/link";

export default async function Page() {
	return (
		<article className="w-full">
			<div className="mx-auto grid w-full max-w-6xl gap-2">
				<h1 className="text-3xl font-semibold">Guides</h1>
			</div>
			<ul>
			 <li><Link href="/guides/refine" className="text-primary">Refine</Link></li>
			</ul>
		</article>
	);
}

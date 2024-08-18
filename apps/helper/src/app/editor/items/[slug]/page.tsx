import { getItemEntry } from "@/src/models/items/models";
import { Button } from "@repo/ui/components/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@repo/ui/components/card";
import { Input } from "@repo/ui/components/input";
import Link from "next/link";

export default async function ({ params }: { params: { slug: string } }) {
	const item = await getItemEntry(params.slug);

	if (!item) return;

	return (
		<Card>
			<CardHeader className="flex-row justify-between">
				<div className="flex flex-col space-y-1.5">
					<CardTitle>{item.label}</CardTitle>
				</div>
				<div className="flex flex-row gap-4">
					<Link href="/editor/items">
						<Button variant="secondary">Cancel</Button>
					</Link>
					<Button>Save</Button>
				</div>
			</CardHeader>
			<CardContent>
				<div className="grid gap-4">
					<div className="space-y-2">
						<label>Label</label>
						<Input defaultValue={item.label} />
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

import { Button } from "@repo/ui/components/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@repo/ui/components/card";
import { Input } from "@repo/ui/components/input";
import Link from "next/link";

export default function () {
	return (
		<Card>
			<CardHeader className="flex-row justify-between">
				<div className="flex flex-col space-y-1.5">
					<CardTitle>New enemy</CardTitle>
				</div>
				<div className="flex flex-row gap-4">
					<Link href="/editor/enemies">
						<Button variant="secondary">Cancel</Button>
					</Link>
					<Button>Save</Button>
				</div>
			</CardHeader>
			<CardContent>
				<div className="grid gap-4">
					<div className="space-y-2">
						<label>Name</label>
						<Input />
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

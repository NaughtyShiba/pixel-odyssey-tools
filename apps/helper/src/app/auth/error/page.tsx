import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@repo/ui/components/card";

export default function SignIn() {
	return (
		<Card className="w-full max-w-sm">
			<CardHeader>
				<CardTitle className="text-2xl">Unexpected error happened</CardTitle>
				<CardDescription>If it was intended action - try again</CardDescription>
			</CardHeader>
		</Card>
	);
}

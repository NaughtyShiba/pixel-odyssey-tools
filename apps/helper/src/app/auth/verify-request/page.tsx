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
				<CardTitle className="text-2xl">Check your email</CardTitle>
				<CardDescription>
					A sign in link has been sent to your email address.
				</CardDescription>
			</CardHeader>
		</Card>
	);
}

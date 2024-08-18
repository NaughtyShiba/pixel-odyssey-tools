import { signOut } from "@/auth";
import { Button } from "@repo/ui/components/button";

import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@repo/ui/components/card";

export default function SignIn() {
	return (
		<form
			action={async () => {
				"use server";
				await signOut({ redirectTo: "/" });
			}}>
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle className="text-2xl">Logout</CardTitle>
					<CardDescription>Are you sure you want to logout?</CardDescription>
				</CardHeader>
				<CardFooter>
					<div className="grid w-full gap-y-4">
						<Button type="submit">Logout</Button>
					</div>
				</CardFooter>
			</Card>
		</form>
	);
}

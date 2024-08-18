import { auth, signIn } from "@/auth";
import { Button } from "@repo/ui/components/button";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@repo/ui/components/card";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { redirect } from "next/navigation";

export default async function SignIn() {
	const session = await auth();
	if (session) redirect("/");

	return (
		<form
			action={async (formData) => {
				"use server";
				try {
					await signIn(
						process.env.NODE_ENV === "production" ? "resend" : "nodemailer",
						formData,
					);
				} catch (ex) {
					if (
						ex instanceof Error &&
						"type" in ex &&
						ex.type === "AccessDenied"
					) {
						redirect("/auth/error");
					}

					throw ex;
				}
			}}>
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle className="text-2xl">Login</CardTitle>
					<CardDescription>
						Enter your email below to login to your account.
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4">
					<div className="space-y-2">
						<Label htmlFor="email">Email address</Label>
						<Input type="email" name="email" />
						<div className="text-sm font-medium text-destructive" />
					</div>
				</CardContent>
				<CardFooter>
					<div className="grid w-full gap-y-4">
						<Button>Continue</Button>
					</div>
				</CardFooter>
			</Card>
		</form>
	);
}

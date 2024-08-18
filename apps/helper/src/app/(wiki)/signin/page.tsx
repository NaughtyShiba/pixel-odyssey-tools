import { signIn } from "@/auth";
import { Button } from "@repo/ui/components/button";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@repo/ui/components/card";
import { FormItem, FormLabel, FormMessage } from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";

export function SignIn() {
	return (
		<form
			action={async (formData) => {
				"use server";
				await signIn("credentials", formData);
			}}>
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle className="text-2xl">Login</CardTitle>
					<CardDescription>
						Enter your email below to login to your account.
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4">
					<FormItem id="email">
						<FormLabel>
							<label htmlFor="email">Email address</label>
						</FormLabel>
						<Input type="email" name="email" />
						<FormMessage className="block text-sm text-destructive" />
					</FormItem>
					<FormItem id="password">
						<FormLabel>
							<label htmlFor="password">Email address or Username</label>
						</FormLabel>
						<Input type="password" name="password" />
						<FormMessage className="block text-sm text-destructive" />
					</FormItem>
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

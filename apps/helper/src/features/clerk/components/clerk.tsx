"use client";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
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
import { Spline } from "lucide-react";

function EmailOrUsernameCard({
	isGlobalLoading,
}: { isGlobalLoading: boolean }) {
	return (
		<Card className="w-full max-w-sm">
			<CardHeader>
				<CardTitle className="text-2xl">Login</CardTitle>
				<CardDescription>
					Enter your email below to login to your account.
				</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-4">
				<Clerk.Field name="identifier" className="space-y-2">
					<Clerk.Label asChild>
						<label htmlFor="email">Email address or Username</label>
					</Clerk.Label>
					<Clerk.Input type="email" required asChild>
						<Input />
					</Clerk.Input>
					<Clerk.FieldError className="block text-sm text-destructive" />
				</Clerk.Field>
			</CardContent>
			<CardFooter>
				<div className="grid w-full gap-y-4">
					<SignIn.Action submit asChild>
						<Button disabled={isGlobalLoading}>
							<Clerk.Loading>
								{(isLoading) => {
									return isLoading ? (
										<Spline className="size-4 animate-spin" />
									) : (
										"Continue"
									);
								}}
							</Clerk.Loading>
						</Button>
					</SignIn.Action>
				</div>
			</CardFooter>
		</Card>
	);
}

function PasswordCard({ isGlobalLoading }: { isGlobalLoading: boolean }) {
	return (
		<Card className="w-full max-w-sm">
			<CardHeader>
				<CardTitle className="text-2xl">Login</CardTitle>
				<CardDescription>Enter your password</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-4">
				<Clerk.Field name="password" className="space-y-2">
					<Clerk.Label asChild>
						<label htmlFor="email">Password</label>
					</Clerk.Label>
					<Clerk.Input type="password" required asChild>
						<Input />
					</Clerk.Input>
					<Clerk.FieldError className="block text-sm text-destructive" />
				</Clerk.Field>
			</CardContent>
			<CardFooter>
				<div className="grid w-full gap-y-4">
					<SignIn.Action submit asChild>
						<Button disabled={isGlobalLoading}>
							<Clerk.Loading>
								{(isLoading) => {
									return isLoading ? (
										<Spline className="size-4 animate-spin" />
									) : (
										"Continue"
									);
								}}
							</Clerk.Loading>
						</Button>
					</SignIn.Action>
				</div>
			</CardFooter>
		</Card>
	);
}

export function ClerkCard() {
	return (
		<SignIn.Root>
			<Clerk.Loading>
				{(isGlobalLoading) => (
					<>
						<SignIn.Step
							name="start"
							className="flex justify-center flex-1 md:items-center">
							<EmailOrUsernameCard isGlobalLoading={isGlobalLoading} />
						</SignIn.Step>
						<SignIn.Step
							name="verifications"
							className="flex justify-center flex-1 md:items-center">
							<PasswordCard isGlobalLoading={isGlobalLoading} />
						</SignIn.Step>
					</>
				)}
			</Clerk.Loading>
		</SignIn.Root>
	);
}

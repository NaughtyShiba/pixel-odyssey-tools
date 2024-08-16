"use client";

import { Button } from "@repo/ui/components/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
} from "@repo/ui/components/sheet";
import { CircleUser, Menu } from "lucide-react";
import { Link } from "./link";
// import { NextBreadcrumb } from "./breadcrumbs";
import { CommandMenu } from "../features/command/components/cmdk";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	// DropdownMenuLabel,
	// DropdownMenuSeparator,
	DropdownMenuItem,
} from "@repo/ui/components/dropdown-menu";
import { SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs";

export function Header() {
	return (
		<header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-30">
			<nav className="hidden gap-6 text-lg font-medium md:flex md:w-full md:flex-row md:justify-between md:gap-5 md:text-sm lg:gap-6">
				<div />
			</nav>
			<Sheet>
				<SheetTrigger asChild>
					<Button variant="outline" size="icon" className="shrink-0 md:hidden">
						<Menu className="h-5 w-5" />
						<span className="sr-only">Toggle navigation menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side="left">
					<nav className="grid gap-6 text-lg font-medium">
						<SheetClose asChild>
							<Link href="/">Helper</Link>
						</SheetClose>
					</nav>
				</SheetContent>
			</Sheet>
			<CommandMenu />
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="secondary" size="icon" className="rounded-full">
						<CircleUser className="h-5 w-5" />
						<span className="sr-only">Toggle user menu</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					{/*<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem>Settings</DropdownMenuItem>
					<DropdownMenuItem>Support</DropdownMenuItem>
					<DropdownMenuSeparator />*/}
					<SignedOut>
						<DropdownMenuItem>
							<Link href="/login">Sign in</Link>
						</DropdownMenuItem>
					</SignedOut>
					<SignedIn>
						<DropdownMenuItem>
							<SignOutButton redirectUrl="/">
								<span>Logout</span>
							</SignOutButton>
						</DropdownMenuItem>
					</SignedIn>
				</DropdownMenuContent>
			</DropdownMenu>
		</header>
	);
}

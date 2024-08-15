"use client";

import { Button } from "@repo/ui/components/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
} from "@repo/ui/components/sheet";
import { Menu } from "lucide-react";
import { Link } from "./link";
import { NextBreadcrumb } from "./breadcrumbs";

export function Header() {
	return (
		<header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-30">
			<nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
				<NextBreadcrumb />
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
		</header>
	);
}

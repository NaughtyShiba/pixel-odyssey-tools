"use client";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@repo/ui/components/sheet";
import Link from "next/link";
import { Button } from "@repo/ui/components/button";
import { cn } from "@repo/ui/lib/utils";
import { usePathname } from "next/navigation";

export function Header() {
	const pathname = usePathname();

	return (
		<header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-30">
			<nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
				<Link
					href="/items"
					className={cn(
						"transition-colors hover:text-foreground",
						pathname === "/items" ? "text-foreground" : "text-muted",
					)}>
					Items
				</Link>
				<Link
					href="/locations"
					className={cn(
						"transition-colors hover:text-foreground",
						pathname === "/locations" ? "text-foreground" : "text-muted",
					)}>
					Locations
				</Link>
				<Link
					href="/enemies"
					className={cn(
						"transition-colors hover:text-foreground",
						pathname === "/enemies" ? "text-foreground" : "text-muted",
					)}>
					Enemies
				</Link>
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
						<Link
							href="/items"
							className={cn(
								"hover:text-foreground",
								pathname === "/items" ? "" : "text-muted",
							)}>
							Items
						</Link>
						<Link
							href="/locations"
							className={cn(
								"hover:text-foreground",
								pathname === "/locations" ? "" : "text-muted",
							)}>
							Locations
						</Link>
						<Link
							href="/enemies"
							className={cn(
								"hover:text-foreground",
								pathname === "/enemies" ? "" : "text-muted",
							)}>
							Enemies
						</Link>
					</nav>
				</SheetContent>
			</Sheet>
		</header>
	);
}

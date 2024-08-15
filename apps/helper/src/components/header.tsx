"use client";

import { Button } from "@repo/ui/components/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@repo/ui/components/sheet";
import { cn } from "@repo/ui/lib/utils";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { Link } from "./link";

export function Header() {
	const pathname = usePathname();

	return (
		<header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-30">
			<nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
			<Link
				href="/guides">
				Guides
			</Link>
			<Link
					href="/items">
					Items
				</Link>
				<Link
					href="/locations">
					Locations
				</Link>
				<Link
					href="/enemies">
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
					  <SheetClose asChild>
							<Link
								href="/guides">
								Guides
							</Link>
						<Link
							href="/items">
							Items
						</Link>
						</SheetClose>
						<SheetClose asChild>
						<Link
							href="/locations">
							Locations
						</Link>
						</SheetClose>
						<SheetClose asChild>
						<Link
							href="/enemies">
							Enemies
						</Link>
						</SheetClose>
					</nav>
				</SheetContent>
			</Sheet>
		</header>
	);
}

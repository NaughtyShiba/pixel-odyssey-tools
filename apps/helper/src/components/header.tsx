import { Button } from "@repo/ui/components/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
} from "@repo/ui/components/sheet";
import { Menu } from "lucide-react";
import { CommandMenu } from "../features/command/components/cmdk";
import { Link } from "./link";
import { UserDropdownMenu } from "./user-menu";
import { getSearchMap } from "@/features/command/get";

export async function Header() {
	const searchMap = await getSearchMap();

	return (
		<header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-30">
			<nav className="hidden gap-6 text-lg font-medium md:flex md:w-full md:flex-row md:justify-between md:gap-5 md:text-sm lg:gap-6">
				<Link href="/">Helper</Link>
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
			{searchMap && <CommandMenu searchMap={searchMap} />}
			<UserDropdownMenu />
		</header>
	);
}

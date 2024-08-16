"use client";

import {
	// Cloud,
	// CreditCard,
	// Github,
	// Keyboard,
	// LifeBuoy,
	// LogOut,
	// Mail,
	// MessageSquare,
	// Plus,
	// PlusCircle,
	// Settings,
	// User,
	// UserPlus,
	// Users,
	User,
} from "lucide-react";
import { Moon, Sun, Settings } from "lucide-react";

import { Button } from "@repo/ui/components/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	// DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	// DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import { Switch } from "@repo/ui/components/switch";
import { Label } from "@repo/ui/components/label";
import { SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { useTheme } from "../features/theme/context";

export function UserDropdownMenu() {
	const { setTheme } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div>
					<Button variant="outline">
						<User className="h-5 w-5" />
						<span className="sr-only">Toggle theme</span>
					</Button>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuLabel>Settings</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuSub>
					<DropdownMenuSubTrigger>
						<span>Display mode</span>
					</DropdownMenuSubTrigger>
					<DropdownMenuPortal>
						<DropdownMenuSubContent>
							<DropdownMenuItem onClick={() => setTheme?.("light")}>
								<Sun className="mr-2 h-4 w-4" />
								<span>Light mode</span>
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setTheme?.("dark")}>
								<Moon className="mr-2 h-4 w-4" />
								<span>Dark mode</span>
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setTheme?.("system")}>
								<Settings className="mr-2 h-4 w-4" />
								<span>System</span>
							</DropdownMenuItem>
						</DropdownMenuSubContent>
					</DropdownMenuPortal>
				</DropdownMenuSub>
				<DropdownMenuSeparator />
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
	);
}

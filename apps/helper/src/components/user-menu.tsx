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
import { Moon, Settings, Sun } from "lucide-react";

// import { SignOutButton, useUser } from "@clerk/nextjs";
import { Button } from "@repo/ui/components/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	// DropdownMenuGroup,
	DropdownMenuItem,
	// DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	// DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
// import Link from "next/link";
import { useTheme } from "../features/theme/context";

export function UserDropdownMenu() {
	const { setTheme } = useTheme();
	// const user = useUser();
	// const username = user.user?.username;

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
				{/*{username ? (
					<>
						<DropdownMenuLabel>Hello, {username}!</DropdownMenuLabel>
						<DropdownMenuSeparator />
					</>
				) : null}
				{user.isSignedIn ? (
					<DropdownMenuItem className="cursor-pointer">Editor</DropdownMenuItem>
					) : null}*/}
				<DropdownMenuSeparator />
				<DropdownMenuSub>
					<DropdownMenuSubTrigger>
						<span>Display mode</span>
					</DropdownMenuSubTrigger>
					<DropdownMenuPortal>
						<DropdownMenuSubContent>
							<DropdownMenuItem
								onClick={() => setTheme?.("light")}
								className="cursor-pointer">
								<Sun className="mr-2 h-4 w-4" />
								<span>Light mode</span>
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => setTheme?.("dark")}
								className="cursor-pointer">
								<Moon className="mr-2 h-4 w-4" />
								<span>Dark mode</span>
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => setTheme?.("system")}
								className="cursor-pointer">
								<Settings className="mr-2 h-4 w-4" />
								<span>System</span>
							</DropdownMenuItem>
						</DropdownMenuSubContent>
					</DropdownMenuPortal>
				</DropdownMenuSub>
				<DropdownMenuSeparator />
				{/*{user.isSignedIn ? (
					<DropdownMenuItem className="cursor-pointer">
						<SignOutButton redirectUrl="/">
							<span className="block w-full">Logout</span>
						</SignOutButton>
					</DropdownMenuItem>
				) : (
					<DropdownMenuItem className="cursor-pointer">
						<Link href="/login" className="block w-full">
							Sign in
						</Link>
					</DropdownMenuItem>
				)}*/}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

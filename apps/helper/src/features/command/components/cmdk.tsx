"use client";

import { Content as DialogContent } from "@radix-ui/react-dialog";
import {
	Dialog,
	DialogOverlay,
	DialogTrigger,
} from "@repo/ui/components/dialog";

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@repo/ui/components/command";
import { inputVariants } from "@repo/ui/components/input";
import { cn } from "@repo/ui/lib/utils";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { Fragment, use, useEffect, useState } from "react";
import type { SearchItems } from "../types";

interface CommandMenuProps {
	searchMap: SearchItems;
}
export const CommandMenu = ({ searchMap }: CommandMenuProps) => {
	const router = useRouter();
	const [open, setOpen] = useState(false);
	console.log({ searchMap });

	// Toggle the menu when ⌘K is pressed
	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
			if (e.key === "esc") {
				e.preventDefault();
				setOpen(false);
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	return (
		<Dialog open={open} onOpenChange={(open) => setOpen(open)}>
			<DialogTrigger className="w-64">
				<div className={cn(inputVariants(), "flex flex-row justify-between")}>
					<span className="flex flex-row gap-2 items-center">
						<Search className="h-4 w-4" />
						<span>Search</span>
					</span>{" "}
					<span>⌘K</span>
				</div>
			</DialogTrigger>
			<DialogOverlay />
			<DialogContent className="fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
				<Command className="rounded-lg border shadow-lg">
					<CommandInput placeholder="Search for something" />
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						{searchMap?.map((group, i) => {
							return (
								<Fragment key={group.id}>
									<CommandGroup heading={group.label}>
										{group.items.map((item) => {
											return (
												<CommandItem
													key={item.id}
													onSelect={() => {
														setOpen(false);
														router.push(item.slug);
													}}>
													<span>{item.label}</span>
												</CommandItem>
											);
										})}
									</CommandGroup>
									<CommandSeparator />
								</Fragment>
							);
						})}
					</CommandList>
				</Command>
			</DialogContent>
		</Dialog>
	);
};

"use client";

import { CommandShortcut } from "@repo/ui/components/command";
import { Dialog, DialogContent } from "@repo/ui/components/dialog";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@repo/ui/components/command";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { SearchItems } from "../types";
import Link from "next/link";

export const CommandMenu = () => {
	const { data } = useQuery({
		queryKey: ["search_map"],
		async queryFn() {
			const res = await fetch("/api/search-map");
			return (await res.json()) as SearchItems;
		},
	});
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState("");
	console.log({ data });

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
			<DialogContent>
				<Command className="rounded-lg border shadow-md">
					<CommandInput placeholder="Search for something" />
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						{data?.map((group, i) => {
							return (
								<CommandGroup key={group.id} heading={group.label}>
									{group.items.map((item) => {
										return (
											<CommandItem key={item.id}>
												<Link href={item.slug}>{item.label}</Link>
											</CommandItem>
										);
									})}
								</CommandGroup>
							);
						})}
					</CommandList>
				</Command>
			</DialogContent>
		</Dialog>
	);
};

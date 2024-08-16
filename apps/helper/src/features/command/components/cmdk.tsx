"use client";

import {
	Dialog,
	DialogContent,
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
import { Fragment, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { SearchItems } from "../types";
import { useRouter } from "next/navigation";
import { inputVariants } from "@repo/ui/components/input";

export const CommandMenu = () => {
	const router = useRouter();
	const { data } = useQuery({
		queryKey: ["search_map"],
		async queryFn() {
			const res = await fetch("/api/search-map");
			return (await res.json()) as SearchItems;
		},
	});
	const [open, setOpen] = useState(false);

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
				<div className={inputVariants()} />
			</DialogTrigger>
			<DialogContent>
				<Command className="rounded-lg border shadow-md">
					<CommandInput placeholder="Search for something" />
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						{data?.map((group, i) => {
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

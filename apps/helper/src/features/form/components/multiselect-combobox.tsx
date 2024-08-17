"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@repo/ui/components/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@repo/ui/components/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@repo/ui/components/popover";
import { cn } from "@repo/ui/lib/utils";

interface MultiSelectComboboxProps {
	items: Array<{ value: string; label: string }>;
	onSelect(value: string): void;
	value: string[];
	selectEntryText: string;
	searchEntryText: string;
	noEntryFoundText: string;
}

export function MultiSelectCombobox({
	items,
	onSelect,
	value,
	selectEntryText,
	searchEntryText,
	noEntryFoundText,
}: MultiSelectComboboxProps) {
	const [open, setOpen] = React.useState(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-[320px] justify-between flex">
					<span className="flex-1 min-w-0 truncate">
						{value
							? items
									.filter((item) => value.includes(item.value))
									.map((i) => i.label)
									.join(", ")
							: selectEntryText}
					</span>
					<ChevronsUpDown className="ml-2 h-4 w-4 flex-shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput placeholder={searchEntryText} />
					<CommandList>
						<CommandEmpty>{noEntryFoundText}</CommandEmpty>
						<CommandGroup>
							{items.map((item) => (
								<CommandItem
									key={item.value}
									value={item.value}
									onSelect={(currentValue) => {
										onSelect(currentValue);
										setOpen(false);
									}}>
									<Check
										className={cn(
											"mr-2 h-4 w-4",
											value.includes(item.value) ? "opacity-100" : "opacity-0",
										)}
									/>
									{item.label}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}

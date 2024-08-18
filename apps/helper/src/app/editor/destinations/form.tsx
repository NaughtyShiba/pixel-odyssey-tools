"use client";

import { Button } from "@repo/ui/components/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@repo/ui/components/card";
import { Input } from "@repo/ui/components/input";
import { Textarea } from "@repo/ui/components/textarea";
import Link from "next/link";
import type { ReactNode } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { submitLocation } from "./actions";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@repo/ui/components/form";
import { MultiSelectCombobox } from "@/features/form/components/multiselect-combobox";
import { useQuery } from "@tanstack/react-query";
import { getAllEnemiesQuery } from "@/models/enemies/queries";
import { getAllItemsQuery } from "@/models/items/queries";

export function LocationForm() {
	const { data: enemies = [] } = useQuery(getAllEnemiesQuery());
	const { data: items = [] } = useQuery(getAllItemsQuery());
	const { control } = useFormContext();

	return (
		<div className="grid gap-4 grid-cols-1 md:grid-cols-2">
			<FormField
				control={control}
				name="label"
				render={({ field }) => (
					<FormItem className="md:col-span-2">
						<FormLabel>Name</FormLabel>
						<FormControl>
							<Input {...field} />
						</FormControl>
					</FormItem>
				)}
			/>
			<FormField
				control={control}
				name="description"
				render={({ field }) => (
					<FormItem className="md:col-span-2">
						<FormLabel>Description</FormLabel>
						<FormControl>
							<Textarea {...field} rows={5} />
						</FormControl>
					</FormItem>
				)}
			/>
			<FormField
				control={control}
				name="enemies"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Enemies</FormLabel>
						<MultiSelectCombobox
							selectEntryText="Select enemy(-ies)"
							searchEntryText="Search for enemy..."
							noEntryFoundText="No enemy found."
							items={enemies.map(({ id, label }) => ({
								value: id,
								label,
							}))}
							value={field.value}
							onSelect={(value) =>
								field.value.includes(value)
									? field.onChange(
											field.value.filter((v: string) => v !== value),
										)
									: field.onChange([...field.value, value])
							}
						/>
					</FormItem>
				)}
			/>
			<FormField
				control={control}
				name="items"
				render={({ field }) => (
					<FormItem className="md:col-span-2">
						<FormLabel>Items</FormLabel>
						<MultiSelectCombobox
							selectEntryText="Select items"
							searchEntryText="Search for item..."
							noEntryFoundText="No item found."
							items={items.map(({ id, label }) => ({
								value: id,
								label,
							}))}
							value={field.value}
							onSelect={(value) =>
								field.value.includes(value)
									? field.onChange(
											field.value.filter((v: string) => v !== value),
										)
									: field.onChange([...field.value, value])
							}
						/>
					</FormItem>
				)}
			/>
		</div>
	);
}

interface LocationFormCardProps {
	title: string;
	children: ReactNode;
	defaultFormData?: {
		id: string | null;
		label: string;
		description: string | null;
		enemies: string[];
		// npcs?: string[];
		items: string[];
	};
}

const DEFAULT_FORM_DATA = {
	id: null,
	label: "",
	description: "",
	enemies: [],
	// npcs: [],
	items: [],
};

export function LocationFormCard({
	title,
	children,
	defaultFormData = DEFAULT_FORM_DATA,
}: LocationFormCardProps) {
	const form = useForm({
		defaultValues: defaultFormData,
	});

	const action: () => void = form.handleSubmit(async (data) => {
		await submitLocation(data);
	});

	return (
		<Form {...form}>
			<form action={action}>
				<Card>
					<CardHeader className="flex-row justify-between">
						<div className="flex flex-col space-y-1.5">
							<CardTitle>{title}</CardTitle>
						</div>
						<div className="flex flex-row gap-4">
							<Link href="/editor/destinations">
								<Button variant="secondary">Cancel</Button>
							</Link>
							<Button type="submit">Save</Button>
						</div>
					</CardHeader>
					<CardContent>{children}</CardContent>
				</Card>
			</form>
		</Form>
	);
}

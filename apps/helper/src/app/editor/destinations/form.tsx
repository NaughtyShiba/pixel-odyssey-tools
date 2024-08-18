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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllEnemiesQuery } from "@/models/enemies/queries";
import { getAllItemsQuery } from "@/models/items/queries";
import { redirect, useParams } from "next/navigation";
import { getDestinationQuery } from "@/models/destinations/queries";

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

const DEFAULT_FORM_DATA: {
	id: string | null;
	label: string;
	description: string | null;
	enemies: string[];
	// npcs?: string[];
	items: string[];
} = {
	id: null,
	label: "",
	description: "",
	enemies: [],
	// npcs: [],
	items: [],
};
interface LocationFormCardProps {
	children: ReactNode;
}
export function LocationFormCard({ children }: LocationFormCardProps) {
	const { slug } = useParams<{ slug: string }>();
	const { data: destination } = useQuery(getDestinationQuery(slug));
	const form = useForm({
		defaultValues: destination ?? DEFAULT_FORM_DATA,
	});
	const queryClient = useQueryClient();

	const action: () => void = form.handleSubmit(async (data) => {
		const res = await submitLocation(data);
		if (data.id === null) redirect(`/editor/destinations/${res.id}`);
		if (data.id)
			queryClient.invalidateQueries({ queryKey: ["destinations", data.id] });
		console.log("abc");
	});

	return (
		<Form {...form}>
			<form action={action}>
				<Card>
					<CardHeader className="flex-row justify-between">
						<div className="flex flex-col space-y-1.5">
							<CardTitle>
								{slug ? destination?.label : "New Destination"}
							</CardTitle>
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

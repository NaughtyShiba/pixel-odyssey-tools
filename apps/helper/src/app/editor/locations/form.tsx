"use client";
import type { EnemyMinimal } from "@repo/helper/features/enemies/models";
import { Button } from "@repo/ui/components/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@repo/ui/components/card";
import { Checkbox } from "@repo/ui/components/checkbox";
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
import { MultiSelectCombobox } from "@/src/features/form/components/multiselect-combobox";

interface LocationFormProps {
	enemies: Record<string, EnemyMinimal>;
}

export function LocationForm(props: LocationFormProps) {
	const { control } = useFormContext();

	return (
		<div className="grid gap-4">
			<FormField
				control={control}
				name="label"
				render={({ field }) => (
					<FormItem>
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
					<FormItem>
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
						<div className="">
							<div className="col-span-4">Enemies</div>
							<MultiSelectCombobox
								selectEntryText="Select enemy(-ies)"
								searchEntryText="Search for enemy..."
								noEntryFoundText="No enemy found."
								items={Object.entries(props.enemies).map(
									([value, { label }]) => ({ value, label }),
								)}
								value={field.value}
								onSelect={(value) =>
									field.value.includes(value)
										? field.onChange(
												field.value.filter((v: string) => v !== value),
											)
										: field.onChange([...field.value, value])
								}
							/>
						</div>
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
		label: string;
		enemies: string[];
		npcs?: string[];
		items?: string[];
	};
}

const DEFAULT_FORM_DATA = {
	label: "",
	enemies: [],
	npcs: [],
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
							<Link href="/editor/locations">
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

import type { ReactNode } from "react";
import "./globals.css";
import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import { getEnemies } from "../features/enemies/models";
import { getEnemiesQueryKey } from "../features/enemies/utils";
import { getCategories, getItems } from "../features/items/models";
import {
	getCategoriesQueryKey,
	getItemsQueryKey,
} from "../features/items/utils";
import { getLocations } from "../features/locations/models";
import { getLocationsQueryKey } from "../features/locations/utils";
import { ReactQueryClientProvider } from "../features/providers/providers";
import { ThemeProvider } from "../features/theme/context";

interface RootLayoutProps {
	children: ReactNode;
}

function getTheme() {
	const theme = cookies().get("theme");
	if (["light", "dark", "system"].includes(theme?.value ?? ""))
		return theme?.value as "light" | "dark" | "system";
	return "system";
}

export default async function RootLayout({ children }: RootLayoutProps) {
	const theme = getTheme();
	console.log(theme);
	const queryClient = new QueryClient();
	await Promise.all([
		queryClient.prefetchQuery({
			queryKey: getLocationsQueryKey(),
			queryFn: getLocations,
		}),
		queryClient.prefetchQuery({
			queryKey: getItemsQueryKey(),
			queryFn: getItems,
		}),
		queryClient.prefetchQuery({
			queryKey: getEnemiesQueryKey(),
			queryFn: getEnemies,
		}),
		queryClient.prefetchQuery({
			queryKey: getCategoriesQueryKey(),
			queryFn: getCategories,
		}),
	]);
	return (
		<ReactQueryClientProvider>
			<HydrationBoundary state={dehydrate(queryClient)}>
				<html lang="en" data-theme={theme}>
					<head />
					<ThemeProvider defaultTheme={theme}>
						<body>{children}</body>
					</ThemeProvider>
				</html>
			</HydrationBoundary>
		</ReactQueryClientProvider>
	);
}

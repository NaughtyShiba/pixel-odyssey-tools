import type { ReactNode } from "react";
import "./globals.css";
import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import { ReactQueryClientProvider } from "../features/providers/providers";
import { ThemeProvider } from "../features/theme/context";
import { getAllEnemiesQuery } from "../models/enemies/queries";
import { getAllDestinationsQuery } from "../models/destinations/queries";
import { getAllItemsQuery } from "../models/items/queries";

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
	const queryClient = new QueryClient();
	await Promise.all([
		queryClient.prefetchQuery(getAllDestinationsQuery()),
		queryClient.prefetchQuery(getAllItemsQuery()),
		queryClient.prefetchQuery(getAllEnemiesQuery()),
		// queryClient.prefetchQuery({
		// 	queryKey: getCategoriesQueryKey(),
		// 	queryFn: getCategories,
		// }),
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

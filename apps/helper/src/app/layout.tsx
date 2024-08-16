import type { ReactNode } from "react";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import { Header } from "../components/header";
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
		<ClerkProvider>
			<ReactQueryClientProvider>
				<HydrationBoundary state={dehydrate(queryClient)}>
					<html lang="en" data-theme={theme}>
						<head />
						<ThemeProvider defaultTheme={theme}>
							<body>
								<div className="flex min-h-screen w-full flex-col">
									<Header />
									<main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10 lg:w-full lg:max-w-[1024px] lg:mx-auto">
										{children}
									</main>
								</div>
							</body>
						</ThemeProvider>
					</html>
				</HydrationBoundary>
			</ReactQueryClientProvider>
		</ClerkProvider>
	);
}

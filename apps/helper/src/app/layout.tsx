import type { ReactNode } from "react";
import "./globals.css";
import { Header } from "../components/header";
import { ReactQueryClientProvider } from "../features/providers/providers";
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";
import { getLocationsQueryKey } from "../features/locations/utils";
import {
	getCategoriesQueryKey,
	getItemsQueryKey,
} from "../features/items/utils";
import { getEnemiesQueryKey } from "../features/enemies/utils";
import { getLocations } from "../features/locations/models";
import { getCategories, getItems } from "../features/items/models";
import { getEnemies } from "../features/enemies/models";
import { ThemeProvider } from "../features/theme/context";

interface RootLayoutProps {
	children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
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
				<html lang="en" className="dark" suppressHydrationWarning>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange>
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
	);
}

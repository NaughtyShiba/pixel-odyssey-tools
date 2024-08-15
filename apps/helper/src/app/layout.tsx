import type { ReactNode } from "react";
import "./globals.css";
import { Header } from "../components/header";
import { ReactQueryClientProvider } from "../features/providers/providers";
import { CommandMenu } from "../features/command/components/cmdk";
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";
import { getLocationsQueryKey } from "../features/locations/utils";
import { getItemsQueryKey } from "../features/items/utils";
import { getEnemiesQueryKey } from "../features/enemies/utils";

interface RootLayoutProps {
	children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: getLocationsQueryKey(),
		async queryFn() {
			try {
				const res = await import("@repo/helper/data/locations.json");
				return Object.entries(res.default).map(([value, label]) => ({
					value,
					label,
				}));
			} catch (ex) {
				console.error(ex);
				throw ex;
			}
		},
	});
	await queryClient.prefetchQuery({
		queryKey: getItemsQueryKey(),
		async queryFn() {
			try {
				const res = await import("@repo/helper/data/items.json");
				return res.default;
			} catch (ex) {
				console.error(ex);
				throw ex;
			}
		},
	});
	await queryClient.prefetchQuery({
		queryKey: getEnemiesQueryKey(),
		async queryFn() {
			try {
				const res = await import("@repo/helper/data/enemies.json");
				return res.default;
			} catch (ex) {
				console.error(ex);
				throw ex;
			}
		},
	});
	return (
		<ReactQueryClientProvider>
			<HydrationBoundary state={dehydrate(queryClient)}>
				<html lang="en" className="dark">
					<body>
						<div className="flex min-h-screen w-full flex-col">
							<Header />
							<main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10 lg:w-full lg:max-w-[1024px] lg:mx-auto">
								{children}
							</main>
							<CommandMenu />
						</div>
					</body>
				</html>
			</HydrationBoundary>
		</ReactQueryClientProvider>
	);
}

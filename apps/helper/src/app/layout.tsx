import type { ReactNode } from "react";
import "./globals.css";
import { Header } from "../components/header";
import { ReactQueryClientProvider } from "../features/providers/providers";

interface RootLayoutProps {
	children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<ReactQueryClientProvider>
			<html lang="en" className="dark">
				<body>
					<div className="flex min-h-screen w-full flex-col">
						<Header />
						<main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10 lg:w-full lg:max-w-[1024px] lg:mx-auto">
							{children}
						</main>
					</div>
				</body>
			</html>
		</ReactQueryClientProvider>
	);
}

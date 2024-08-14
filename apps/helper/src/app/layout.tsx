import type { ReactNode } from "react";
import "./globals.css";
import "@repo/ui/styles.css";
import { Providers } from "../features/providers/providers";

interface RootLayoutProps {
	children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en">
			<Providers>
				<body>{children}</body>
			</Providers>
		</html>
	);
}

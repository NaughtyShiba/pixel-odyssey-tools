import type { ReactNode } from "react";
import "./globals.css";
import "@repo/ui/styles.css";

interface RootLayoutProps {
	children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
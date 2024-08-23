import type { ReactNode } from "react";
import "./globals.css";
import { cookies } from "next/headers";
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

export default function RootLayout({ children }: RootLayoutProps) {
	const theme = getTheme();
	return (
		<html lang="en" data-theme={theme}>
			<head />
			<ThemeProvider defaultTheme={theme}>
				<body>{children}</body>
			</ThemeProvider>
		</html>
	);
}

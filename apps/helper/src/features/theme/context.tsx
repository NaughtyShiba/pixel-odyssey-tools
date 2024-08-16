"use client";

import { setThemeCookie } from "@/src/app/actions";
import { createContext, useCallback, useContext } from "react";
import type { ReactNode } from "react";

type Mode = "dark" | "light" | "system";
const ThemeContext = createContext<{ setTheme?(mode: Mode): void }>({});

interface ThemeProviderProps {
	children: ReactNode;
	defaultTheme: Mode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
	const setTheme = useCallback((mode: Mode) => {
		setThemeCookie(mode);
		document.querySelector("html")?.setAttribute("data-theme", mode);
	}, []);
	return (
		<ThemeContext.Provider value={{ setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

export const useTheme = () => useContext(ThemeContext);

"use client";

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import type { ReactNode } from "react";

type Mode = "dark" | "light" | "system";
const ThemeContext = createContext<{ setTheme?(mode: Mode): void }>({});

interface ThemeProviderProps {
	children: ReactNode;
}

const query = "(prefers-color-scheme: dark)";

const getInitialTheme = () => {
	if (typeof localStorage === "undefined") return "system";
	const themeFromLocalStorage = localStorage.getItem("theme");
	console.log({ themeFromLocalStorage });
	if (
		themeFromLocalStorage === null ||
		!["dark", "light", "system"].includes(themeFromLocalStorage)
	)
		return "system";
	return themeFromLocalStorage as Mode;
};

const handleMode = (mode: Mode) => {
	const darkOrLight =
		mode === "system" ? (matchMedia(query).matches ? "dark" : "light") : mode;
	if (darkOrLight === "dark") {
		document.querySelector("html")?.classList.add("dark");
	} else {
		document.querySelector("html")?.classList.remove("dark");
	}
};

export function ThemeProvider({ children }: ThemeProviderProps) {
	const [value, setValue] = useState<Mode>(() => getInitialTheme());
	const setTheme = useCallback((mode: Mode) => {
		setValue(mode);
		localStorage.setItem("theme", mode);
		handleMode(mode);
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: we only want it to run once
	useEffect(() => {
		handleMode(value);
	}, []);
	useEffect(() => {
		const callback = (e: MediaQueryListEvent) => {
			setTheme(e.matches ? "dark" : "light");
		};
		matchMedia(query).addEventListener("change", callback);
		return () => matchMedia(query).removeEventListener("change", callback);
	}, [setTheme]);
	return (
		<ThemeContext.Provider value={{ setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

export const useTheme = () => useContext(ThemeContext);

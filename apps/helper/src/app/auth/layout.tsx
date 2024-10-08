import type { ReactNode } from "react";

export default function ({ children }: { children: ReactNode }) {
	return (
		<div className="flex min-h-screen w-full flex-col">
			<main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10 lg:w-full lg:max-w-[1024px] lg:mx-auto items-center justify-center">
				{children}
			</main>
		</div>
	);
}

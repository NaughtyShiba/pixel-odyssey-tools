import { auth } from "@/auth";
import { Link } from "@repo/helper/components/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

interface DashboardProps {
	children: ReactNode;
}

export default async function Dashboard({ children }: DashboardProps) {
	const session = await auth();
	console.log({ session });
	if (!session) redirect("/");

	return (
		<div className="flex min-h-screen w-full flex-col">
			<header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-30">
				<nav className="hidden gap-6 text-lg font-medium md:flex md:w-full md:flex-row md:justify-between md:gap-5 md:text-sm lg:gap-6">
					<Link href="/editor">Editor</Link>
				</nav>
			</header>
			<main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
				<div className="mx-auto grid w-full max-w-6xl gap-2">
					<h1 className="text-3xl font-semibold">Wiki Editor</h1>
				</div>
				<div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
					<nav
						className="grid gap-4 text-sm text-muted-foreground"
						x-chunk="dashboard-04-chunk-0">
						<Link href="/editor/users">Users</Link>
						<Link href="/editor/items">Items</Link>
						<Link href="/editor/enemies">Enemies</Link>
						<Link href="/editor/destinations">Destinations</Link>
						<Link href="/editor/posts">Posts</Link>
					</nav>
					<div className="grid gap-6">{children}</div>
				</div>
			</main>
		</div>
	);
}

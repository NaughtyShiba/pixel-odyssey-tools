"use client";

import { cn } from "@repo/ui/lib/utils";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentPropsWithRef } from "react";

interface LinkProps extends ComponentPropsWithRef<typeof NextLink> {}

export function Link(props: LinkProps) {
	const pathname = usePathname();
	return (
		<NextLink
			{...props}
			className={cn(
				"transition-colors hover:text-primary",
				pathname.startsWith(props.href.toString())
					? "text-primary"
					: "text-foreground",
				props.className,
			)}
		/>
	);
}

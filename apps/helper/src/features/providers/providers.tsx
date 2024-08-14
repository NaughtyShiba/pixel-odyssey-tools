"use client";

import {
	QueryClient,
	QueryClientProvider,
	isServer,
} from "@tanstack/react-query";
import type { ReactNode } from "react";

interface YOLO {
	browserQueryClient?: QueryClient;
}
const __yolo__: YOLO = {};

function createQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 30 * 1000,
			},
		},
	});
}

function getQueryClient() {
	if (isServer) {
		return createQueryClient();
	}
	__yolo__.browserQueryClient ??= createQueryClient();
	return __yolo__.browserQueryClient;
}

interface ProvidersProps {
	children: ReactNode;
}

export function Providers(props: ProvidersProps) {
	const queryClient = getQueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			{props.children}
		</QueryClientProvider>
	);
}

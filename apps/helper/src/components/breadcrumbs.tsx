import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@repo/ui/components/breadcrumb";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export function NextBreadcrumb() {
	const pathname = usePathname();
	const crumbs = useMemo(() => {
		const parts = pathname.split("/").slice(1);
		const crumbs =
			pathname !== "/"
				? parts.flatMap((part, i) => {
						const crumbs: Array<
							| { type: "separator"; id: string }
							| { type: "crumb"; link: string; id: string; label: string }
						> = [
							{
								type: "crumb",
								link: `/${parts.slice(0, i + 1).join("/")}`,
								id: `${part}-${i}-crumb`,
								label: part,
							},
						];

						if (i < parts.length - 1) {
							crumbs.push({ type: "separator", id: `${part}-${i}-separator` });
						}

						return crumbs;
					})
				: [];

		return [
			{
				type: "crumb",
				link: "/",
				id: "home-home-crumb",
				label: "helper",
			},
			...(crumbs.length > 0
				? [{ type: "separator", id: "home-home-separator" }]
				: []),
			...crumbs,
		];
	}, [pathname]);

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{crumbs.map((crumb, i) => {
					if (crumb.type === "separator")
						return <BreadcrumbSeparator key={crumb.id} />;
					return (
						<BreadcrumbItem key={crumb.id}>
							<BreadcrumbLink
								href={crumb.link}
								active={i === crumbs.length - 1}>
								{crumb.label}
							</BreadcrumbLink>
						</BreadcrumbItem>
					);
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
}

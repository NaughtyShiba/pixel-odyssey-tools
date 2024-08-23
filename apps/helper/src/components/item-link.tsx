import Image from "next/image";
import Link from "next/link";

interface ItemLinkProps {
	id: string;
	label?: string;
	amount?: number;
}
export function ItemLink(props: ItemLinkProps) {
	return (
		<span className="inline-block">
			<Link
				className="flex flex-row items-center gap-2 underline"
				href={`/items/${props.id}`}>
				<Image
					src={`/assets/items/${props.id}.png`}
					width={24}
					height={24}
					alt={props.label ?? ""}
				/>
				<span>
					{props.label}
					{props.amount ? ` (${props.amount})` : null}
				</span>
			</Link>
		</span>
	);
}

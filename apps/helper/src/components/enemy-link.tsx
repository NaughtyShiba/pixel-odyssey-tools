import Image from "next/image";
import Link from "next/link";

interface EnemyLinkProps {
	id: string;
	label?: string;
}
export function EnemyLink(props: EnemyLinkProps) {
	return (
		<span className="inline-block">
			<Link
				className="flex flex-row items-center gap-2 underline"
				href={`/enemies/${props.id}`}>
				<Image
					src={`/assets/enemies/${props.id}.png`}
					width={24}
					height={24}
					alt={props.label ?? ""}
				/>
				<span>{props.label}</span>
			</Link>
		</span>
	);
}

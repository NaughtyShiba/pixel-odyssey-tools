import { getItem } from "@/models/items/models";
import { ItemLink as ItemLinkBase } from "@/components/item-link";
import Image from "next/image";
import Link from "next/link";

interface ItemLinkProps {
	itemName: string;
	amount?: number;
}
export async function ItemLink(props: ItemLinkProps) {
	const item = await getItem(props.itemName);
	if (!item) return <span>{props.itemName}</span>;
	return <ItemLinkBase id={item.id} label={item.label} amount={props.amount} />;
}

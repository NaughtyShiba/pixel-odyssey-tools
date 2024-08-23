import { ItemInfo } from "@/features/items/components/item-info";
import { getAllItems, getItem } from "@/models/items/models";

export default function Page({ params }: { params: { slug: string } }) {
	const item = getItem(params.slug);

	return <ItemInfo item={item} />;
}

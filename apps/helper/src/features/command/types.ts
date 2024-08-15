export interface SearchItem {
	id: string;
	label: string;
	slug: string;
}

export type SearchItems = Array<{
	id: string;
	label: string;
	items: SearchItem[];
}>;

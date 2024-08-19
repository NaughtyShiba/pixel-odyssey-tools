import {
	getAllItems,
	getItemsByCategory,
	getItem,
	getItemsCategories,
} from "./models";

export function getAllItemsQuery() {
	return {
		queryKey: ["items"],
		async queryFn() {
			return await getAllItems();
		},
	};
}

export function getItemsCategoriesQuery() {
	return {
		queryKey: ["items", "categories"],
		async queryFn() {
			return await getItemsCategories();
		},
	};
}

export function getItemsByCategoryQuery(category: string) {
	return {
		queryKey: ["items", { category }],
		async queryFn() {
			return await getItemsByCategory(category);
		},
		enabled: Boolean(category),
	};
}
export function getItemQuery(name: string) {
	return {
		queryKey: ["items", { name }],
		async queryFn() {
			return await getItem(name);
		},
		enabled: Boolean(name),
	};
}

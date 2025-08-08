export type MenuList = {
	id: number;
	name: string;
	url: string;
};
export type CategoriesList = {
	name: string;
	value: string;
};
export type ColorList = {
	name: string;
	value: string;
};
export type SortList = {
	name: string;
	value: string;
};
export type ShowList = {
	value: number;
};
export interface FiltersSliceState {
	activeCategory: string;
	activeRating: number;
	activeColor: string;
	priceMinMax: [number, number];
	activeSort: SortList;
	activeShow: number;
	filterResults: {
		activeShow: string;
		activeSort: string;
	};
	currentPage: number;
	searchValue: any;
	searchModal: boolean;
	menuUrlValue: MenuList;
}

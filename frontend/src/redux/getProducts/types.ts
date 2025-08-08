export type ProductType = {
	art: string;
	category: number;
	color: string;
	description: string;
	featured: boolean;
	id: number;
	imageUrl: string;
	inStock: boolean;
	name: string;
	price: number;
	rating: number;
	salePrice: number;
	slides?: string[] | undefined;
	recommend?: boolean;
	salehit?: boolean;
	saler?: boolean;
	bestRating?: boolean;
	saveImage?: string;
};

export type ProductTypeForTable = Omit<ProductType, 'category'> & {
	category: string;
};

export const Status = {
	LOADING: 'loading',
	SUCCESS: 'success',
	ERROR: 'error',
} as const;

export type Status = (typeof Status)[keyof typeof Status];

export type activeSort = {
	name: string;
	value: string;
};
export type Search = {
	Search: string;
};
export type FetchProductsArgs = {
	activeCategory?: string;
	activeColor?: string;
	activeRating?: number;
	activeShow?: number;
	activeSort?: activeSort;
	currentPage?: number;
	priceMinMax?: [number, number];
	searchValue?: any;
};
export interface GetProductsSliceState {
	productsCount: number;
	products: ProductType[];
	productsAll: ProductType[];
	status: string;
	statusAll: string;
}

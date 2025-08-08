export type CardTypeInCart = {
	id?: number;
	productId: number | undefined;
	imageUrl: string;
	name: string;
	price: number;
	salePrice: number;
	count: number;
	currentTotalPrice: number;
	currentTotalSalePrice: number;
};

export interface CartSliceState {
	productsInCart: CardTypeInCart[];
	totalCountInCart?: number;
	totalPriceInCart?: number;
	totalSalePriceInCart?: number;
	statusInCart: string;
	cartModalStatus: boolean;
	orderModalStatus: boolean;
}

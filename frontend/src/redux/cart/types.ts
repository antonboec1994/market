export interface CartSliceState {
	productsInCart: ProductInCart[];
	totalCountInCart: number;
	totalPriceInCart: number;
	totalSalePriceInCart: number;
	cartModalStatus: boolean;
	orderModalStatus: boolean;
}

export type ProductInCart = {
	count: number;
	currentTotalPrice: number;
	currentTotalSalePrice: number;
	id?: number;
	imageUrl: string;
	name: string;
	price: number;
	productId: number;
	salePrice: number;
	userId?: number;
};

export type CartData = {
	cart: ProductInCart[];
	message?: string;
};

export type CartErrorResponse = {
	status: number;
	data: {
		message: string;
	};
};

import type { ProductInCart } from '@/redux/cart/types';

export const calcTotalCount = (cart: ProductInCart[]) => {
	if (!cart) return 0;
	return cart.reduce((sum, item) => sum + item.count, 0);
};

export const calcTotalPrice = (cart: ProductInCart[]) => {
	if (!cart) return 0;
	return cart.reduce((sum, item) => item.price * item.count + sum, 0);
};

export const calcTotalSalePrice = (cart: ProductInCart[]) => {
	if (!cart) return 0;
	return cart.reduce((sum, item) => item.salePrice * item.count + sum, 0);
};

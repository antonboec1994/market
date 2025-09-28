import type { CartData } from '@/redux/cart/types';

export const getCartFromLS = (): CartData => {
	try {
		const cartData = localStorage.getItem('cart');
		if (!cartData) return { cart: [] };
		const parsed = JSON.parse(cartData);
		if (!parsed.cart) return { cart: [] };
		return parsed as CartData;
	} catch (error) {
		console.warn('Ошибка при загрузке из localStorage', error);
		return { cart: [] };
	}
};

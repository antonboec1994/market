import type { CardTypeInCart } from '@/redux/cart/types';

export const getCartFromLS = () => {
	const data = localStorage.getItem('cart');
	const productsInCartFromLS: CardTypeInCart[] = data ? JSON.parse(data) : [];
	return {
		productsInCartFromLS,
	};
};

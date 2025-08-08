import type { CardTypeInCart } from '@/redux/cart/types';

export const calcTotalCount = (productsInCartFromLS: CardTypeInCart[]) => {
	if (Array.isArray(productsInCartFromLS)) {
		return (
			productsInCartFromLS &&
			productsInCartFromLS.reduce((count, item) => item.count + count, 0)
		);
	}
};

export const calcTotalPrice = (productsInCartFromLS: CardTypeInCart[]) => {
	if (Array.isArray(productsInCartFromLS)) {
		return (
			productsInCartFromLS &&
			productsInCartFromLS.reduce(
				(sum, item) => item.price * item.count + sum,
				0
			)
		);
	}
};

export const calcTotalSalePrice = (productsInCartFromLS: CardTypeInCart[]) => {
	if (Array.isArray(productsInCartFromLS)) {
		return (
			productsInCartFromLS &&
			productsInCartFromLS.reduce(
				(sum, item) => item.salePrice * item.count + sum,
				0
			)
		);
	}
};

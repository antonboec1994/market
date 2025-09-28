import { useAddToCartMutation } from '@/redux/cart/api';
import { setCartModalStatus } from '@/redux/cart/slice';
import type { ProductInCart } from '@/redux/cart/types';
import type { ProductType } from '@/redux/getProducts/types';
import {
	ntfMessagePlusToCart,
	ntfTypePlusToCart,
} from '@/redux/notification/consts';
import { useAppDispatch } from '@/redux/store';
import { DispatchNotification } from '../notificationDispatch';

export const useAddToCart = () => {
	const dispatch = useAppDispatch();
	const [addToCart] = useAddToCartMutation();

	return async (product: ProductType) => {
		const productForCart: ProductInCart = {
			count: 1,
			currentTotalPrice: product.price,
			currentTotalSalePrice: product.salePrice,
			imageUrl: product.imageUrl,
			name: product.name,
			price: product.price,
			productId: product.id,
			salePrice: product.salePrice,
		};
		try {
			await addToCart(productForCart).unwrap();
			DispatchNotification(
				true,
				productForCart,
				ntfMessagePlusToCart,
				ntfTypePlusToCart
			);
			dispatch(setCartModalStatus(true));
		} catch (error) {
			console.error('Ошибка добавления в корзину:', error);
		}
	};
};

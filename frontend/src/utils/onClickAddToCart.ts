import { setCartModalStatus } from '@/redux/cart/slice';
import { addToCart, fetchGetCart } from '@/redux/cart/thunks';
import {
	ntfMessagePlusToCart,
	ntfTypePlusToCart,
} from '@/redux/notification/consts';
import { store } from '@/redux/store';
import { DispatchNotification } from './notificationDispatch';
import type { ProductType } from '@/redux/getProducts/types';

export const OnClickAddToCart = async (product: ProductType) => {
	console.log('product ', product);
	const productForCart = {
		productId: product.id,
		imageUrl: product.imageUrl,
		name: product.name,
		price: product.price,
		salePrice: product.salePrice,
		count: 1,
		currentTotalPrice: product.price,
		currentTotalSalePrice: product.salePrice,
	};

	await store.dispatch(addToCart(productForCart));
	await store.dispatch(fetchGetCart());
	DispatchNotification(
		true,
		productForCart,
		ntfMessagePlusToCart,
		ntfTypePlusToCart
	);
	store.dispatch(setCartModalStatus(true));
};

import {
	deleteFromCart,
	fetchGetCart,
	minusTocart,
	plusToCart,
} from '@/redux/cart/thunks';
import type { CardTypeInCart } from '@/redux/cart/types';
import {
	ntfMessageMinusFromCart,
	ntfMessagePlusToCart,
	ntfTypeMinusFromCart,
	ntfTypePlusToCart,
} from '@/redux/notification/consts';
import { SelectNotification } from '@/redux/notification/selectors';
import { useAppDispatch } from '@/redux/store';
import { DispatchNotification } from '@/utils/notificationDispatch';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styles from './Buttons.module.scss';

type AddToCartCalcformProps = {
	item: CardTypeInCart;
};

const AddToCartCalcform: React.FC<AddToCartCalcformProps> = ({ item }) => {
	const dispatch = useAppDispatch();
	const { notificationInfo } = useSelector(SelectNotification);
	const isMounted = useRef(false);

	useEffect(() => {
		if (isMounted.current) {
			const notificationInfoJSON = JSON.stringify(notificationInfo);
			localStorage.setItem('notification', notificationInfoJSON);
		}
		isMounted.current = true;
	}, [notificationInfo]);

	const minusItem = async () => {
		const itemForCart = {
			productId: item.productId,
			imageUrl: item.imageUrl,
			name: item.name,
			price: item.price,
			salePrice: item.salePrice,
			count: item.count,
			currentTotalPrice: item.currentTotalPrice,
			currentTotalSalePrice: item.currentTotalSalePrice,
		};
		if (item.count > 1) {
			await dispatch(minusTocart(itemForCart));
			DispatchNotification(
				true,
				itemForCart,
				ntfMessageMinusFromCart,
				ntfTypeMinusFromCart
			);
		} else {
			await dispatch(deleteFromCart(itemForCart.productId));
		}
		await dispatch(fetchGetCart());
	};

	const plusItem = async () => {
		const itemForCart = {
			productId: item.productId,
			imageUrl: item.imageUrl,
			name: item.name,
			price: item.price,
			salePrice: item.salePrice,
			count: item.count,
			currentTotalPrice: item.currentTotalPrice,
			currentTotalSalePrice: item.currentTotalSalePrice,
		};
		await dispatch(plusToCart(itemForCart));
		await dispatch(fetchGetCart());
		DispatchNotification(
			true,
			itemForCart,
			ntfMessagePlusToCart,
			ntfTypePlusToCart
		);
	};

	return (
		<div className={styles.cart__item_calc}>
			<button className={styles.cart__item_minus} onClick={() => minusItem()}>
				-
			</button>
			<div className={styles.cart__item_count}>{item.count}</div>
			<button className={styles.cart__item_plus} onClick={() => plusItem()}>
				+
			</button>
		</div>
	);
};

export default AddToCartCalcform;

import {
	ntfMessageMinusFromCart,
	ntfMessagePlusToCart,
	ntfTypeMinusFromCart,
	ntfTypePlusToCart,
} from '@/redux/notification/consts';
import { SelectNotification } from '@/redux/notification/selectors';
import { DispatchNotification } from '@/utils/notificationDispatch';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styles from './Buttons.module.scss';
import {
	useDeleteProductMutation,
	useUpdateCountMutation,
} from '@/redux/cart/api';
import type { ProductInCart } from '@/redux/cart/types';

type AddToCartCalcformProps = {
	item: ProductInCart;
};

const AddToCartCalcform: React.FC<AddToCartCalcformProps> = ({ item }) => {
	const { notificationInfo } = useSelector(SelectNotification);
	const isMounted = useRef(false);
	const [updateCount] = useUpdateCountMutation();
	const [deleteProduct] = useDeleteProductMutation();

	useEffect(() => {
		if (isMounted.current) {
			const notificationInfoJSON = JSON.stringify(notificationInfo);
			localStorage.setItem('notification', notificationInfoJSON);
		}
		isMounted.current = true;
	}, [notificationInfo]);

	const minusItem = async () => {
		if (!item.id) return;
		try {
			if (item.count > 1) {
				await updateCount({ id: item.id, count: item.count - 1 }).unwrap();
				DispatchNotification(
					true,
					item,
					ntfMessageMinusFromCart,
					ntfTypeMinusFromCart
				);
			} else {
				await deleteProduct({ id: item.id }).unwrap();
			}
		} catch (error) {
			console.error('Ошибка уменьшения количества ', error);
		}
	};

	const plusItem = async () => {
		if (!item.id) return;
		try {
			await updateCount({ id: item.id, count: item.count + 1 }).unwrap();
			DispatchNotification(true, item, ntfMessagePlusToCart, ntfTypePlusToCart);
		} catch (error) {
			console.error('Ошибка увеличения количества ', error);
		}
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

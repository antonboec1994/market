import {
	setNotificatioType,
	setNotificationInfo,
	setNotificationStatus,
} from '@/redux/notification/slice';
import { useAppDispatch } from '@/redux/store';
import { deleteFromCart, fetchGetCart } from '@/redux/cart/thunks';
import type { CardTypeInCart } from '@/redux/cart/types';
import {
	ntfMessageDeleteFromCart,
	ntfTypeDeleteFromCart,
} from '@/redux/notification/consts';
import styles from './Buttons.module.scss';

type DeleteFromCartBtnPropsType = {
	item: CardTypeInCart;
};

const DeleteFromCartBtn: React.FC<DeleteFromCartBtnPropsType> = ({ item }) => {
	const dispatch = useAppDispatch();

	const deleteItem = async (item: CardTypeInCart) => {
		await dispatch(deleteFromCart(item.productId));
		await dispatch(fetchGetCart());
		dispatch(setNotificationStatus(true));
		dispatch(setNotificatioType(ntfTypeDeleteFromCart));
		dispatch(
			setNotificationInfo({
				item: item,
				message: ntfMessageDeleteFromCart,
				type: ntfTypeDeleteFromCart,
			})
		);
	};

	return (
		<div
			className={`${styles.cart__item_delete} icon_trash`}
			onClick={() => deleteItem(item)}
		></div>
	);
};

export default DeleteFromCartBtn;

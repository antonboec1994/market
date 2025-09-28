import {
	ntfMessageDeleteFromCart,
	ntfTypeDeleteFromCart,
} from '@/redux/notification/consts';
import {
	setNotificatioType,
	setNotificationInfo,
	setNotificationStatus,
} from '@/redux/notification/slice';
import { useAppDispatch } from '@/redux/store';
import styles from './Buttons.module.scss';
import { useDeleteProductMutation } from '@/redux/cart/api';
import type { ProductInCart } from '@/redux/cart/types';

type DeleteFromCartBtnPropsType = {
	item: ProductInCart;
};

const DeleteFromCartBtn: React.FC<DeleteFromCartBtnPropsType> = ({ item }) => {
	const dispatch = useAppDispatch();
	const [deleteProduct] = useDeleteProductMutation();

	const handleDeleteProduct = async (item: ProductInCart) => {
		if (!item.id) return;
		await deleteProduct({ id: item.id }).unwrap();
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
			onClick={() => handleDeleteProduct(item)}
		></div>
	);
};

export default DeleteFromCartBtn;

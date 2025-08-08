import type { CardTypeInCart } from '@/redux/cart/types';
import type { ProductType } from '@/redux/getProducts/types';
import {
	setNotificatioType,
	setNotificationInfo,
	setNotificationStatus,
} from '@/redux/notification/slice';
import { store } from '@/redux/store';

export const DispatchNotification = (
	status: boolean,
	item: CardTypeInCart | ProductType,
	message: string,
	type: string
) => {
	store.dispatch(setNotificationStatus(status));
	store.dispatch(setNotificatioType(message));
	store.dispatch(setNotificationInfo({ item, message, type }));
};

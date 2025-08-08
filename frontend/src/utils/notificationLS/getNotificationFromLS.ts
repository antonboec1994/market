import type { NotificationInfo } from '@/redux/notification/types';

export const getNotificationFromLS = () => {
	const data = localStorage.getItem('notification');
	const notificationFromLS: NotificationInfo[] = data ? JSON.parse(data) : [];
	return { notificationFromLS };
};

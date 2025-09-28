export type NotificationInfo = {
	item: any;
	message: string;
	type: string;
};

export interface NotificationSliceState {
	notificationStatus: boolean;
	notificationMessage: string;
	notificationType: string;
	notificationInfo: NotificationInfo[];
}

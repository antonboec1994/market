import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import moment from 'moment';

export const SelectAuth = (state: RootState) => state.auth;

export const SelectAuthValues = createSelector([SelectAuth], auth => {
	const user = auth.userData?.user;

	if (!user) {
		return {
			...auth,
			createdDate: '',
			createdTime: '',
			updatedDate: '',
			updatedTime: '',
		};
	}

	return {
		...auth,
		createdDate: moment(user.createdAt).format('DD.MM.YY'),
		createdTime: moment(user.createdAt).format('HH:mm'),
		updatedDate: moment(user.updatedAt).format('DD.MM.YY'),
		updatedTime: moment(user.updatedAt).format('HH:mm'),
	};
});

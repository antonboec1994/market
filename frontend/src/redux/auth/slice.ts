import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { getUserFromLs } from '@/utils/authLS/getUserFromLS';
import { getUser } from './thunks';
import type { AuthSliceState } from './types';
import { userApi } from './api';

const { user } = getUserFromLs();

const getUserData = () => {
	if (user?.user && user.user.createdAt && user.user.updatedAt) {
		return {
			user: user.user,
			createdDate: moment(user.user.createdAt).format('DD.MM.YY'),
			createdTime: moment(user.user.createdAt).format('HH:mm'),
			updatedDate: moment(user.user.updatedAt).format('DD.MM.YY'),
			updatedTime: moment(user.user.updatedAt).format('HH:mm'),
		};
	} else {
		return {
			user: user.user || null,
			createdDate: '',
			createdTime: '',
			updatedDate: '',
			updatedTime: '',
		};
	}
};

const initialState: AuthSliceState = {
	...getUserData(),
	isLogged: Object.keys(user).length !== 0,
	registerModalStatus: false,
	loginModalStatus: false,
	requestError: '',
	isLoading: false,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout(state) {
			state.isLogged = false;
			localStorage.removeItem('user');
			localStorage.removeItem('cart');
			localStorage.removeItem('notification');
			localStorage.removeItem('feedbacks');
			window.location.reload();
		},
		setRegisterModalStatus(state, action) {
			state.registerModalStatus = action.payload;
		},
		setLoginModalStatus(state, action) {
			state.loginModalStatus = action.payload;
		},
		setRequestError(state, action) {
			state.requestError = action.payload;
		},
	},
	extraReducers: builder => {
		builder.addCase(getUser.fulfilled, (state, action) => {
			state.user = action.payload;
		});

		builder.addMatcher(
			userApi.endpoints.loginUser.matchFulfilled,
			(state, action) => {
				// state.user = action.payload;
				state.isLogged = true;
				console.log(' action payload login user ', action.payload);
			}
		);
	},
});

export const {
	logout,
	setRegisterModalStatus,
	setLoginModalStatus,
	setRequestError,
} = authSlice.actions;

export default authSlice.reducer;

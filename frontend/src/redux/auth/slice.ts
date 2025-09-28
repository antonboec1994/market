import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { getUserFromLs } from '@/utils/authLS/getUserFromLS';
import type { AuthSliceState, UserData } from './types';
import { userApi } from './api';

const storedUser = getUserFromLs();

const initialState: AuthSliceState = {
	userData: storedUser,
	isLogged: !!storedUser,
	registerModalStatus: false,
	loginModalStatus: false,
	requestError: '',
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout(state) {
			state.isLogged = false;
			state.userData = null;
			localStorage.removeItem('userData');
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
		builder.addMatcher(
			userApi.endpoints.loginUser.matchFulfilled,
			(state, action: PayloadAction<UserData>) => {
				state.userData = action.payload;
				state.isLogged = true;
			}
		);
		builder.addMatcher(
			userApi.endpoints.updateUser.matchFulfilled,
			(state, action) => {
				state.userData = action.payload;
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

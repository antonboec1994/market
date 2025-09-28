import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import authSlice from './auth/slice';
import cartSlice from './cart/slice';
import filtersSlice from './filters/slice';
import getFeedbacksSlice from './getFeedbacks/slice';
import notificationSlice from './notification/slice';
import { getProductsApi } from './getProducts/api';
import { getShowroomApi } from './getShowroom/api';
import { getGraphicsApi } from './getGraphics/api';
import { getBlogApi } from './getBlog/api';
import { userApi } from './auth/api';
import { cartApi } from './cart/api';
import { feedbacksApi } from './getFeedbacks/api';

export const store = configureStore({
	reducer: {
		cart: cartSlice,
		filters: filtersSlice,
		feedbacks: getFeedbacksSlice,
		auth: authSlice,
		notification: notificationSlice,
		[getProductsApi.reducerPath]: getProductsApi.reducer,
		[getShowroomApi.reducerPath]: getShowroomApi.reducer,
		[getGraphicsApi.reducerPath]: getGraphicsApi.reducer,
		[getBlogApi.reducerPath]: getBlogApi.reducer,
		[userApi.reducerPath]: userApi.reducer,
		[cartApi.reducerPath]: cartApi.reducer,
		[feedbacksApi.reducerPath]: feedbacksApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat([
			getProductsApi.middleware,
			getShowroomApi.middleware,
			getGraphicsApi.middleware,
			getBlogApi.middleware,
			userApi.middleware,
			cartApi.middleware,
			feedbacksApi.middleware,
		]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

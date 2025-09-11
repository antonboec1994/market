import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import authSlice from './auth/slice';
import cartSlice from './cart/slice';
import filtersSlice from './filters/slice';
import getBlogSlice from './getBlog/slice';
import getFeedbacksSlice from './getFeedbacks/slice';
import getGraphicsSlice from './getGraphics/slice';
import notificationSlice from './notification/slice';
import { getProductsApi } from './getProducts/api';
import { getShowroomApi } from './getShowroom/api';

export const store = configureStore({
	reducer: {
		cart: cartSlice,
		filters: filtersSlice,
		feedbacks: getFeedbacksSlice,
		blog: getBlogSlice,
		auth: authSlice,
		graphics: getGraphicsSlice,
		notification: notificationSlice,
		[getProductsApi.reducerPath]: getProductsApi.reducer,
		[getShowroomApi.reducerPath]: getShowroomApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat([
			getProductsApi.middleware,
			getShowroomApi.middleware,
		]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts, fetchProductsByFilter } from './thunks';
import { Status, type GetProductsSliceState } from './types';

const initialState: GetProductsSliceState = {
	productsCount: 0,
	products: [],
	productsAll: [],
	status: Status.LOADING,
	statusAll: Status.LOADING,
};

const getProductsSlice = createSlice({
	name: 'Products',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(fetchProducts.pending, state => {
			state.statusAll = Status.LOADING;
			state.productsAll = [];
		});
		builder.addCase(fetchProducts.fulfilled, (state, action) => {
			state.statusAll = Status.SUCCESS;
			state.productsAll = action.payload;
		});
		builder.addCase(fetchProducts.rejected, state => {
			state.statusAll = Status.ERROR;
			state.productsAll = [];
		});

		builder.addCase(fetchProductsByFilter.pending, state => {
			state.status = Status.LOADING;
			state.products = [];
		});
		builder.addCase(fetchProductsByFilter.fulfilled, (state, action) => {
			state.status = Status.SUCCESS;
			state.products = action.payload.data.items;
			state.productsCount = action.payload.data.headersCount;
		});
		builder.addCase(fetchProductsByFilter.rejected, state => {
			state.status = Status.ERROR;
			state.products = [];
		});
	},
});

export default getProductsSlice.reducer;

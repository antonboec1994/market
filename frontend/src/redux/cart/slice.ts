import { createSlice } from '@reduxjs/toolkit';
import { calcTotalCount, calcTotalPrice } from '@/utils/calcCart';
import { getCartFromLS } from '@/utils/cartLS/getCartFromLS';
import { fetchGetCart } from './thunks';
import { Status } from '../getProducts/types';
import type { CartSliceState } from './types';

const { productsInCartFromLS } = getCartFromLS();

const initialState: CartSliceState = {
	productsInCart: productsInCartFromLS,
	totalCountInCart: calcTotalCount(productsInCartFromLS),
	totalPriceInCart: calcTotalPrice(productsInCartFromLS),
	totalSalePriceInCart: calcTotalPrice(productsInCartFromLS),
	statusInCart: Status.LOADING,
	cartModalStatus: false,
	orderModalStatus: false,
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		setCartModalStatus(state, action) {
			state.cartModalStatus = action.payload;
		},
		setOrderModalStatus(state, action) {
			state.orderModalStatus = action.payload;
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchGetCart.pending, state => {
			state.statusInCart = Status.LOADING;
		});
		builder.addCase(fetchGetCart.fulfilled, (state, action) => {
			state.statusInCart = Status.SUCCESS;
			state.productsInCart = action.payload.data.cart;
		});
		builder.addCase(fetchGetCart.rejected, state => {
			state.statusInCart = Status.ERROR;
		});
	},
});

export const { setCartModalStatus, setOrderModalStatus } = cartSlice.actions;

export default cartSlice.reducer;

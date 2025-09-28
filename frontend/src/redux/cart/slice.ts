import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { calcTotalCount, calcTotalPrice } from '@/utils/calcCart';
import { getCartFromLS } from '@/utils/cartLS/getCartFromLS';
import type { CartData, CartSliceState } from './types';
import { cartApi } from './api';

const storedCart = getCartFromLS();

const initialState: CartSliceState = {
	productsInCart: storedCart.cart,
	totalCountInCart: calcTotalCount(storedCart.cart),
	totalPriceInCart: calcTotalPrice(storedCart.cart),
	totalSalePriceInCart: calcTotalPrice(storedCart.cart),
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
		builder.addMatcher(
			cartApi.endpoints.getCart.matchFulfilled,
			(state, action: PayloadAction<CartData>) => {
				state.productsInCart = action.payload.cart;
			}
		);
	},
});

export const { setCartModalStatus, setOrderModalStatus } = cartSlice.actions;

export default cartSlice.reducer;

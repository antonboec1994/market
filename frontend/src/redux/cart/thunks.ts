import { createAsyncThunk } from '@reduxjs/toolkit';
import { instanceCart } from '@/utils/axios';
import type { CardTypeInCart } from './types';

export const addToCart = createAsyncThunk(
	'cart/add',
	async (data: CardTypeInCart, { rejectWithValue }) => {
		try {
			const cart = await instanceCart.post(`/add`, data);
			return cart;
		} catch (error: any) {
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);

export const plusToCart = createAsyncThunk(
	'cart/plus',
	async (data: CardTypeInCart, { rejectWithValue }) => {
		try {
			const cart = await instanceCart.post(`/plus`, data);
			return cart;
		} catch (error: any) {
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);

export const minusTocart = createAsyncThunk(
	'cart/minus',
	async (data: CardTypeInCart, { rejectWithValue }) => {
		try {
			const cart = await instanceCart.post(`/minus`, data);
			return cart;
		} catch (error: any) {
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);

export const deleteFromCart = createAsyncThunk(
	'cart/delete',
	async (productId: any, { rejectWithValue }) => {
		try {
			const cart = await instanceCart.delete(`/delete?productId=` + productId);
			return cart;
		} catch (error: any) {
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);

export const clearCart = createAsyncThunk(
	'cart/clear',
	async (_, { rejectWithValue }) => {
		try {
			const cart = await instanceCart.delete('/clear');
			return cart;
		} catch (error: any) {
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);

export const fetchGetCart = createAsyncThunk(
	'cart/get',
	async (_, { rejectWithValue }) => {
		try {
			const cart = await instanceCart.get('/get');
			const jsonCart = JSON.stringify(cart.data.cart);
			localStorage.setItem('cart', jsonCart);
			return cart;
		} catch (error: any) {
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);

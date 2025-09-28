import { API_URL } from '@/consts/apiUrl';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import type { CartData, CartErrorResponse, ProductInCart } from './types';

export const cartApi = createApi({
	reducerPath: 'cartApi',
	baseQuery: fetchBaseQuery({
		baseUrl: API_URL,
		prepareHeaders: headers => {
			const userData = localStorage.getItem('userData');
			const token = userData ? JSON.parse(userData)?.access_token : null;
			token && headers.set('Authorization', `Bearer ${token}`);
			return headers;
		},
	}),
	tagTypes: ['Cart'],
	endpoints: build => ({
		getCart: build.query<CartData, void>({
			query: () => ({
				url: `/cart`,
				method: 'GET',
			}),
			transformErrorResponse: (response: CartErrorResponse) => ({
				status: response.status,
				message:
					response.data.message ||
					'Произошла ошибка при загрузке данных корзины',
			}),
			providesTags: ['Cart'],
			async onQueryStarted(_, { queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					localStorage.setItem('cart', JSON.stringify(data));
				} catch (error) {}
			},
		}),

		addToCart: build.mutation<CartData, ProductInCart>({
			query: product => ({
				url: `/cart`,
				method: 'POST',
				body: product,
			}),
			transformErrorResponse: (response: CartErrorResponse) => ({
				status: response.data,
				message:
					response.data.message ||
					'Произошла ошибка при добавлении товара в корзину',
			}),
			invalidatesTags: ['Cart'],
		}),

		updateCount: build.mutation<CartData, { id: number; count: number }>({
			query: ({ id, count }) => ({
				url: `/cart/${id}`,
				method: 'PATCH',
				body: { count },
			}),
			transformErrorResponse: (response: CartErrorResponse) => ({
				status: response.data,
				message:
					response.data.message ||
					'Произошла ошибка при изменении количества товара в корзине',
			}),
			invalidatesTags: ['Cart'],
			async onQueryStarted(_, { queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					localStorage.setItem('cart', JSON.stringify(data));
				} catch (error) {}
			},
		}),

		deleteProduct: build.mutation<void, { id: number }>({
			query: ({ id }) => ({
				url: `/cart/${id}`,
				method: 'DELETE',
			}),
			transformErrorResponse: (response: CartErrorResponse) => ({
				status: response.data,
				message:
					response.data.message ||
					'Произошла ошибка при удалении товара из корзины',
			}),
			invalidatesTags: ['Cart'],
		}),

		clearCart: build.mutation<void, void>({
			query: () => ({
				url: `/cart`,
				method: 'DELETE',
			}),
			transformErrorResponse: (response: CartErrorResponse) => ({
				status: response.data,
				message:
					response.data.message || 'Произошла ошибка при очистке корзины',
			}),
			invalidatesTags: ['Cart'],
		}),
	}),
});

export const {
	useGetCartQuery,
	useAddToCartMutation,
	useUpdateCountMutation,
	useDeleteProductMutation,
	useClearCartMutation,
} = cartApi;

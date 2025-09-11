import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
	FetchProductsArgs,
	ProductsErrorResponse,
	ProductsFilteredResponse,
	ProductType,
} from './types';
import { API_URL } from '@/consts/apiUrl';
import { filtersSlice } from '../filters/slice';

export const getProductsApi = createApi({
	reducerPath: 'productsApi',
	baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
	tagTypes: ['Products'],
	endpoints: build => ({
		getProducts: build.query<ProductType[], void>({
			query: () => `/products/getAll`,
			transformErrorResponse: (response: ProductsErrorResponse) => ({
				status: response.status,
				message:
					response.data.message || 'Произошла ошибка при загрузке данных',
			}),
			keepUnusedDataFor: 600,
		}),

		getProductsByFilter: build.query<
			ProductsFilteredResponse,
			FetchProductsArgs
		>({
			query: params => {
				const hasValue = (val: any) => val !== undefined && val !== null;
				const {
					activeCategory,
					currentPage,
					activeShow,
					activeSort,
					activeColor,
					activeRating,
					priceMinMax,
				} = params;
				const queryParams = [];
				if (hasValue(activeCategory))
					queryParams.push(`category=${activeCategory}`);
				if (hasValue(currentPage)) queryParams.push(`_page=${currentPage}`);
				if (hasValue(activeShow)) queryParams.push(`_limit=${activeShow}`);
				if (hasValue(activeSort)) {
					queryParams.push(`_sort=${activeSort?.value}`);
					const order = activeSort?.value.includes('salePrice')
						? 'asc'
						: 'desc';
					queryParams.push(`_order=${order}`);
				}
				if (hasValue(activeColor)) queryParams.push(`color=${activeColor}`);
				if (hasValue(activeRating))
					queryParams.push(`rating_gte=${activeRating}`);
				if (priceMinMax) {
					queryParams.push(`salePrice_gte=${priceMinMax[0]}`);
					queryParams.push(`salePrice_lte=${priceMinMax[1]}`);
				}
				const queryString =
					queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
				return `/products/get${queryString}`;
			},
			transformErrorResponse: (response: ProductsErrorResponse) => ({
				status: response.status,
				message:
					response.data.message || 'Произошла ошибка при фильтрации данных',
			}),
			onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
				try {
					const { data } = await queryFulfilled;
					dispatch(filtersSlice.actions.setProductsCount(data.headersCount));
				} catch (error) {
					console.error('Ошибка при получении headersCount', error);
				}
			},
			keepUnusedDataFor: 600,
		}),
	}),
});

export const { useGetProductsQuery, useGetProductsByFilterQuery } =
	getProductsApi;

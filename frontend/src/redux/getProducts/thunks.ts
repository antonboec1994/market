import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '@/utils/axios';
import type { FetchProductsArgs } from './types';

export const fetchProducts = createAsyncThunk('products', async () => {
	const { data } = await instance.get(`/products/getAll`);
	return data;
});

export const fetchProductsByFilter = createAsyncThunk(
	'productsByFilter',
	async (params: FetchProductsArgs) => {
		const hasValue = (val: any) => val !== undefined && val !== null;

		const category = hasValue(params.activeCategory)
			? `category=${params.activeCategory}`
			: '';

		const page = hasValue(params.currentPage)
			? `&_page=${params.currentPage}`
			: '';

		const limit = hasValue(params.activeShow)
			? `&_limit=${params.activeShow}`
			: '';

		const sortBy = hasValue(params.activeSort?.value)
			? `&_sort=${params.activeSort!.value}`
			: '';

		const order = hasValue(params.activeSort?.value)
			? `&_order=${
					params.activeSort!.value.includes('salePrice') ? 'asc' : 'desc'
			  }`
			: '';

		const color = hasValue(params.activeColor)
			? `&color=${params.activeColor}`
			: '';

		const rating = hasValue(params.activeRating)
			? `&rating_gte=${params.activeRating}`
			: '';

		const priceMin = params.priceMinMax
			? `&salePrice_gte=${params.priceMinMax[0]}`
			: '';
		const priceMax = params.priceMinMax
			? `&salePrice_lte=${params.priceMinMax[1]}`
			: '';

		const axiosUrl = `/products/get?${[
			category,
			page,
			limit,
			sortBy,
			order,
			color,
			rating,
			priceMin,
			priceMax,
		]
			.filter(Boolean)
			.join('')}`;

		const { data } = await instance.get(axiosUrl);
		return {
			data,
		};
	}
);

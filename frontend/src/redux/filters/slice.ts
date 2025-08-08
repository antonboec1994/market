import { createSlice } from '@reduxjs/toolkit';
import { defaultPriceMax, defaultPriceMin, menuList, sortList } from './consts';
import type { FiltersSliceState } from './types';

const initialState: FiltersSliceState = {
	activeCategory: '',
	activeRating: 0,
	activeColor: '',
	priceMinMax: [defaultPriceMin, defaultPriceMax],
	activeSort: {
		name: 'Цена: сначала недорогие',
		value: 'salePrice',
	},
	activeShow: 6,
	filterResults: {
		activeShow: '6',
		activeSort: 'Цена: сначала недорогие',
	},
	currentPage: 1,
	searchValue: '',
	searchModal: false,
	menuUrlValue: menuList[0],
};

export const filtersSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setActiveCategory(state, action) {
			state.activeCategory = action.payload;
		},
		setActiveRating(state, action) {
			state.activeRating = action.payload;
		},
		setActiveColor(state, action) {
			state.activeColor = action.payload;
		},
		setPriceMinMax(state, action) {
			state.priceMinMax = action.payload;
		},
		setActiveSort(state, action) {
			state.activeSort = action.payload;
		},
		setActiveShow(state, action) {
			state.activeShow = action.payload;
		},
		setFilterResults(state, action) {
			state.filterResults = action.payload;
		},
		setCurrentPage(state, action) {
			state.currentPage = action.payload;
		},
		setFilterUrl(state, action) {
			const payload = action.payload;

			if (payload.category !== undefined)
				state.activeCategory = payload.category;
			if (payload._page !== undefined) state.currentPage = payload._page;
			if (payload._limit !== undefined) state.activeShow = payload._limit;

			if (payload.color !== undefined) state.activeColor = payload.color;
			if (payload.rating_gte !== undefined)
				state.activeRating = payload.rating_gte;

			if (
				payload.salePrice_gte !== undefined ||
				payload.salePrice_lte !== undefined
			) {
				state.priceMinMax = [
					payload.salePrice_gte ?? defaultPriceMin,
					payload.salePrice_lte ?? defaultPriceMax,
				];
			}

			if (payload._sort !== undefined) {
				const found = sortList.find(item => item.value === payload._sort);
				if (found) {
					state.activeSort = { name: found.name, value: found.value };
				}
			}
		},
		setSearchValue(state, action) {
			state.searchValue = action.payload;
		},
		setSearchModal(state, action) {
			state.searchModal = action.payload;
		},
		setMenuUrlValue(state, action) {
			state.menuUrlValue = action.payload;
		},
	},
});

export const {
	setActiveCategory,
	setPriceMinMax,
	setActiveRating,
	setActiveSort,
	setActiveShow,
	setFilterResults,
	setCurrentPage,
	setActiveColor,
	setFilterUrl,
	setSearchValue,
	setSearchModal,
	setMenuUrlValue,
} = filtersSlice.actions;

export default filtersSlice.reducer;

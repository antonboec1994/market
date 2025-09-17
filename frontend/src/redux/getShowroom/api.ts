import { API_URL } from '@/consts/apiUrl';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ShowroomErrorResponse, ShowroomType } from './types';

export const getShowroomApi = createApi({
	reducerPath: 'showroomApi',
	baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
	tagTypes: ['Showroom'],
	endpoints: build => ({
		getShowroom: build.query<ShowroomType[], void>({
			query: () => `/showroom/get`,
			transformErrorResponse: (response: ShowroomErrorResponse) => ({
				status: response.data,
				message:
					response.data.message ||
					'Произошла ошибка при загрузке данных шоуроум',
			}),
			providesTags: ['Showroom'],
			keepUnusedDataFor: 600,
		}),
	}),
});

export const { useGetShowroomQuery } = getShowroomApi;

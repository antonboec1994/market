import { API_URL } from '@/consts/apiUrl';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import type { BlogErrorResponse, PostType } from './types';

export const getBlogApi = createApi({
	reducerPath: 'blogApi',
	baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
	tagTypes: ['Blog'],
	endpoints: build => ({
		getBlog: build.query<PostType[], void>({
			query: () => `/blog`,
			transformErrorResponse: (response: BlogErrorResponse) => ({
				status: response.data,
				message:
					response.data.message || 'Произошла ошибка при загрузке данных блога',
			}),
			providesTags: ['Blog'],
			keepUnusedDataFor: 600,
		}),
	}),
});

export const { useGetBlogQuery } = getBlogApi;

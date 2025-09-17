import { API_URL } from '@/consts/apiUrl';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { GraphicsErrorResponse, GraphicType } from './types';

export const getGraphicsApi = createApi({
	reducerPath: 'graphicsApi',
	baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
	tagTypes: ['Graphics'],
	endpoints: build => ({
		getGraphics: build.query<GraphicType[], void>({
			query: () => `/graphics/get`,
			transformErrorResponse: (response: GraphicsErrorResponse) => ({
				status: response.data,
				message:
					response.data.message ||
					'Произошла ошибка при загрузке данных графиков',
			}),
			providesTags: ['Graphics'],
			keepUnusedDataFor: 600,
		}),
	}),
});

export const { useGetGraphicsQuery } = getGraphicsApi;

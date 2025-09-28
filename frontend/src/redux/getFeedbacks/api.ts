import { API_URL } from '@/consts/apiUrl';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import type {
	FeedbacksData,
	FeedbacksErrorResponse,
	FeedbackType,
} from './types';

export const feedbacksApi = createApi({
	reducerPath: 'feedbacksApi',
	baseQuery: fetchBaseQuery({
		baseUrl: API_URL,
		prepareHeaders: headers => {
			const userData = localStorage.getItem('userData');
			const token = userData ? JSON.parse(userData)?.access_token : null;
			token && headers.set('Authorization', `Bearer ${token}`);
			return headers;
		},
	}),
	tagTypes: ['Feedbacks'],
	endpoints: build => ({
		getFeedbacks: build.query<FeedbacksData, { userId?: number }>({
			query: ({ userId }) => {
				const params = new URLSearchParams();
				if (userId) params.append('userId', String(userId));
				return {
					url: `/feedbacks`,
					method: 'GET',
				};
			},
			transformErrorResponse: (response: FeedbacksErrorResponse) => ({
				status: response.status,
				message:
					response.data.message ||
					'Произошла ошибка при загрузке данных отзывы',
			}),
			providesTags: ['Feedbacks'],
		}),

		addFeedback: build.mutation<FeedbacksData, FeedbackType>({
			query: feedback => ({
				url: `/feedbacks`,
				method: 'POST',
				body: feedback,
			}),
			transformErrorResponse: (response: FeedbacksErrorResponse) => ({
				status: response.status,
				message:
					response.data.message ||
					'Произошла ошибка при добавлении нового отзыва',
			}),
			invalidatesTags: ['Feedbacks'],
		}),

		deleteFeedback: build.mutation<void, { id: number }>({
			query: ({ id }) => ({
				url: `/feedbacks/${id}`,
				method: 'DELETE',
			}),
			transformErrorResponse: (response: FeedbacksErrorResponse) => ({
				status: response.status,
				message:
					response.data.message || 'Произошла ошибка при удалении отзыва',
			}),
			invalidatesTags: ['Feedbacks'],
		}),
	}),
});

export const {
	useGetFeedbacksQuery,
	useAddFeedbackMutation,
	useDeleteFeedbackMutation,
} = feedbacksApi;

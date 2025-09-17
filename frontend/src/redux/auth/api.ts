import { API_URL } from '@/consts/apiUrl';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import type {
	ILoginData,
	IRegisterData,
	User,
	UserErrorResponse,
} from './types';

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: fetchBaseQuery({
		baseUrl: API_URL,
		prepareHeaders: (headers, { getState }) => {
			const user = localStorage.getItem('user');
			const token = user ? JSON.parse(user)?.access_token : '';
			token && headers.set('Authorization', `Bearer ${token}`);
			return headers;
		},
	}),
	tagTypes: ['User'],
	endpoints: build => ({
		registerUser: build.mutation<User, IRegisterData>({
			query: newUser => ({
				url: `/users/register`,
				method: 'POST',
				body: newUser,
			}),
			transformErrorResponse: (response: UserErrorResponse) => ({
				status: response.data,
				message:
					response.data.message ||
					'Произошла ошибка при регистрации нового пользователя',
			}),
			invalidatesTags: ['User'],
		}),

		loginUser: build.mutation<User, ILoginData>({
			query: userData => ({
				url: `/users/login`,
				method: 'POST',
				body: userData,
			}),
			transformErrorResponse: (response: UserErrorResponse) => ({
				status: response.data,
				message:
					response.data.message || 'Произошла ошибка при логине пользователя',
			}),
			invalidatesTags: ['User'],
			async onQueryStarted(_, { queryFulfilled }) {
				try {
					const { data: user } = await queryFulfilled;
					localStorage.setItem('user', JSON.stringify(user));
				} catch (error) {}
			},
		}),
	}),
});

export const { useRegisterUserMutation, useLoginUserMutation } = userApi;

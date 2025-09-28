import { API_URL } from '@/consts/apiUrl';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import type {
	ILoginData,
	IRegisterData,
	IUpdateUserData,
	IUpdateUserPassword,
	UserData,
	UserErrorResponse,
} from './types';
import { cartApi } from '../cart/api';

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: fetchBaseQuery({
		baseUrl: API_URL,
		prepareHeaders: headers => {
			const userData = localStorage.getItem('userData');
			const token = userData ? JSON.parse(userData)?.access_token : null;
			token && headers.set('Authorization', `Bearer ${token}`);
			return headers;
		},
	}),
	tagTypes: ['User'],
	endpoints: build => ({
		registerUser: build.mutation<UserData, IRegisterData>({
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

		loginUser: build.mutation<UserData, ILoginData>({
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
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					const { data: userData } = await queryFulfilled;
					localStorage.setItem('userData', JSON.stringify(userData));
					dispatch(cartApi.endpoints.getCart.initiate());
				} catch (error) {}
			},
		}),

		updateUser: build.mutation<
			UserData,
			{ id: number; updatedUserData: IUpdateUserData }
		>({
			query: ({ id, updatedUserData }) => ({
				url: `/users/${id}`,
				method: 'PATCH',
				body: updatedUserData,
			}),
			transformErrorResponse: (response: UserErrorResponse) => ({
				status: response.data,
				message:
					response.data.message ||
					'Произошла ошибка при обновлении данных пользователя',
			}),
			invalidatesTags: ['User'],
			async onQueryStarted(_, { queryFulfilled }) {
				try {
					const { data: updatedUserData } = await queryFulfilled;
					localStorage.setItem('userData', JSON.stringify(updatedUserData));
				} catch (error) {}
			},
		}),

		updatePassword: build.mutation<
			void,
			{ id: number; updatedPassword: IUpdateUserPassword }
		>({
			query: ({ id, updatedPassword }) => ({
				url: `/users/${id}/password`,
				method: 'PATCH',
				body: updatedPassword,
			}),
			transformErrorResponse: (response: UserErrorResponse) => ({
				status: response.data,
				message:
					response.data.message ||
					'Произошла ошибка при обновлении пароля пользователя',
			}),
			invalidatesTags: ['User'],
		}),

		deleteAccount: build.mutation<void, number>({
			query: id => ({
				url: `/users/${id}`,
				method: 'DELETE',
			}),
			transformErrorResponse: (response: UserErrorResponse) => ({
				status: response.data,
				message:
					response.data.message ||
					'Произошла ошибка при обновлении пароля пользователя',
			}),
			invalidatesTags: ['User'],
		}),
	}),
});

export const {
	useRegisterUserMutation,
	useLoginUserMutation,
	useUpdateUserMutation,
	useUpdatePasswordMutation,
	useDeleteAccountMutation,
} = userApi;

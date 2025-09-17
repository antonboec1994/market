import { createAsyncThunk } from '@reduxjs/toolkit';
import { instanceUsers } from '@/utils/axios';

export const getUser = createAsyncThunk(
	'auth/get',
	async (email: string, { rejectWithValue }) => {
		try {
			const user = await instanceUsers.post('/get', email);
			return user.data;
		} catch (error: any) {
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);

export const updateUser = createAsyncThunk(
	'auth/updateUser',
	async (data: any, { rejectWithValue }) => {
		try {
			const user = await instanceUsers.patch('/updateUser', data);
			return user.data;
		} catch (error: any) {
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);

export const updateUserPassword = createAsyncThunk(
	'auth/updatePassword',
	async (data: any, { rejectWithValue }) => {
		try {
			return await instanceUsers.patch('/updatePassword', data);
		} catch (error: any) {
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);

export const deleteAccount = createAsyncThunk(
	'auth/delete',
	async (_, { rejectWithValue }) => {
		try {
			return instanceUsers.delete('/delete');
		} catch (error: any) {
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);

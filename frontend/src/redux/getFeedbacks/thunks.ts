import { createAsyncThunk } from '@reduxjs/toolkit';
import { instanceFeedbacks } from '@/utils/axios';
import type { FeedbacksType } from './types';

export const fetchFeedbacksAll = createAsyncThunk(
	'feedbacks/getAll',
	async (_, { rejectWithValue }) => {
		try {
			const res = await instanceFeedbacks.get('/getAll');
			return res.data;
		} catch (error: any) {
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);

export const fetchFeedbacks = createAsyncThunk(
	'feedbacks/get',
	async (_, { rejectWithValue }) => {
		try {
			const res = await instanceFeedbacks.get('/get');
			return res.data;
		} catch (error: any) {
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);

export const addFeedback = createAsyncThunk(
	'feedbacks/add',
	async (feedback: FeedbacksType, { rejectWithValue }) => {
		try {
			const res = await instanceFeedbacks.post('/add', feedback);
			return res;
		} catch (error: any) {
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);

export const deleteFeedback = createAsyncThunk(
	'feedback/delete',
	async (feedbackId: any, { rejectWithValue }) => {
		try {
			const res = await instanceFeedbacks.delete(
				'/delete?feedbackId=' + feedbackId
			);
			return res;
		} catch (error: any) {
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);

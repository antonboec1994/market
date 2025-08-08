import { createSlice } from '@reduxjs/toolkit';
import { fetchFeedbacks, fetchFeedbacksAll } from './thunks';
import type { FeedbacksSliceState } from './types';
import { Status } from '../getProducts/types';

const initialState: FeedbacksSliceState = {
	feedbacks: [],
	feedbacksCount: 0,
	feedbackRating: 5,
	status: Status.LOADING,
	feedbacksAll: [],
	statusAll: Status.LOADING,
};

const getFeedbacksSlice = createSlice({
	name: 'feedbacks',
	initialState,
	reducers: {
		setRating(state, action) {
			state.feedbackRating = action.payload;
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchFeedbacks.pending, state => {
			state.status = Status.LOADING;
			state.feedbacks = [];
		});
		builder.addCase(fetchFeedbacks.fulfilled, (state, action) => {
			state.status = Status.SUCCESS;
			state.feedbacks = action.payload.data.feedbacks;
		});
		builder.addCase(fetchFeedbacks.rejected, state => {
			state.status = Status.ERROR;
			state.feedbacks = [];
		});

		builder.addCase(fetchFeedbacksAll.pending, state => {
			state.statusAll = Status.LOADING;
		});
		builder.addCase(fetchFeedbacksAll.fulfilled, (state, action) => {
			state.statusAll = Status.SUCCESS;
			state.feedbacksAll = action.payload.data.feedbacks;
		});
		builder.addCase(fetchFeedbacksAll.rejected, state => {
			state.statusAll = Status.ERROR;
		});
	},
});

export const { setRating } = getFeedbacksSlice.actions;

export default getFeedbacksSlice.reducer;

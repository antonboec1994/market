import { createSlice } from '@reduxjs/toolkit';
import type { FeedbacksSliceState } from './types';

const initialState: FeedbacksSliceState = {
	feedbacks: [],
	feedbacksCount: 0,
	feedbackRating: 5,
};

const getFeedbacksSlice = createSlice({
	name: 'feedbacks',
	initialState,
	reducers: {
		setRating(state, action) {
			state.feedbackRating = action.payload;
		},
	},
});

export const { setRating } = getFeedbacksSlice.actions;

export default getFeedbacksSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { fetchShowroom } from './thunks';
import type { ShowroomSliceState } from './types';
import { Status } from '../getProducts/types';

const initialState: ShowroomSliceState = {
	items: [],
	status: Status.LOADING,
};

const getShowroomSlice = createSlice({
	name: 'showroom',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(fetchShowroom.pending, state => {
			state.status = Status.LOADING;
			state.items = [];
		});
		builder.addCase(fetchShowroom.fulfilled, (state, action) => {
			state.status = Status.SUCCESS;
			state.items = action.payload.data;
		});
		builder.addCase(fetchShowroom.rejected, state => {
			state.status = Status.ERROR;
			state.items = [];
		});
	},
});

export default getShowroomSlice.reducer;

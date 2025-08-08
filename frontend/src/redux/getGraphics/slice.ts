import { createSlice } from '@reduxjs/toolkit';
import { fetchGraphics } from './thunks';
import type { getGraphicsSliceState } from './types';
import { Status } from '../getProducts/types';

const initialState: getGraphicsSliceState = {
	status: Status.LOADING,
	favorites: [],
};

export const getGraphicsSlice = createSlice({
	name: 'getGraphics',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(fetchGraphics.pending, state => {
			state.status = Status.LOADING;
		});
		builder.addCase(fetchGraphics.fulfilled, (state, action) => {
			state.favorites = action.payload;
			state.status = Status.SUCCESS;
		});
		builder.addCase(fetchGraphics.rejected, state => {
			state.status = Status.ERROR;
		});
	},
});

export default getGraphicsSlice.reducer;

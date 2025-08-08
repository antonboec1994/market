import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '@/utils/axios';

export const fetchShowroom = createAsyncThunk(
	'cards/fetchShowroomStatus',
	async () => {
		const { data } = await instance.get(`/showroom/get`);
		return { data };
	}
);

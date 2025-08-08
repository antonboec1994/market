import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '@/utils/axios';

export const fetchBlog = createAsyncThunk('blog', async () => {
	const { data } = await instance.get(`/blog/get`);
	return { data };
});

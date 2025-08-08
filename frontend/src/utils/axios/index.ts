import axios from 'axios';

const isProduction = import.meta.env.MODE === 'production';

// В продакшене: baseURL = "/" → запросы идут на http://ваш-сайт:84/users/register
// В разработке: baseURL = "http://localhost:5004" → запросы идут на http://localhost:5004/users/register

const API_URL = isProduction
	? import.meta.env.VITE_API_URL
	: import.meta.env.VITE_SERVER_URL;

console.log('isProduction ', isProduction);
console.log('API_URL ', API_URL);

export const instance = axios.create({
	baseURL: API_URL,
	timeout: 1000,
	headers: { 'X-Custom-Header': 'foobar' },
});

export const instanceCart = axios.create({
	baseURL: `${API_URL}/cart`,
});
instanceCart.interceptors.request.use(config => {
	const user = localStorage.getItem('user');
	const token = user ? JSON.parse(user)?.access_token : '';
	config.headers.Authorization = `Bearer ${token}`;
	return config;
});

export const instanceUsers = axios.create({
	baseURL: `${API_URL}/users`,
});
instanceUsers.interceptors.request.use(config => {
	const user = localStorage.getItem('user');
	const token = user ? JSON.parse(user)?.access_token : '';
	config.headers.Authorization = `Bearer ${token}`;
	return config;
});

export const instanceFeedbacks = axios.create({
	baseURL: `${API_URL}/feedbacks`,
});
instanceFeedbacks.interceptors.request.use(config => {
	const user = localStorage.getItem('user');
	const token = user ? JSON.parse(user)?.access_token : '';
	config.headers.Authorization = `Bearer ${token}`;
	return config;
});

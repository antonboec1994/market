const isProduction = import.meta.env.MODE === 'production';

// В продакшене: baseURL = "/" → запросы идут на http://ваш-сайт:84/users/register
// В разработке: baseURL = "http://localhost:5004" → запросы идут на http://localhost:5004/users/register

export const API_URL = isProduction
	? import.meta.env.VITE_API_URL
	: import.meta.env.VITE_SERVER_URL;

console.log('isProduction ', isProduction);
console.log('API_URL ', API_URL);

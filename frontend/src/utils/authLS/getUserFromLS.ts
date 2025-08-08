import type { User } from '@/redux/auth/types';

export const getUserFromLs = () => {
	const userData = localStorage.getItem('user');
	const user: User = userData ? JSON.parse(userData) : {};
	return { user };
};

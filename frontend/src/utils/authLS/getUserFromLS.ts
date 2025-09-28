import type { UserData } from '@/redux/auth/types';

export const getUserFromLs = (): UserData | null => {
	try {
		const userData = localStorage.getItem('userData');
		return userData ? JSON.parse(userData) : null;
	} catch (error) {
		console.warn('Ошибка при загрузке из localStorage', error);
		return null;
	}
};

import type { FeedbacksType } from '../getFeedbacks/types';

export type User = {
	user: any;
	id: number;
	name: string;
	login: string;
	email: string;
	createdAt: string;
	updatedAt: string;
	feedback: [FeedbacksType];
	access_token?: string;
};

export interface AuthSliceState {
	user: User;
	isLogged: boolean;
	registerModalStatus: boolean;
	loginModalStatus: boolean;
	requestError: string;
	isLoading: boolean;
	createdDate: string;
	createdTime: string;
	updatedDate: string;
	updatedTime: string;
}

export interface ILoginData {
	email: string;
	password: string;
}

export interface IRegisterData {
	name: string;
	login: string;
	email: string;
	password: string;
}

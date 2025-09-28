export interface AuthSliceState {
	userData: UserData | null;
	isLogged: boolean;
	registerModalStatus: boolean;
	loginModalStatus: boolean;
	requestError: string;
}

export type UserData = {
	access_token: string;
	message: string;
	user: {
		createdAt: string;
		email: string;
		id: number;
		login: string;
		name: string;
		updatedAt: string;
	};
};

export type UserErrorResponse = {
	status: number;
	data: {
		message: string;
	};
};

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

export interface IUpdateUserData {
	email: string;
	name: string;
	login: string;
}

export interface IUpdateUserPassword {
	oldPassword: string;
	newPassword: string;
}

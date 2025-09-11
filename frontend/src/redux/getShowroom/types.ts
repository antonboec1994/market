export type ShowroomType = {
	id: number;
	name: string;
	slides: [string];
};

export interface ShowroomSliceState {
	items: ShowroomType[];
	status: string;
}

export type ShowroomErrorResponse = {
	status: number;
	data: {
		message: string;
	};
};

export type FeedbackType = {
	id?: number;
	productId: number;
	date: string;
	time: string;
	rating: number;
	userId: number;
	userEmail: string;
	userName: string;
	feedbackMessage: string;
};

export interface FeedbacksSliceState {
	feedbacks: FeedbackType[];
	feedbacksCount: number;
	feedbackRating: number;
}

export type FeedbacksData = {
	feedbacks: FeedbackType[];
	message?: string;
};

export type FeedbacksErrorResponse = {
	status: number;
	data: {
		message: string;
	};
};

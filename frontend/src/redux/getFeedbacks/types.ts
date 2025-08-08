export type FeedbacksType = {
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
	feedbacks: FeedbacksType[];
	feedbacksCount: number;
	feedbackRating: number;
	status: string;
	feedbacksAll: FeedbacksType[];
	statusAll: string;
}

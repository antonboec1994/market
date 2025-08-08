export const getFeedbacksFromProfileLS = () => {
	const data = localStorage.getItem('userfeedbacks');
	const feedbacksInProfileFromLS = data ? JSON.parse(data) : [];
	return {
		feedbacksInProfileFromLS,
	};
};

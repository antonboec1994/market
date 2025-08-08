export const normalize_count_form = (number: number) => {
	number = Math.abs(number);
	let words = [' товар', ' товара', ' товаров'];
	if (Number.isInteger(number)) {
		let options = [2, 0, 1, 1, 1, 2];
		return words[
			number % 100 > 4 && number % 100 < 20
				? 2
				: options[number % 10 < 5 ? number % 10 : 5]
		];
	}
	return words[1];
};

export const normalize_count_form_feedbacks = (number: number) => {
	number = Math.abs(number);
	let words = [' отзыв', ' отзыва', ' отзывов'];
	if (Number.isInteger(number)) {
		let options = [2, 0, 1, 1, 1, 2];
		return words[
			number % 100 > 4 && number % 100 < 20
				? 2
				: options[number % 10 < 5 ? number % 10 : 5]
		];
	}
	return words[1];
};

export let priceFormatted: string = '0';

export const formatNumber = (price: number | undefined) => {
	if (price !== undefined) {
		return (priceFormatted = price
			?.toString()
			.replace(/\B(?=(\d{3})+(?!\d))/g, ' '));
	}
};

export let localPriceFormattedMin: string = '0';
export let localPriceFormattedMax: string = '0';
export const formatPrice = (localPrice: number[]) => {
	localPriceFormattedMin = localPrice[0]
		?.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
	localPriceFormattedMax = localPrice[1]
		?.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

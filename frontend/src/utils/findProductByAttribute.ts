import type { ProductType } from '@/redux/getProducts/types';
import { store } from '@/redux/store';

export const findProductByAttribute = (value: string) => {
	const storeData = store.getState();
	const { productsAll } = storeData.products;
	const result = productsAll?.find((item: ProductType) => {
		return item[value as keyof ProductType];
	});
	return result;
};

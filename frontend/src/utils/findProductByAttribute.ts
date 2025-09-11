import { useGetProductsQuery } from '@/redux/getProducts/api';
import type { ProductType } from '@/redux/getProducts/types';

export const findProductByAttribute = (value: string) => {
	const { data: productsAll } = useGetProductsQuery();
	const result = productsAll?.find((item: ProductType) => {
		return item[value as keyof ProductType];
	});
	return result;
};

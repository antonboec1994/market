import { useGetProductsQuery } from '@/redux/getProducts/api';
import type { ProductType } from '@/redux/getProducts/types';

export const useFindProductByAttribute = (value: string) => {
	const { data } = useGetProductsQuery({});

	const productsAll = data?.items;

	return productsAll?.find((item: ProductType) => {
		return item[value as keyof ProductType];
	});
};

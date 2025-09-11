import React, { useRef } from 'react';
import styles from './News.module.scss';
import Card from '@/components/Content/Elements/Card/Card';
import Categories from '@/components/Content/Elements/Categories/Categories';
import Pagination from '@/components/Content/Elements/Pagination/Pagination';
import type { ProductType } from '@/redux/getProducts/types';
import { useGetProductsQuery } from '@/redux/getProducts/api';

const News: React.FC = () => {
	const { data: products, isLoading } = useGetProductsQuery();
	const newsRef = useRef<HTMLElement>(null);

	const executeScroll = () => newsRef?.current?.scrollIntoView();
	React.useEffect(() => {
		executeScroll();
	});

	return (
		<>
			<section className='news' ref={newsRef}>
				<div className='title_head'>
					<h2 className='title_head__title'>Каталог</h2>
					<Categories />
				</div>
				<div className={styles.news__inner}>
					{isLoading
						? 'Идёт загрузка!'
						: products?.map((product: ProductType) => (
								<Card key={product.id} product={product} />
						  ))}
				</div>
				<Pagination type='products' />
			</section>
		</>
	);
};

export default News;

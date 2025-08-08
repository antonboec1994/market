import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { SelectGetProducts } from '@/redux/getProducts/selectors';
import styles from './News.module.scss';
import Card from '@/components/Content/Elements/Card/Card';
import Categories from '@/components/Content/Elements/Categories/Categories';
import Pagination from '@/components/Content/Elements/Pagination/Pagination';
import type { ProductType } from '@/redux/getProducts/types';

const News: React.FC = () => {
	const { products, status } = useSelector(SelectGetProducts);
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
					{status === 'LOADING'
						? 'Идёт загрузка!'
						: products.map((product: ProductType) => (
								<Card key={product.id} product={product} />
						  ))}
				</div>
				<Pagination type='products' />
			</section>
		</>
	);
};

export default News;

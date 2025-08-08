import Card from '@/components/Content/Elements/Card/Card';
import Featured from '@/components/Content/Elements/Featured/Featured';
import FilterCategory from '@/components/Content/Elements/Filters/FilterCategory/FilterCategory';
import FilterColor from '@/components/Content/Elements/Filters/FilterColor/FilterColor';
import FilterPrice from '@/components/Content/Elements/Filters/FilterPrice/FilterPrice';
import FilterRating from '@/components/Content/Elements/Filters/FilterRating/FilterRating';
import FilterSortby from '@/components/Content/Elements/Filters/FilterSortby/FilterSortby';
import ResetFilters from '@/components/Content/Elements/Filters/ResetFilters/ResetFilters';
import Pagination from '@/components/Content/Elements/Pagination/Pagination';
import { SelectFilters } from '@/redux/filters/selectors';
import { setFilterResults } from '@/redux/filters/slice';
import { SelectGetProducts } from '@/redux/getProducts/selectors';
import { Status, type ProductType } from '@/redux/getProducts/types';
import { useAppDispatch } from '@/redux/store';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './Catalog.module.scss';

const Catalog = () => {
	const dispatch = useAppDispatch();
	const { products, status } = useSelector(SelectGetProducts);
	const { filterResults, activeSort, activeShow } = useSelector(SelectFilters);

	const resultCatalog = {
		activeSort: activeSort.name,
		activeShow: activeShow,
	};

	useEffect(() => {
		dispatch(setFilterResults({ ...resultCatalog }));
	}, [activeSort, activeShow, dispatch]);

	const cards =
		products.length > 0 ? (
			products.map((product: ProductType, index: number) => (
				<Card product={product} key={index} />
			))
		) : (
			<p>Товаров по заданным параметрам не найдено!</p>
		);

	return (
		<>
			<section className={styles.products}>
				<div className={styles.products__inner}>
					<div className={styles.products__content}>
						<div className={`title-head ${styles.products__title_head}`}>
							<h2
								className={` title-head__title  ${styles.products__title_head_title}`}
							>
								Каталог
							</h2>
							<FilterSortby />
						</div>
						<ul className={styles.products__title_result}>
							<li>{filterResults.activeSort}</li>
							<li>На странице: {filterResults.activeShow}</li>
						</ul>
						<div className={styles.products__content_inner}>
							{status === Status.LOADING ? <p>Идёт загрузка!</p> : cards}
						</div>
						<Pagination type='products' />
					</div>
					<div className={styles.products__aside}>
						<FilterCategory />
						<FilterPrice />
						<FilterColor />
						<FilterRating />
						<ResetFilters />
					</div>
				</div>
				<Featured />
			</section>
		</>
	);
};

export default Catalog;

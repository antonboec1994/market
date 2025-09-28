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
import {
	setActiveCategory,
	setActiveColor,
	setActiveShow,
	setCurrentPage,
	setFilterResults,
	setFilterUrl,
	setMenuUrlValue,
} from '@/redux/filters/slice';
import { type ProductType } from '@/redux/getProducts/types';
import { useAppDispatch } from '@/redux/store';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styles from './Catalog.module.scss';
import { useNavigate } from 'react-router-dom';
import { menuList } from '@/redux/filters/consts';
import qs from 'qs';
import { useGetProductsQuery } from '@/redux/getProducts/api';

const Catalog = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const isMounted = useRef(false);
	const {
		activeCategory,
		activeRating,
		priceMinMax,
		activeSort,
		activeShow,
		currentPage,
		activeColor,
		filterResults,
	} = useSelector(SelectFilters);
	const { data, isLoading } = useGetProductsQuery({
		activeCategory,
		activeRating,
		currentPage,
		activeShow,
		activeColor,
		activeSort,
		priceMinMax,
	});
	const products = data?.items;

	const resultCatalog = {
		activeSort: activeSort.name,
		activeShow: activeShow,
	};

	useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(setMenuUrlValue(menuList[1]));
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));
			dispatch(setFilterUrl({ ...params }));
		} else {
			dispatch(setActiveCategory(''));
			dispatch(setCurrentPage(1));
			dispatch(setActiveShow(6));
			dispatch(setActiveColor(''));
		}
		isMounted.current = true;
	}, [dispatch]);

	// Обновление URL при изменении фильтров
	useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify(
				{
					category: activeCategory === '' ? null : activeCategory,
					_page: currentPage,
					_limit: activeShow,
					_sort: activeSort?.value,
					color: activeColor === '' ? null : activeColor,
					rating: activeRating,
					salePrice_gte: priceMinMax[0],
					salePrice_lte: priceMinMax[1],
				},
				{ skipNulls: true }
			);
			navigate(`?${queryString}`);
		}
	}, [
		activeCategory,
		activeRating,
		priceMinMax,
		activeColor,
		activeSort,
		activeShow,
		currentPage,
	]);

	// Обновление фильтров при изменении URL
	useEffect(() => {
		if (isMounted.current) {
			const search = window.location.search;
			if (search) {
				const params = qs.parse(search.substring(1));
				dispatch(setFilterUrl(params));
			}
		}
	}, [window.location.search]);

	useEffect(() => {
		dispatch(setFilterResults({ ...resultCatalog }));
	}, [activeSort, activeShow, dispatch]);

	const cards =
		products && products.length > 0 ? (
			products.map((product: ProductType, index: number) => (
				<Card product={product} key={index} />
			))
		) : (
			<p>Список продуктов пустой!</p>
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
							{isLoading ? <p>Идёт загрузка!</p> : cards}
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

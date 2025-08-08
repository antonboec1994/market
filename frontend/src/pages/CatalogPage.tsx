import Banner from '@/components/Content/Blocks/Banner/Banner';
import Brands from '@/components/Content/Blocks/Brands/Brands';
import Breadcrumbs from '@/components/Content/Blocks/Breadcrumbs/Breadcrumbs';
import Catalog from '@/components/Content/Blocks/Catalog/Catalog';
import Subscribe from '@/components/Content/Blocks/Subscribe/Subscribe';
import { menuList } from '@/redux/filters/consts';
import { SelectFilters } from '@/redux/filters/selectors';
import {
	setActiveCategory,
	setActiveColor,
	setActiveShow,
	setCurrentPage,
	setFilterUrl,
	setMenuUrlValue,
} from '@/redux/filters/slice';
import { fetchProductsByFilter } from '@/redux/getProducts/thunks';
import { useAppDispatch } from '@/redux/store';
import qs from 'qs';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CatalogPage = () => {
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
	} = useSelector(SelectFilters);
	const pageTitle: string = 'Каталог';

	const getCards = () => {
		dispatch(
			fetchProductsByFilter({
				activeCategory,
				activeRating,
				currentPage,
				activeShow,
				activeColor,
				activeSort,
				priceMinMax,
			})
		);
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

		getCards();

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
			const params = qs.parse(window.location.search.substring(1));
			dispatch(setFilterUrl({ ...params }));
			getCards();
		}
	}, [window.location.search]);

	return (
		<>
			<Banner />
			<Breadcrumbs pageTitle={pageTitle} />
			<Catalog />
			<Brands />
			<Subscribe />
		</>
	);
};

export default CatalogPage;

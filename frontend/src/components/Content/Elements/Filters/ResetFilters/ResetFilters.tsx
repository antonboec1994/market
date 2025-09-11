import { defaultPriceMax, defaultPriceMin } from '@/redux/filters/consts';
import { SelectFilters } from '@/redux/filters/selectors';
import {
	setActiveCategory,
	setActiveColor,
	setActiveRating,
	setActiveShow,
	setActiveSort,
	setCurrentPage,
	setFilterUrl,
	setPriceMinMax,
} from '@/redux/filters/slice';
import { useAppDispatch } from '@/redux/store';
import { useSelector } from 'react-redux';
import styles from './ResetFilters.module.scss';

const ResetFilters = () => {
	const dispatch = useAppDispatch();
	const {} = useSelector(SelectFilters);

	const filtersReset = () => {
		dispatch(setFilterUrl(''));
		dispatch(setActiveCategory(''));
		dispatch(setCurrentPage(1));
		dispatch(setActiveColor(''));
		dispatch(setActiveShow(6));
		dispatch(setActiveRating(0));
		dispatch(setPriceMinMax([defaultPriceMin, defaultPriceMax]));
		dispatch(
			setActiveSort({
				name: 'Цена: сначала недорогие',
				value: 'salePrice',
			})
		);
		dispatch(
			setActiveSort({
				name: 'Цена: сначала недорогие',
				value: 'salePrice',
			})
		);
		dispatch(setPriceMinMax([defaultPriceMin, defaultPriceMax]));
	};

	return (
		<div className={styles.products__reset} onClick={() => filtersReset()}>
			Сбросить
		</div>
	);
};

export default ResetFilters;

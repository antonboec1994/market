import { SelectFilters } from '@/redux/filters/selectors';
import { setCurrentPage, setPriceMinMax } from '@/redux/filters/slice';
import { useAppDispatch } from '@/redux/store';
import {
	formatPrice,
	localPriceFormattedMax,
	localPriceFormattedMin,
} from '@/utils/formatNumbers';
import { useSelector } from 'react-redux';
import ReactSlider from 'react-slider';
import './FilterPrice.module.scss';
import styles from './FilterPrice.module.scss';

const FilterPrice = () => {
	const dispatch = useAppDispatch();
	const { priceMinMax } = useSelector(SelectFilters);

	formatPrice(priceMinMax);

	const onClickPriceChange = (value: number[]) => {
		dispatch(setCurrentPage(1));
		dispatch(setPriceMinMax(value));
	};

	return (
		<div className={styles.products__aside_price}>
			<div className={styles.aside_title}>Фильтр по цене</div>
			<div className={styles.price_slider_box}>
				<span className={styles.value0}>{localPriceFormattedMin} р</span>
				<ReactSlider
					className='price_slider'
					thumbClassName='price_thumb'
					trackClassName='price_track'
					value={priceMinMax}
					min={0}
					max={800000}
					renderThumb={props => <div {...props}></div>}
					pearling
					minDistance={2000}
					onChange={value => onClickPriceChange(value)}
				/>
				<span className={styles.value1}>{localPriceFormattedMax} р</span>
			</div>
		</div>
	);
};

export default FilterPrice;

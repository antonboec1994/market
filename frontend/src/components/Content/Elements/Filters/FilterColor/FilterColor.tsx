import { colorsList } from '@/redux/filters/consts';
import { SelectFilters } from '@/redux/filters/selectors';
import { setActiveColor, setCurrentPage } from '@/redux/filters/slice';
import { useAppDispatch } from '@/redux/store';
import React from 'react';
import { useSelector } from 'react-redux';
import styles from './FilterColor.module.scss';

const FilterColor: React.FC = () => {
	const dispatch = useAppDispatch();
	const { activeColor } = useSelector(SelectFilters);

	const colorChange = (value: string) => {
		dispatch(setActiveColor(value));
		dispatch(setCurrentPage(1));
	};

	return (
		<div className={styles.products__aside_color}>
			<div className={styles.aside_title}>Фильтр по цвету</div>
			<ul className={styles.products__color_list}>
				{colorsList.map((item, index) => (
					<li
						className={item.value === activeColor ? styles.active : ''}
						key={index}
						onClick={() => colorChange(item.value)}
					>
						<span
							className={item.value ? styles.color : styles.nocolor}
							style={{ backgroundColor: `${item.value}` }}
						></span>
						<p>{item.name}</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default FilterColor;

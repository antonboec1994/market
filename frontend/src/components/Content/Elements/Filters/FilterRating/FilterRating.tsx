import { SelectFilters } from '@/redux/filters/selectors';
import { setActiveRating, setCurrentPage } from '@/redux/filters/slice';
import ReactStars from 'react-rating-stars-component';
import { useDispatch, useSelector } from 'react-redux';
import styles from './FilterRating.module.scss';

const FilterRating: React.FC = () => {
	const dispatch = useDispatch();
	const { activeRating } = useSelector(SelectFilters);

	const onChangeRating = (value: number) => {
		dispatch(setActiveRating(value));
		dispatch(setCurrentPage(1));
	};

	return (
		<div className={styles.products__aside_rating}>
			<div className={styles.aside_title}>Фильтр по рейтингу</div>
			<ul className={styles.products__rating_list}>
				<li className={activeRating >= 4 ? styles.active : ''}>
					<div
						className={styles.products__rating_item}
						onClick={() => onChangeRating(4)}
					>
						<ReactStars
							value={1}
							count={1}
							size={20}
							activeColor='#ffd700'
							color={'#454545'}
							edit={false}
							allowHalf
							isHalf={true}
						/>
						Рейтинг от 4 и выше
					</div>
				</li>
				<li className={activeRating < 4 ? styles.active : ''}>
					<div
						className={styles.products__rating_item}
						onClick={() => onChangeRating(0)}
					>
						<ReactStars
							value={0.5}
							count={1}
							size={20}
							activeColor='#ffd700'
							color={'#454545'}
							edit={false}
							allowHalf
							isHalf={true}
						/>
						Весь рейтинг
					</div>
				</li>
			</ul>
		</div>
	);
};

export default FilterRating;

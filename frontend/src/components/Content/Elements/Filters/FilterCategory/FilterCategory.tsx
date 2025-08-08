import { categoriesList } from '@/redux/filters/consts';
import { setActiveCategory, setCurrentPage } from '@/redux/filters/slice';
import { SelectGetProducts } from '@/redux/getProducts/selectors';
import { useDispatch, useSelector } from 'react-redux';
import styles from './FilterCategory.module.scss';

const FilterCategory: React.FC = () => {
	const dispatch = useDispatch();
	const { productsAll } = useSelector(SelectGetProducts);

	const countOfItemsInCategory = (index: number) => {
		return productsAll.reduce((count, item) => {
			return Number(item.category) === index ? count + 1 : count;
		}, 0);
	};

	const changeCategory = (index: number) => {
		dispatch(setActiveCategory(index));
		dispatch(setCurrentPage(1));
	};

	const search = window.location.search;
	const params = new URLSearchParams(search);
	const category = params.get('category') ? Number(params.get('category')) : '';

	return (
		<div className={styles.products__aside_categories}>
			<div className={styles.aside_title}>Фильтр по категориям</div>
			<ul>
				{categoriesList.map((item, index) => (
					<li
						className={category === index ? styles.active : ''}
						key={index}
						onClick={() => changeCategory(index)}
					>
						{item.name}
						<span>{countOfItemsInCategory(index)}</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default FilterCategory;

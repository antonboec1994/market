import debounce from 'lodash.debounce';
import { useCallback, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setSearchModal, setSearchValue } from '@/redux/filters/slice';
import { SelectFilters } from '@/redux/filters/selectors';
import { SelectGetProducts } from '@/redux/getProducts/selectors';
import type { ProductType } from '@/redux/getProducts/types';
import { useAppDispatch } from '@/redux/store';
import styles from './Search.module.scss';

type SearchPropsType = {
	scrollPosition: number;
};

const Search: React.FC<SearchPropsType> = ({ scrollPosition }) => {
	const dispatch = useAppDispatch();
	const { searchValue, searchModal } = useSelector(SelectFilters);

	const { productsAll, statusAll } = useSelector(SelectGetProducts);
	const searchRef = useRef(null);

	const { register, handleSubmit } = useForm({ mode: 'onChange' });
	const updateInput = useCallback(
		debounce((data: any) => {
			dispatch(setSearchValue(data));
		}, 1000),
		[]
	);
	const onChangeInput = (data: any) => {
		if (data.Search) {
			updateInput(data);
			dispatch(setSearchModal(true));
		} else {
			dispatch(setSearchModal(false));
		}
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent | TouchEvent) => {
			if (
				searchRef.current &&
				!event.composedPath().includes(searchRef.current)
			) {
				dispatch(setSearchModal(false));
			}
		};
		document.body.addEventListener('click', handleClickOutside);
		return () => {
			document.body.removeEventListener('click', handleClickOutside);
		};
	}, [dispatch]);

	const findProducts = productsAll?.filter((item: ProductType) => {
		if (!searchValue.Search) return true;
		const itemName = item.name.toLowerCase();
		const searchQuery = searchValue.Search.toLowerCase();
		return itemName.includes(searchQuery);
	});

	return (
		<form
			className={
				scrollPosition <= 150
					? styles.header__main_form
					: `${styles.header__main_form} ${styles.fixed}`
			}
			onChange={handleSubmit(onChangeInput)}
			ref={searchRef}
		>
			<input
				className={styles.header__main_search}
				type='text'
				placeholder='Поиск...'
				{...register('Search')}
			/>
			<button
				className={`${styles.header__main_search_btn} icon_search`}
				type='submit'
			></button>
			<div
				className={
					searchModal
						? `${styles.header__main_search_modal} ${styles.active}`
						: styles.header__main_search_modal
				}
			>
				{statusAll === 'LOADING' ? (
					'Идёт загрузка!'
				) : (
					<ul className={styles.cardlist}>
						{findProducts.length > 0 ? (
							<div>
								{findProducts.map((item, index) => (
									<li className={styles.card} key={index}>
										<Link to={`/product/${item.id}`}>
											<img src={item.imageUrl} alt='alt' />
											<span>{item.name}</span>
										</Link>
									</li>
								))}
							</div>
						) : (
							'Товаров не найдено!'
						)}
					</ul>
				)}
			</div>
		</form>
	);
};

export default Search;

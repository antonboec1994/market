import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	setActiveShow,
	setActiveSort,
	setCurrentPage,
} from '@/redux/filters/slice';

import { showList, sortList } from '@/redux/filters/consts';
import { SelectFilters } from '@/redux/filters/selectors';
import styles from './FilterSortby.module.scss';

const FilterSortby = () => {
	const dispatch = useDispatch();
	const [sortListModal, setSortListModal] = useState(false);
	const [showListModal, setShowListModal] = useState(false);
	const sortRef = React.useRef(null);
	const showRef = React.useRef(null);
	const { activeSort, activeShow } = useSelector(SelectFilters);

	const changeSortModal = () => {
		if (sortListModal) {
			setSortListModal(false);
		} else {
			setSortListModal(true);
		}
	};
	const changeShowModal = () => {
		if (showListModal) {
			setShowListModal(false);
		} else {
			setShowListModal(true);
		}
	};
	const changeSortValue = (value: number) => {
		dispatch(setActiveSort(value));
	};
	const changeShowValue = (value: number) => {
		dispatch(setActiveShow(value));
		dispatch(setCurrentPage(1));
	};

	React.useEffect(() => {
		const handleClickOutside = (event: MouseEvent | TouchEvent) => {
			if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
				setSortListModal(false);
			}
			if (showRef.current && !event.composedPath().includes(showRef.current)) {
				setShowListModal(false);
			}
		};
		document.body.addEventListener('click', handleClickOutside);
		return () => {
			document.body.removeEventListener('click', handleClickOutside);
		};
	}, []);

	return (
		<form className={styles.products__content_form}>
			<div className={styles.products__content_sortby} ref={sortRef}>
				<span onClick={() => changeSortModal()}>Сортировка</span>
				<ul className={sortListModal ? styles.active : ''}>
					{sortList.map((item: any, index) => (
						<li
							className={activeSort.value === item.value ? styles.active : ''}
							key={index}
							onClick={() => changeSortValue(item)}
						>
							{item.name}
						</li>
					))}
				</ul>
			</div>
			<div className={styles.products__content_show} ref={showRef}>
				<span onClick={() => changeShowModal()}>Показать</span>
				<ul className={showListModal ? styles.active : ''}>
					{showList.map((item, index) => (
						<li
							className={
								Number(activeShow) === Number(item.value) ? styles.active : ''
							}
							key={index}
							onClick={() => changeShowValue(item.value)}
						>
							{item.value}
						</li>
					))}
				</ul>
			</div>
		</form>
	);
};

export default FilterSortby;

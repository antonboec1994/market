import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import {
	categoriesList,
	setActiveCategory,
	setCurrentPage,
} from '@/redux/filters/slice';

import styles from './Categories.module.scss';

const Categories = React.memo(() => {
	const dispatch = useDispatch();
	const search = window.location.search;
	const params = new URLSearchParams(search);
	const category = Number(params.get('category'));
	const [localActiveCategory, setLocalActiveCategory] = useState(category);

	const categoryChange = index => {
		dispatch(setActiveCategory(index));
		dispatch(setCurrentPage(1));
		setLocalActiveCategory(index);
	};

	return (
		<>
			<div className={styles.news__buttons}>
				{categoriesList.map((cat, index) => (
					<button
						onClick={() => categoryChange(index)}
						className={localActiveCategory === index ? styles.active : ''}
						key={index}
					>
						{cat.name}
					</button>
				))}
			</div>
		</>
	);
});

export default Categories;

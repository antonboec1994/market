import { Status } from '@/redux/getProducts/types';
import { SelectShowroom } from '@/redux/getShowroom/selectors';
import React from 'react';
import { useSelector } from 'react-redux';
import Card from './Card/Card';
import styles from './Showroom.module.scss';

const Showroom: React.FC = () => {
	const { items, status } = useSelector(SelectShowroom);

	const cards =
		items.length > 0 ? (
			items.map((item, index) => <Card key={index} findItem={item} />)
		) : (
			<p>Не найдено!</p>
		);

	return (
		<section className='showroom'>
			<div className='container'>
				<h2 className={styles.page_showroom__title}>
					Виртуальный шоу-рум офисной мебели
				</h2>
				<div className={styles.page_showroom__inner}>
					{status === Status.LOADING ? <p>Идёт загрузка!</p> : cards}
				</div>
			</div>
		</section>
	);
};

export default Showroom;

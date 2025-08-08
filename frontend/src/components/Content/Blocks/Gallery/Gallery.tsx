import { SelectGetProducts } from '@/redux/getProducts/selectors';
import { Status } from '@/redux/getProducts/types';
import { findProductByAttribute } from '@/utils/findProductByAttribute';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import banner from '../../../../assets/images/gallery/banner.jpg';
import styles from './Gallery.module.scss';
import GalleryItem from './GalleryItem/GalleryItem';

export const tabsList = [
	{ id: 0, title: 'Рекомендуемое' },
	{ id: 1, title: 'Хиты продаж' },
	{ id: 2, title: 'Распродажа' },
	{ id: 3, title: 'Высший рейтинг' },
];

const Gallery: React.FC = () => {
	const { statusAll } = useSelector(SelectGetProducts);
	const [tabSelected, setTabSelected] = useState(0);

	const onClickTab = (index: number) => {
		setTabSelected(index);
	};

	return (
		<>
			{statusAll === Status.LOADING ? (
				'Идёт загрузка!'
			) : (
				<section className='gallery'>
					<div className='title_head'>
						<h2 className='title_head__title'>мебельная галерея</h2>
					</div>
					<div className={styles.gallery__inner}>
						<div className={styles.gallery__tabs}>
							<div className={styles.gallery__tabs_inner}>
								<ul className={styles.gallery__tabs_tabs}>
									{tabsList.map((item, index) => (
										<li
											className={
												tabSelected === item?.id
													? `${styles.gallery__tabs_tab_link} ${styles.current}`
													: `${styles.gallery__tabs_tab_link}`
											}
											key={index}
											onClick={() => onClickTab(index)}
										>
											{item?.title}
										</li>
									))}
								</ul>
								<GalleryItem
									tabSelected={tabSelected}
									tabListIndex={0}
									productType={findProductByAttribute('recommend')}
								/>
								<GalleryItem
									tabSelected={tabSelected}
									tabListIndex={1}
									productType={findProductByAttribute('salehit')}
								/>
								<GalleryItem
									tabSelected={tabSelected}
									tabListIndex={2}
									productType={findProductByAttribute('saler')}
								/>
								<GalleryItem
									tabSelected={tabSelected}
									tabListIndex={3}
									productType={findProductByAttribute('bestRating')}
								/>
							</div>
						</div>
						<div
							className={styles.gallery__banner}
							style={{ backgroundImage: 'url(' + banner + ')' }}
						>
							<div className={styles.gallery__banner_textbox}>
								<div className={styles.gallery__banner_price}>
									<span className={styles.gallery__banner_price_span}>
										акция от
									</span>{' '}
									25%
								</div>
								<div className={styles.gallery__banner_text}>
									Кабинет Привилегия
								</div>
								<Link className={styles.gallery__banner_button} to='/catalog'>
									Купить сейчас
								</Link>
							</div>
						</div>
					</div>
				</section>
			)}
		</>
	);
};

export default Gallery;

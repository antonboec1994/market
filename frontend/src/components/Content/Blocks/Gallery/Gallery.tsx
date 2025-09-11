import { useState } from 'react';
import { Link } from 'react-router-dom';
import banner from '../../../../assets/images/gallery/banner.jpg';
import styles from './Gallery.module.scss';
import GalleryItem from './GalleryItem/GalleryItem';
import { useGetProductsQuery } from '@/redux/getProducts/api';
import { useFindProductByAttribute } from '@/utils/useFindProductByAttribute';

export const tabsList = [
	{ id: 0, title: 'Рекомендуемое' },
	{ id: 1, title: 'Хиты продаж' },
	{ id: 2, title: 'Распродажа' },
	{ id: 3, title: 'Высший рейтинг' },
];

const Gallery: React.FC = () => {
	const { isLoading } = useGetProductsQuery();
	const [tabSelected, setTabSelected] = useState(0);

	// ✅ Все хуки — здесь, до return
	const productRecommend = useFindProductByAttribute('recommend');
	const productSalehit = useFindProductByAttribute('salehit');
	const productSaler = useFindProductByAttribute('saler');
	const productBestRating = useFindProductByAttribute('bestRating');

	const onClickTab = (index: number) => {
		setTabSelected(index);
	};

	return (
		<>
			{isLoading ? (
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
									productType={productRecommend}
								/>
								<GalleryItem
									tabSelected={tabSelected}
									tabListIndex={1}
									productType={productSalehit}
								/>
								<GalleryItem
									tabSelected={tabSelected}
									tabListIndex={2}
									productType={productSaler}
								/>
								<GalleryItem
									tabSelected={tabSelected}
									tabListIndex={3}
									productType={productBestRating}
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

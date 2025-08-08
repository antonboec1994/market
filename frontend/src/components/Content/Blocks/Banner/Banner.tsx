import React from 'react';
import styles from './Banner.module.scss';

const Banner: React.FC = () => {
	return (
		<section className={styles.banner_top}>
			<div className={styles.banner_top__inner}>
				<h2 className={styles.banner_top__title}>
					<span className={styles.banner_top__title_span}>Мебель для</span>{' '}
					офиса
				</h2>
				<div className={styles.banner_top__text}>
					всегда со скидкой{' '}
					<span className={styles.banner_top__text_span}>25%</span> или более
				</div>
			</div>
		</section>
	);
};

export default Banner;

import styles from './About.module.scss';
import Brands from '../Brands/Brands';

const About: React.FC = () => {
	return (
		<section className={styles.page_about}>
			<h2 className={styles.page_about__title}>О компании</h2>
			<p className={styles.page_about__text}>
				Компания "Альберо Декор"_офисная мебель по доступным ценам с полным
				циклом сервиса.
			</p>
			<p className={styles.page_about__text}>
				<span className={styles.page_about__text_span}>
					Качественная мебель:
				</span>{' '}
				мы сотрудничаем только с положительно зарекомендовавшими себя
				производителями офисной мебели;
			</p>
			<p className={styles.page_about__text}>
				<span className={styles.page_about__text_span}>Полный сервис:</span>
				замеры и дизайн-проект офиса, доставка собственным транспортом и монтаж
				мебели под ключ опытным профессиональным персоналом, полный контроль
				сборки;
			</p>
			<p className={styles.page_about__text}>
				<span className={styles.page_about__text_span}>
					Привлекательные цены:
				</span>
				доступные цены ниже среднерыночных и существенные скидки на всю мебель,
				а также подарочные акции;
			</p>
			<p className={styles.page_about__text}>
				<span className={styles.page_about__text_span}>
					Широкий ассортимент:
				</span>
				наш шоурум демонстрирует самые интересные коллекции мебели для офиса;
			</p>
			<p className={styles.page_about__text}>
				<span className={styles.page_about__text_span}>Надежный партнер.</span>
				Среди наших постоянных клиентов самые успешные и известные компании
				разных сегментов.
			</p>
			<div className={styles.page_about__items}>
				<div className={styles.page_about__item}>
					<div className={`${styles.page_about__item_icon} icon_paste`}></div>
					<div className={styles.page_about__item_text}>Наши поставщики</div>
				</div>
				<div className={styles.page_about__item}>
					<div className={`${styles.page_about__item_icon} icon_printer`}></div>
					<div className={styles.page_about__item_text}>Документы, бланки</div>
				</div>
				<div className={styles.page_about__item}>
					<div
						className={`${styles.page_about__item_icon} icon_user_plus`}
					></div>
					<div className={styles.page_about__item_text}>Наши вакансии</div>
				</div>
			</div>
			<h2 className={styles.page_about__box_title}>Наши клиенты и их отзывы</h2>
			<p className={styles.page_about__box_text}>
				На нашем сайте публикуются исключительно отсканированные копии отзывов,
				подписанных собственноручно представителем компании-клиента, что
				исключает вероятность искусственного нагнетания собственного
				положительного имиджа посредством размещения отзывов силами своего
				персонала, часто практикуемого нашими коллегами по отрасли
			</p>
			<Brands />
		</section>
	);
};

export default About;

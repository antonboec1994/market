import doc from '../../../../assets/images/partnership/doc.png';
import pdf from '../../../../assets/images/partnership/pdf.png';
import styles from './Partnership.module.scss';

const Partnership: React.FC = () => {
	return (
		<section className={styles.partnership}>
			<div className={styles.partnership__inner}>
				<h2 className={styles.partnership__title}>Партнерство</h2>
				<p className={styles.partnership__text}>
					«Альберо Декор» – известный и признанный лидер в сегменте поставок
					мебели для рынка b2b. Являясь представителем и дистрибьютором ряда
					известнейших европейских и отечественных мебельных корпораций, а также
					имея свои производственные площадки, компания активно развивает
					собственную сеть партнеров и региональных представителей,
					сформированную из локальных мебельных розничных салонов и
					интернет-магазинов, дизайн-студий и проектно-архитектурных компаний.
				</p>
				<p className={styles.partnership__text}>
					Мы создали комфортные условия для вашего бизнеса:
				</p>
				<ol className={styles.partnership__list}>
					<li className={styles.partnershit__list_item}>
						Всегда низкие цены, которые оставляют широкое пространство для
						ценовых маневров в торгах.
					</li>
					<li className={styles.partnershit__list_item}>
						Оперативная транспортная логистика до вашего склада: возможность
						получения на ваш склад товаров разных фабрик из разных стран в одной
						партии груза наиболее комфортным для вас способом.
					</li>
					<li className={styles.partnershit__list_item}>
						Создание предварительного проекта расстановки мебели для вашего
						покупателя, полное консультативное сопровождение в процессе работы
						над вашим проектом.
					</li>
					<li className={styles.partnershit__list_item}>
						Возможность действовать под брендом «Альберо Декор» (предоставляются
						дополнительные преференции в виде увеличения скидок от дилерской
						цены и рекламной поддержки)
					</li>
					<li className={styles.partnershit__list_item}>
						Доступ в закрытый раздел для дилеров на сайте компании с актуальными
						дилерскими ценами.
					</li>
					<li className={styles.partnershit__list_item}>
						Снабжение необходимыми печатными каталогами, фотоматериалами и 3D
						моделями для проектов, а также образцами материалов, используемых в
						производстве мебели.
					</li>
					<li className={styles.partnershit__list_item}>
						Квалифицированная юридическая поддержка нашей юридической службы при
						согласовании условий вашего контракта с вашим покупателем.
					</li>
				</ol>
				<div className={styles.partnership__download_inner}>
					<div className={styles.partnership__download_buttons}>
						<a
							className={styles.partnership__download_btn}
							href='files/anketa_partnera.doc'
							download
						>
							<img src={doc} alt='alt' />
						</a>
						<a
							className={styles.partnership__download_btn}
							href='files/anketa_partnera.pdf'
							download
						>
							<img src={pdf} alt='alt' />
						</a>
					</div>
					<div className={styles.partnership__download_info}>
						<p className={styles.partnership__download_text}>
							<span className={styles.partnership__download_text_span}>
								{' '}
								Анкета партнера{' '}
							</span>
							- для мебельных компаний, магазинов, салонов, дизайнерских студий,
							архитектурных бюро.
						</p>
						<p
							className={`${styles.partnership__download_text} ${styles.partnership__download_text__cursive}`}
						>
							Заверяется подписью руководителя и печатью организации.
							Электронная копия должна быть отправлена на адрес
							<a
								className={styles.partnership__download_text_email}
								href='https://mail.google.com/'
							>
								albero_mebel@gmail.com
							</a>
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Partnership;

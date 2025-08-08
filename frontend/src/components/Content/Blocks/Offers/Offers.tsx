import { Link } from 'react-router-dom';
import offers_1 from '../../../../assets/images/offers/offers-1.jpg';
import offers_2 from '../../../../assets/images/offers/offers-2.jpg';
import offers_3 from '../../../../assets/images/offers/offers-3.jpg';
import styles from './Offers.module.scss';
import OffersItem from './OffersItem';

const offers = [
	{ title: 'Быстрая доставка', text: 'всех заказов', icon: 'icon_truck' },
	{ title: '24/7 поддержка', text: 'клиентов', icon: 'icon_headphones' },
	{ title: 'ВОЗВРАТ ДЕНЕГ', text: 'ГАРАНТИЯ', icon: 'icon_mail_forward' },
	{ title: 'СКИДКА ДЛЯ постоянных', text: 'клиентов', icon: 'icon_bullhorn' },
];

const Offers: React.FC = () => {
	return (
		<section className='offers'>
			<div className={styles.offers__items}>
				{offers.map((item, index) => (
					<OffersItem item={item} key={index} />
				))}
			</div>
			<div className={styles.offers__images}>
				<Link className={styles.offers__single} to='/catalog'>
					<div
						className={styles.offers__single_image}
						style={{ backgroundImage: 'url(' + offers_1 + ')' }}
					>
						<div className={styles.offers__single_box}>
							<div className={styles.offers__single_text}>
								Кабинет
								<span className={styles.offers__single_text_span}>
									Sentida Lux
								</span>
							</div>
							<div className={styles.offers__single_price}>-20%</div>
						</div>
					</div>
				</Link>
				<div className={styles.offers__double}>
					<Link
						className={styles.offers__double_image1}
						style={{ backgroundImage: 'url(' + offers_2 + ')' }}
						to='/catalog'
					>
						<div className={styles.offers__double_box}>
							<div className={styles.offers__double_text1}>
								<h3 className={styles.offers__double_text1_title}>Офисные</h3>
								стулья
								<span className={styles.offers__double_text1_span}>
									комплект
								</span>
							</div>
							<div className={styles.offers__double_price1}>$599.00</div>
						</div>
					</Link>
					<Link
						className={styles.offers__double_image2}
						style={{ backgroundImage: 'url(' + offers_3 + ')' }}
						to='/catalog'
					>
						<div className={styles.offers__double_box}>
							<div className={styles.offers__double_text2}>
								<h3 className={styles.offers__double_text2_title}>
									Уникальное
								</h3>
								<span className={styles.offers__double_text2_span}>
									предложение
								</span>
							</div>
							<div className={styles.offers__double_price2}>
								экономия 45% от стоимости
							</div>
						</div>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default Offers;

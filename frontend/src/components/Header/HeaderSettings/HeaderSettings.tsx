import { SelectCart } from '@/redux/cart/selectors';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo2 from '../../../assets/images/logo2.png';
import styles from '../Header.module.scss';
import HeaderProfile from '../HeaderProfile/HeaderProfile';

const HeaderSettings: React.FC = () => {
	const { productsInCart } = useSelector(SelectCart);

	const sumCountInCart = () => {
		if (!productsInCart) return 0;
		return productsInCart.reduce((sum, item) => sum + item.count, 0);
	};

	return (
		<div className={styles.header__settings}>
			<div className='container'>
				<div className={styles.header__settings_inner}>
					<Link className={styles.header__settings_logo} to='/'>
						<img src={logo2} alt='alt' />
					</Link>
					<div className={styles.header__settings_time}>
						<span className={styles.header__settings_time_span}>Пн-Пт:</span>
						9:00-20:00
					</div>
					<a
						className={styles.header__settings_email}
						href='mailto:albero_mebel@mail.ru'
					>
						albero_mebel@mail.ru
					</a>
					<div className={styles.header__setting_user}>
						<HeaderProfile />
						<Link
							className={styles.header__settings_cart}
							to='/cart'
							data-aos='fade-left'
							data-aos-duration='1000'
							data-aos-delay='1000'
						>
							<i
								className={`${styles.header__settings_cart_icon} icon_shopping_basket`}
								data-aos='fade-left'
								data-aos-duration='1000'
								data-aos-delay='1500'
							></i>
							<div
								className={styles.header__settings_cart_count}
								data-aos='fade-left'
								data-aos-duration='1000'
								data-aos-delay='1800'
							>
								{sumCountInCart()}
							</div>
						</Link>
					</div>
					<div className={styles.header__settings_image_inner}>
						<i
							className={`${styles.header__settings_image_icon} icon_angle_left`}
							data-aos='fade-left'
							data-aos-duration='1000'
							data-aos-delay='2000'
						></i>
						<i
							className={`${styles.header__settings_image_icon} icon_angle_left`}
							data-aos='fade-left'
							data-aos-duration='1000'
							data-aos-delay='2100'
						></i>
						<i
							className={`${styles.header__settings_image_icon} icon_angle_left`}
							data-aos='fade-left'
							data-aos-duration='1000'
							data-aos-delay='2200'
						></i>
						<i
							className={`${styles.header__settings_image_icon} icon_angle_left`}
							data-aos='fade-left'
							data-aos-duration='1000'
							data-aos-delay='2250'
						></i>
						<i
							className={`${styles.header__settings_image_icon} icon_angle_left`}
							data-aos='fade-left'
							data-aos-duration='1000'
							data-aos-delay='2300'
						></i>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeaderSettings;

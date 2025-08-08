import { SelectAuth } from '@/redux/auth/selectors';
import { formatNumber } from '@/utils/formatNumbers';
import { OnClickAddToCart } from '@/utils/onClickAddToCart';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import StarRating from '../StarRating/StarRating';
import styles from './Card.module.scss';
import type { ProductType } from '@/redux/getProducts/types';

type CardPropsType = {
	product: ProductType;
};

const Card: React.FC<CardPropsType> = ({ product }) => {
	const url = typeof window !== 'undefined' ? window.location.href : '';
	let urlPath = url.includes('catalog');
	const { isLogged } = useSelector(SelectAuth);

	return (
		<div className={urlPath ? styles.news__card_catalog : styles.news__card}>
			<div
				className={`${styles.card__image} ${styles.news__card_image}`}
				style={{ backgroundImage: 'url(' + product.imageUrl + ')' }}
			>
				<div className={styles.news__card_image_circle}>акция</div>
				<Link className={styles.news__card_view} to={`/product/${product.id}`}>
					смотреть
				</Link>
				{isLogged && (
					<button
						className={`${styles.card__form_button} ${styles.news__card_button}`}
						onClick={() => OnClickAddToCart(product)}
					>
						<i
							className={`${styles.card__form_button_icon} icon_shopping_basket`}
						></i>
						в корзину
					</button>
				)}
			</div>
			<div className={`${styles.card__info} ${styles.news__card_info}`}>
				<Link className={styles.card__info_title} to={`/product/${product.id}`}>
					{product.name}
				</Link>
				<div className={styles.card__info_text}>{product.art}</div>
				<div className={styles.card__info_rate}>
					<StarRating rating={product.rating} editValue={false} />
					<span>{product.rating}</span>
				</div>
				<div className={styles.card__info_links}>
					<div
						className={`${styles.card__links_price} ${styles.news__card_links_price}`}
					>
						<p>{formatNumber(product.price)} р</p>
						<span
							className={`${styles.card__links_price_span} ${styles.news__card_links_price_span}`}
						>
							{formatNumber(product.salePrice)} р
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;

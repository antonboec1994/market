import StarRating from '@/components/Content/Elements/StarRating/StarRating';
import { SelectAuth } from '@/redux/auth/selectors';
import { categoriesList } from '@/redux/filters/consts';
import { SelectFeedbacks } from '@/redux/getFeedbacks/selectors';
import type { FeedbacksType } from '@/redux/getFeedbacks/types';
import { Status, type ProductType } from '@/redux/getProducts/types';
import { formatNumber } from '@/utils/formatNumbers';
import { normalize_count_form_feedbacks } from '@/utils/normalizeWordsForm';
import { OnClickAddToCart } from '@/utils/onClickAddToCart';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import SliderProduct from '../Sliders/SliderProduct/SliderProduct';
import styles from './ProductInfo.module.scss';

type ProductInfoProps = {
	product: ProductType;
};

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
	const { status, feedbacksAll } = useSelector(SelectFeedbacks);
	const { isLogged } = useSelector(SelectAuth);
	const { hash, key } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		if (hash && hash.length > 1) {
			const targetElement = document.getElementById(hash.substring(1));
			targetElement?.scrollIntoView({ behavior: 'smooth' });
		}
	}, [key, hash]);

	const resultFeedbacks: FeedbacksType[] =
		status === Status.SUCCESS
			? feedbacksAll.filter(item => item.productId === product.id)
			: [];

	return (
		<>
			<section className={styles.product_info}>
				<div className={styles.product_info__inner}>
					<div className={styles.product_info__inner_images}>
						<SliderProduct product={product} />
					</div>
					<div className={styles.product_info__inner_information}>
						<div className={styles.product_info__information_name_box}>
							<div className={styles.product_info__information_name}>
								{product?.name}
							</div>
							<div className={styles.product_info__information_rate}>
								<StarRating rating={product?.rating} editValue={false} />
							</div>
							<div className={styles.product_info__information_feedbacks}>
								{resultFeedbacks.length}
								{normalize_count_form_feedbacks(resultFeedbacks.length)}
							</div>
							<Link
								className={styles.product_info__information_addfeedbacks}
								to='#feedbacks'
							>
								Добавить отзыв
							</Link>
						</div>
						<div className={styles.product_info__information_price_box}>
							<div className={styles.product_info__information_price}>
								{formatNumber(product?.price)} р
								<span className={styles.product_info__information_price_span}>
									{formatNumber(product?.salePrice)} р
								</span>
							</div>
						</div>
						{isLogged && (
							<div className={styles.product_info__information_buy_box}>
								<button
									className={styles.product_info__card__form_button}
									type='button'
									onClick={() => OnClickAddToCart(product)}
								>
									<i className='icon_shopping_basket'></i>В корзину
								</button>
							</div>
						)}
						<div className={styles.product_info__information_text_box}>
							<div className={styles.product_info__information_text_title}>
								Описание:
							</div>
							{product?.description}
						</div>
						<div className={styles.product_info__information_category_box}>
							<div className={styles.product_info__information_category_line}>
								<span
									className={styles.product_info__information_category_span}
								>
									Доступно:
								</span>
								<strong
									className={product?.inStock ? styles.green : styles.red}
								>
									{product?.inStock ? 'В наличии' : 'Нет в наличии'}
								</strong>
							</div>
							<div className={styles.product_info__information_category_line}>
								<span
									className={styles.product_info__information_category_span}
								>
									Категория:
								</span>
								{categoriesList[product?.category]?.name}
							</div>
							<div className={styles.product_info__information_category_line}>
								<span
									className={styles.product_info__information_category_span}
								>
									Цвет:
								</span>
								<span
									className={styles.color}
									style={{ backgroundColor: `${product?.color}` }}
								></span>
							</div>
						</div>
						<div className={styles.product_info__information_socials_box}>
							<a
								className={`${styles.product_info__information_socials_item} icon_facebook_square socials__color_facebook`}
								href='https://www.facebook.com/'
							>
								Facebook
							</a>
							<a
								className={`${styles.product_info__information_socials_item} icon_twitter_square socials__color_twitter`}
								href='https://help.twitter.com/'
							>
								Tweet
							</a>
							<a
								className={`${styles.product_info__information_socials_item} icon_linkedin_square socials__color_linkedin`}
								href='https://www.linkedin.com/'
							>
								Linkedin
							</a>
							<a
								className={`${styles.product_info__information_socials_item} icon_google_plus_square socials__color_google`}
								href='https://www.google.ru/'
							>
								Google+
							</a>
							<a
								className={`${styles.product_info__information_socials_item} icon_pinterest_square socials__color_pinterest`}
								href='https://www.pinterest.ru/'
							>
								Pinterest
							</a>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default ProductInfo;

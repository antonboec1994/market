import StarRating from '@/components/Content/Elements/StarRating/StarRating';
import { type ProductType } from '@/redux/getProducts/types';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import styles from './FeedbacksSlider.module.scss';
import { useGetProductsQuery } from '@/redux/getProducts/api';
import { useGetFeedbacksQuery } from '@/redux/getFeedbacks/api';

const settings = {
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: false,
	dots: true,
	autoplay: true,
	autoplaySpeed: 5000,
	cssEase: 'ease-out',
};

const FeedbacksSlider = () => {
	const { data, isLoading } = useGetFeedbacksQuery({});
	const { data: productsData } = useGetProductsQuery({});

	const productsMap = new Map<number, ProductType>();
	productsData?.items?.forEach((item: ProductType) => {
		if (item?.id) {
			productsMap.set(item.id, item);
		}
	});

	const feedbacksAll = data?.feedbacks.slice(0, 10);

	if (isLoading) return <div>Идёт загрузка...</div>;
	if (feedbacksAll?.length === 0) return <div>Отзывов еще нет</div>;

	return (
		<section className='feedback'>
			<div className='title_head'>
				<h2 className='title_head__title'>Отзывы наших клиентов</h2>
			</div>
			<Slider className='feedback__slider' {...settings}>
				{feedbacksAll?.slice(0, 10).map((item, index) => {
					if (!item) return null;
					const product = item.productId
						? productsMap.get(item.productId)
						: null;
					const hasProduct = product && product.imageUrl && product.name;

					return (
						<div className={styles.feedback__item} key={index}>
							<div className={styles.feedback__item_box}>
								<div className={styles.feedback__item_text}>
									{item.feedbackMessage || 'Без текста отзыва'}
								</div>
								<div className={styles.feedback__item_author}>
									<div className={styles.feedback__item_author_info}>
										<div className={styles.feedback__item_author_rating}>
											<StarRating rating={item.rating || 0} editValue={false} />
										</div>
										<div className={styles.feedback__item_author_name}>
											{item.userName || 'Анонимный пользователь'}
										</div>
										<div className={styles.feedback__item_author_date}>
											{item.date || 'Дата не указана'}
										</div>
									</div>
								</div>
							</div>
							{hasProduct ? (
								<Link
									className={styles.feedback__item_product}
									to={`/product/${item?.productId}`}
								>
									<div className={styles.feedback__item_product_wrapper}>
										<img
											className={styles.feedback__item_product_image}
											src={product.imageUrl}
											alt='alt'
										/>
										<div className={styles.feedback__item_product_name}>
											{product.name}
										</div>
									</div>
								</Link>
							) : (
								<div>Товар недоступен</div>
							)}
						</div>
					);
				})}
			</Slider>
		</section>
	);
};

export default FeedbacksSlider;

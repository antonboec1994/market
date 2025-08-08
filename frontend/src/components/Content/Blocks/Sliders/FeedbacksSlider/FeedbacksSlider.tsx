import StarRating from '@/components/Content/Elements/StarRating/StarRating';
import { SelectFeedbacks } from '@/redux/getFeedbacks/selectors';
import { SelectGetProducts } from '@/redux/getProducts/selectors';
import { Status } from '@/redux/getProducts/types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import styles from './FeedbacksSlider.module.scss';

const FeedbacksSlider = () => {
	const { feedbacksAll, statusAll } = useSelector(SelectFeedbacks);
	const { productsAll } = useSelector(SelectGetProducts);

	const settings = {
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dots: true,
		autoplay: true,
		autoplaySpeed: 5000,
		cssEase: 'ease-out',
	};

	const findProductFunc = (id: number) => {
		const findProduct = productsAll?.find(product => {
			return product?.id === id;
		});
		return (
			<div className={styles.feedback__item_product_wrapper}>
				<img
					className={styles.feedback__item_product_image}
					src={findProduct?.imageUrl}
					alt='alt'
				/>
				<div className={styles.feedback__item_product_name}>
					{findProduct?.name}
				</div>
			</div>
		);
	};

	return (
		<section className='feedback'>
			<div className='title_head'>
				<h2 className='title_head__title'>Отзывы наших клиентов</h2>
			</div>
			{statusAll === Status.LOADING ? (
				'Идёт загрузка!'
			) : (
				<Slider className='feedback__slider' {...settings}>
					{feedbacksAll.slice(0, 10).map((item, index) => {
						return (
							<div className={styles.feedback__item} key={index}>
								<div className={styles.feedback__item_box}>
									<div className={styles.feedback__item_text}>
										{item?.feedbackMessage}
									</div>
									<div className={styles.feedback__item_author}>
										<div className={styles.feedback__item_author_info}>
											<div className={styles.feedback__item_author_rating}>
												<StarRating rating={item?.rating} editValue={false} />
											</div>
											<div className={styles.feedback__item_author_name}>
												{item?.userName}
											</div>
											<div className={styles.feedback__item_author_date}>
												{item?.date}
											</div>
										</div>
									</div>
								</div>
								<Link
									className={styles.feedback__item_product}
									to={`/product/${item?.productId}`}
								>
									{findProductFunc(item?.productId)}
								</Link>
							</div>
						);
					})}
				</Slider>
			)}
		</section>
	);
};

export default FeedbacksSlider;

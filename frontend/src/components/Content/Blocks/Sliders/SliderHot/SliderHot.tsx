import AddToCartBtn from '@/components/Content/Elements/Buttons/AddToCartBtn';
import ViewBtn from '@/components/Content/Elements/Buttons/ViewBtn';
import { SelectAuth } from '@/redux/auth/selectors';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import styles from './SliderHot.module.scss';
import { useGetProductsQuery } from '@/redux/getProducts/api';

const SliderHot = () => {
	const settings = {
		dots: true,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 3500,
		speed: 2000,
		cssEase: 'ease-out',
		slidesToShow: 1,
		slidesToScroll: 1,
		infinite: true,
	};

	const { data: productsAll } = useGetProductsQuery();
	const { isLogged } = useSelector(SelectAuth);

	const findProducts = productsAll
		? productsAll?.filter(item => {
				return item?.hotImage;
		  })
		: [];

	return (
		<Slider className='sliders__slider_hot' {...settings}>
			{findProducts?.map((item, index) => (
				<div className={styles.slide} key={index}>
					<h3 className={styles.slide__title}>Горячее</h3>
					<div
						className={styles.slide__image}
						style={{ backgroundImage: 'url(' + item?.hotImage + ')' }}
					></div>
					<div className={styles.slide__info}>
						<Link
							className={styles.slide__info_title}
							to={`/product/${item?.id}`}
						>
							{item?.name}
						</Link>
						<div className={styles.slide__info_links}>
							<ViewBtn itemId={item?.id} />
							{isLogged && <AddToCartBtn product={item} />}
						</div>
					</div>
				</div>
			))}
		</Slider>
	);
};

export default SliderHot;

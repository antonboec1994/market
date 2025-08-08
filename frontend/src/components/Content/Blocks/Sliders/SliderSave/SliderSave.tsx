import { SelectGetProducts } from '@/redux/getProducts/selectors';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import warehouse from '../../../../../assets/images/top-slider-hot/warehouse.png';
import styles from './SliderSave.module.scss';

const SliderSave = () => {
	const settings = {
		autoplay: true,
		speed: 4000,
		autoplaySpeed: 3000,
		cssEase: 'ease-out',
		slidesToShow: 1,
		slidesToScroll: 1,
		infinite: true,
		fade: true,
		responsive: [
			{
				breakpoint: 481,
				settings: {
					arrows: false,
				},
			},
		],
	};

	const { productsAll } = useSelector(SelectGetProducts);

	const findProducts = productsAll?.filter(item => {
		return item?.saveImage;
	});

	return (
		<Slider className='sliders__slider_save' {...settings}>
			{findProducts.map((item, index) => (
				<Link
					className={styles.sliders__save_item}
					key={index}
					to={`/product/${item?.id}`}
				>
					<img src={item?.saveImage} alt='alt' />
					<div
						className={styles.sliders__save_item_type}
						style={{ backgroundImage: 'url(' + warehouse + ')' }}
					></div>
				</Link>
			))}
		</Slider>
	);
};

export default SliderSave;

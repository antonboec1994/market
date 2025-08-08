import Slider from 'react-slick';
import styles from './Brands.module.scss';

export const brandsList = [
	{ image: '../images/brands/brands-1.jpg' },
	{ image: '../images/brands/brands-2.jpg' },
	{ image: '../images/brands/brands-3.jpg' },
	{ image: '../images/brands/brands-4.jpg' },
	{ image: '../images/brands/brands-5.jpg' },
	{ image: '../images/brands/brands-6.jpg' },
	{ image: '../images/brands/brands-7.jpg' },
	{ image: '../images/brands/brands-8.jpg' },
	{ image: '../images/brands/brands-9.jpg' },
	{ image: '../images/brands/brands-10.jpg' },
	{ image: '../images/brands/brands-11.jpg' },
	{ image: '../images/brands/brands-12.jpg' },
	{ image: '../images/brands/brands-13.jpg' },
	{ image: '../images/brands/brands-14.jpg' },
	{ image: '../images/brands/brands-15.jpg' },
	{ image: '../images/brands/brands-16.jpg' },
	{ image: '../images/brands/brands-17.jpg' },
	{ image: '../images/brands/brands-18.jpg' },
];

const Brands: React.FC = () => {
	let countToShow = 0;
	if (brandsList.length <= 6) {
		countToShow = brandsList.length;
	} else {
		countToShow = 6;
	}

	const settings = {
		slidesToShow: countToShow,
		slidesToScroll: 3,
		variableWidth: true,
		autoplay: true,
		autoplaySpeed: 3500,
		cssEase: 'ease-out',
	};
	return (
		<section className='brands'>
			<Slider className='brands__slider' {...settings}>
				{brandsList.map((item, index) => (
					<div className={styles.brands__item} key={index}>
						<img
							className={styles.brands__item_image}
							src={item.image}
							alt='alt'
						/>
					</div>
				))}
			</Slider>
		</section>
	);
};

export default Brands;

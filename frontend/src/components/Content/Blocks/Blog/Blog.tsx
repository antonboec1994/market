import { SelectBlog } from '@/redux/getBlog/selectors';
import { Status } from '@/redux/getProducts/types';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import styles from './Blog.module.scss';

const Blog: React.FC = () => {
	const { posts, status } = useSelector(SelectBlog);

	let countToShow = 0;
	if (posts.length <= 3) {
		countToShow = posts.length;
	} else {
		countToShow = 3;
	}

	const settings = {
		slidesToShow: countToShow,
		slidesToScroll: 1,
		arrows: false,
		dots: true,
		autoplay: true,
		autoplaySpeed: 5000,
		cssEase: 'ease-out',
		responsive: [
			{
				breakpoint: 1201,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 769,
				settings: {
					slidesToShow: 1,
				},
			},
		],
	};

	return (
		<>
			<section className='blog'>
				<div className='title_head'>
					<h2 className='title_head__title'>блог</h2>
				</div>
				{status === Status.LOADING ? (
					'Идёт загрузка!'
				) : (
					<Slider className='blog__slider' {...settings}>
						{posts.map((item, index) => (
							<div className={styles.blog__item} key={index}>
								<img
									className={styles.blog__item_image}
									src={item.imageUrl}
									alt='alt'
								/>
								<div className={styles.blog__item_box}>
									<div className={styles.blog__item_comments}>
										<div className={styles.blog__item_date}>{item.date}</div>
									</div>
									<div className={styles.blog__item_title}>{item.title}</div>
									<div className={styles.blog__item_text}>
										{item.description}
									</div>
								</div>
							</div>
						))}
					</Slider>
				)}
			</section>
		</>
	);
};

export default Blog;

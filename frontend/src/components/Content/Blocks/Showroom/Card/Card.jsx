import React from 'react';
import Slider from 'react-slick';

import { useState } from 'react';

import LightboxModal from '@/components/Content/Elements/LightboxModal/LightboxModal';

import styles from '../Showroom.module.scss';

const Card = ({ findItem }) => {
	const countToShow = 6;
	let settings1 = {};
	let settings2 = {};

	if (findItem.slides.length <= countToShow) {
		settings1 = {
			slidesToShow: 1,
			slidesToScroll: 1,
			lazyLoad: true,
			infinity: true,
			arrows: false,
			fade: true,
		};
		settings2 = {
			slidesToShow: findItem.slides.length,
			slidesToScroll: 1,
			lazyLoad: true,
			infinity: true,
		};
	} else {
		settings1 = {
			slidesToShow: 1,
			slidesToScroll: 1,
			lazyLoad: true,
			infinity: true,
			arrows: false,
			fade: true,
		};
		settings2 = {
			slidesToShow: countToShow,
			slidesToScroll: 1,
			lazyLoad: true,
			infinity: true,
		};
	}

	const [nav1, setNav1] = useState();
	const [nav2, setNav2] = useState();

	const [clickedImage, setClickedImage] = useState(null);
	const [clickedImageIndex, setClickedImageIndex] = useState(null);
	const imageClick = (item, index) => {
		setClickedImage(item);
		setClickedImageIndex(index);
	};
	const imagePrev = () => {
		const totalLength = findItem?.slides.length;
		if (clickedImageIndex === 0) {
			setClickedImageIndex(totalLength - 1);
			const newUrl = findItem?.slides[totalLength - 1];
			setClickedImage(newUrl);
			return;
		}
		const newIndex = clickedImageIndex - 1;
		const newUrl = findItem?.slides.filter(item => {
			return findItem?.slides.indexOf(item) === newIndex;
		});
		const newItem = newUrl[0];
		setClickedImage(newItem);
		setClickedImageIndex(newIndex);
	};
	const imageNext = () => {
		const totalLength = findItem?.slides.length;
		if (clickedImageIndex + 1 >= totalLength) {
			setClickedImageIndex(0);
			const newUrl = findItem?.slides[0];
			setClickedImage(newUrl);
			return;
		}
		const newIndex = clickedImageIndex + 1;
		const newUrl = findItem?.slides.filter(item => {
			return findItem?.slides.indexOf(item) === newIndex;
		});
		const newItem = newUrl[0];
		setClickedImage(newItem);
		setClickedImageIndex(newIndex);
	};

	return (
		<>
			<div className={styles.page_showroom__item}>
				<div className={styles.page_showroom__item_name}>{findItem.name}</div>
				<Slider
					className='page_showroom__item_mainimage'
					{...settings1}
					asNavFor={nav2}
					ref={slider1 => setNav1(slider1)}
				>
					{findItem.slides.map((item, index) => (
						<a key={index} onClick={() => imageClick(item, index)}>
							<img src={item} alt='alt' />
						</a>
					))}
				</Slider>
				<Slider
					className='page_showroom__item_thumbimage'
					{...settings2}
					asNavFor={nav1}
					ref={slider2 => setNav2(slider2)}
				>
					{findItem.slides.map((item, index) => (
						<a key={index} onClick={() => imageClick(item, index)}>
							<img src={item} alt='alt' />
						</a>
					))}
				</Slider>
			</div>
			{clickedImage && (
				<LightboxModal
					clickedImage={clickedImage}
					imageNext={imageNext}
					imagePrev={imagePrev}
					setClickedImage={setClickedImage}
				/>
			)}
		</>
	);
};

export default Card;

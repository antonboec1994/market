import { menuList } from '@/redux/filters/consts';
import { setMenuUrlValue } from '@/redux/filters/slice';
import { useAppDispatch } from '@/redux/store';
import Blog from '../components/Content/Blocks/Blog/Blog';
import Brands from '../components/Content/Blocks/Brands/Brands';
import Gallery from '../components/Content/Blocks/Gallery/Gallery';
import Offers from '../components/Content/Blocks/Offers/Offers';
import Feedback from '../components/Content/Blocks/Sliders/FeedbacksSlider/FeedbacksSlider';
import Sliders from '../components/Content/Blocks/Sliders/Sliders';
import { useEffect } from 'react';

const HomePage = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(setMenuUrlValue(menuList[0]));
	}, [dispatch]);

	return (
		<>
			<Sliders />
			<Offers />
			<Gallery />
			<Blog />
			<Brands />
			<Feedback />
		</>
	);
};

export default HomePage;

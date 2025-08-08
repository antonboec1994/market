import About from '@/components/Content/Blocks/About/About';
import Breadcrumbs from '@/components/Content/Blocks/Breadcrumbs/Breadcrumbs';
import Subscribe from '@/components/Content/Blocks/Subscribe/Subscribe';
import { setMenuUrlValue } from '@/redux/filters/slice';
import { useAppDispatch } from '@/redux/store';
import { useEffect } from 'react';

const AboutPage = () => {
	const dispatch = useAppDispatch();
	const pageTitle: string = 'О нас';

	useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(setMenuUrlValue(''));
	}, [dispatch]);

	return (
		<>
			<Breadcrumbs pageTitle={pageTitle} />
			<About />
			<Subscribe />
		</>
	);
};

export default AboutPage;

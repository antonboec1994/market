import Banner from '@/components/Content/Blocks/Banner/Banner';
import Brands from '@/components/Content/Blocks/Brands/Brands';
import Breadcrumbs from '@/components/Content/Blocks/Breadcrumbs/Breadcrumbs';
import Showroom from '@/components/Content/Blocks/Showroom/Showroom';
import Subscribe from '@/components/Content/Blocks/Subscribe/Subscribe';
import { menuList } from '@/redux/filters/consts';
import { setMenuUrlValue } from '@/redux/filters/slice';
import { useAppDispatch } from '@/redux/store';
import { useEffect } from 'react';

const ShowroomPage = () => {
	const dispatch = useAppDispatch();
	const pageTitle: string = 'Шоу-рум';

	useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(setMenuUrlValue(menuList[3]));
	}, [dispatch]);
	return (
		<>
			<Banner />
			<Breadcrumbs pageTitle={pageTitle} />
			<Showroom />
			<Brands />
			<Subscribe />
		</>
	);
};

export default ShowroomPage;

import Banner from '@/components/Content/Blocks/Banner/Banner';
import Brands from '@/components/Content/Blocks/Brands/Brands';
import Breadcrumbs from '@/components/Content/Blocks/Breadcrumbs/Breadcrumbs';
import Partnership from '@/components/Content/Blocks/Partnership/Partnership';
import Subscribe from '@/components/Content/Blocks/Subscribe/Subscribe';
import { menuList } from '@/redux/filters/consts';
import { setMenuUrlValue } from '@/redux/filters/slice';
import { useAppDispatch } from '@/redux/store';
import { useEffect } from 'react';

const PartnershipPage = () => {
	const dispatch = useAppDispatch();
	const pageTitle: string = 'Партнерство';

	useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(setMenuUrlValue(menuList[4]));
	}, [dispatch]);

	return (
		<>
			<Banner />
			<Breadcrumbs pageTitle={pageTitle} />
			<Partnership />
			<Brands />
			<Subscribe />
		</>
	);
};

export default PartnershipPage;

import Banner from '@/components/Content/Blocks/Banner/Banner';
import Brands from '@/components/Content/Blocks/Brands/Brands';
import Breadcrumbs from '@/components/Content/Blocks/Breadcrumbs/Breadcrumbs';
import Payment from '@/components/Content/Blocks/Payment/Payment';
import Subscribe from '@/components/Content/Blocks/Subscribe/Subscribe';
import { menuList } from '@/redux/filters/consts';
import { setMenuUrlValue } from '@/redux/filters/slice';
import { useAppDispatch } from '@/redux/store';
import { useEffect } from 'react';

const PaymentPage = () => {
	const dispatch = useAppDispatch();
	const pageTitle: string = 'Оплата';

	useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(setMenuUrlValue(menuList[5]));
	}, [dispatch]);
	return (
		<>
			<Banner />
			<Breadcrumbs pageTitle={pageTitle} />
			<Payment />
			<Brands />
			<Subscribe />
		</>
	);
};

export default PaymentPage;

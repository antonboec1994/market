import Breadcrumbs from '@/components/Content/Blocks/Breadcrumbs/Breadcrumbs';
import Cart from '@/components/Content/Blocks/Cart/Cart';
import Subscribe from '@/components/Content/Blocks/Subscribe/Subscribe';
import { SelectFilters } from '@/redux/filters/selectors';
import { setMenuUrlValue } from '@/redux/filters/slice';
import { useAppDispatch } from '@/redux/store';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const CartPage = () => {
	const { menuUrlValue } = useSelector(SelectFilters);
	const dispatch = useAppDispatch();
	const pageTitle: string = 'Корзина';

	useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(setMenuUrlValue(''));
	}, [menuUrlValue, dispatch]);

	return (
		<>
			<Breadcrumbs pageTitle={pageTitle} />
			<Cart />
			<Subscribe />
		</>
	);
};

export default CartPage;

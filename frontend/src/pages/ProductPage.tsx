import Breadcrumbs from '@/components/Content/Blocks/Breadcrumbs/Breadcrumbs';
import Feedbacks from '@/components/Content/Blocks/Feedbacks/Feedbacks';
import ProductInfo from '@/components/Content/Blocks/ProductInfo/ProductInfo';
import PopularSlider from '@/components/Content/Blocks/Sliders/PopularSlider/PopularSlider';
import Subscribe from '@/components/Content/Blocks/Subscribe/Subscribe';
import { SelectFilters } from '@/redux/filters/selectors';
import { setMenuUrlValue, setSearchModal } from '@/redux/filters/slice';
import { useGetProductsQuery } from '@/redux/getProducts/api';
import { useAppDispatch } from '@/redux/store';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const ProductPage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { data: productsAll, isLoading } = useGetProductsQuery();
	const { menuUrlValue } = useSelector(SelectFilters);
	const { id } = useParams();
	const product = productsAll?.find(obj => obj.id === Number(id));
	const pageTitle = product?.name;

	useEffect(() => {
		dispatch(setSearchModal(false));
		dispatch(setMenuUrlValue(''));
	}, [menuUrlValue, dispatch]);

	useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(setSearchModal(false));
	}, [id, dispatch]);

	return (
		<>
			{isLoading ? (
				'Идёт загрузка!'
			) : (
				<>
					<Breadcrumbs pageTitle={pageTitle} />
					{product ? (
						<>
							<ProductInfo product={product} />
							<Feedbacks product={product} />
							<PopularSlider category={product?.category} />
						</>
					) : (
						navigate('error')
					)}
					<Subscribe />
				</>
			)}
		</>
	);
};

export default ProductPage;

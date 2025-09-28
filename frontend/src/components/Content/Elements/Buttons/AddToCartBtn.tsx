import type { ProductType } from '@/redux/getProducts/types';
import styles from './Buttons.module.scss';
import { useAddToCart } from '@/utils/customHooks/useAddToCart';

type AddToCartBtnPropsType = {
	product: ProductType;
};

const AddToCartBtn: React.FC<AddToCartBtnPropsType> = ({ product }) => {
	const handleAddToCart = useAddToCart();
	return (
		<>
			<div
				className={`${styles.slide__info_link} icon_shopping_basket`}
				onClick={() => handleAddToCart(product)}
			></div>
		</>
	);
};

export default AddToCartBtn;

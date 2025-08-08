import { OnClickAddToCart } from '@/utils/onClickAddToCart';
import styles from './Buttons.module.scss';
import type { ProductType } from '@/redux/getProducts/types';

type AddToCartBtnPropsType = {
	product: ProductType;
};

const AddToCartBtn: React.FC<AddToCartBtnPropsType> = ({ product }) => {
	return (
		<>
			<div
				className={`${styles.slide__info_link} icon_shopping_basket`}
				onClick={() => OnClickAddToCart(product)}
			></div>
		</>
	);
};

export default AddToCartBtn;

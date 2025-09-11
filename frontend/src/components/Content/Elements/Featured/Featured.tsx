import { formatNumber } from '@/utils/formatNumbers';
import { OnClickAddToCart } from '@/utils/onClickAddToCart';
import { Link } from 'react-router-dom';
import styles from './Featured.module.scss';
import type { ProductType } from '@/redux/getProducts/types';
import { useGetProductsQuery } from '@/redux/getProducts/api';

const Featured = () => {
	const { data: products } = useGetProductsQuery();

	const findProducts = products?.filter(item => item.featured);

	return (
		<div className={styles.products__aside_featured}>
			<div className={styles.products__featured_title}>Популярное</div>
			<div className={styles.products__featured_inner}>
				{findProducts?.map((product: ProductType, index: number) => (
					<div className={styles.products__featured_item} key={index}>
						<div className={styles.products__featured_image}>
							<img src={product.imageUrl} alt='alt' />
						</div>
						<div className={styles.products__featured_info}>
							<Link
								className={styles.products__featured_name}
								to={`/product/${product.id}`}
							>
								{product.name}
							</Link>
							<div className={styles.products__featured_price}>
								{formatNumber(product.salePrice)}р
							</div>
							<div className={styles.products__featured_rate}></div>
							<div
								className={styles.products__featured_button}
								onClick={() => OnClickAddToCart(product)}
							>
								В корзину
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Featured;

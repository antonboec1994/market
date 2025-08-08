import { SelectCart } from '@/redux/cart/selectors';
import { setCartModalStatus } from '@/redux/cart/slice';
import { useAppDispatch } from '@/redux/store';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AddToCartCalcform from '../../Buttons/AddToCartCalcform';
import DeleteFromCartBtn from '../../Buttons/DeleteFromCartBtn';
import styles from './CartModal.module.scss';

const CartModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const { productsInCart, cartModalStatus } = useSelector(SelectCart);
	const url = typeof window !== 'undefined' ? window.location.href : '';
	const urlPathCartPage = url.includes('cart');

	useEffect(() => {
		dispatch(setCartModalStatus(false));
	}, [url, dispatch]);

	const modalClose = (e: any) => {
		if (e.target.classList.contains('dismiss')) {
			dispatch(setCartModalStatus(false));
		}
	};

	return (
		<div
			className={
				cartModalStatus && !urlPathCartPage
					? `${styles.cartModal} dismiss ${styles.active}`
					: `${styles.cartModal} dismiss`
			}
			onClick={modalClose}
		>
			<div className={styles.cartModal__content}>
				<div className={`${styles.cartModal__close} dismiss`}></div>
				<div className={styles.cartModal__items}>
					{productsInCart.map((item: any, index) => (
						<div className={styles.cartModal__item} key={index}>
							<img
								className={styles.cartModal__item_image}
								src={item.imageUrl}
								alt='alt'
							/>
							<div className={styles.cartModal__item_info}>
								<Link
									className={styles.cartModal__item_name}
									to={`/product/${item.productId}`}
								>
									{item.name}
								</Link>
								<div className={styles.cartModal__item_saleprice}>
									{item.salePrice} р
								</div>
								<div className={styles.cartModal__item_price}>
									{item.price} р
								</div>
								<div className={styles.cartModal__item_box}>
									<AddToCartCalcform item={item} />
									<DeleteFromCartBtn item={item} />
								</div>
							</div>
						</div>
					))}
				</div>
				<Link className={styles.cartModal__gotocartbtn} to='/cart'>
					Перейти в корзину
				</Link>
			</div>
		</div>
	);
};

export default CartModal;

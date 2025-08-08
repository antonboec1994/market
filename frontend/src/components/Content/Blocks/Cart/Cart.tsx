import AddToCartCalcform from '@/components/Content/Elements/Buttons/AddToCartCalcform';
import DeleteFromCartBtn from '@/components/Content/Elements/Buttons/DeleteFromCartBtn';
import { SelectAuth } from '@/redux/auth/selectors';
import { SelectCart } from '@/redux/cart/selectors';
import { setOrderModalStatus } from '@/redux/cart/slice';
import { clearCart, fetchGetCart } from '@/redux/cart/thunks';
import { useAppDispatch } from '@/redux/store';
import { formatNumber } from '@/utils/formatNumbers';
import { normalize_count_form } from '@/utils/normalizeWordsForm';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './Cart.module.scss';
import type { CardTypeInCart } from '@/redux/cart/types';

const Cart: React.FC = () => {
	const dispatch = useAppDispatch();
	const { isLogged } = useSelector(SelectAuth);
	const { productsInCart } = useSelector(SelectCart);

	const sumCountInCart = () => {
		const cart = localStorage.getItem('cart');
		if (!cart) return 0;
		try {
			const parsedCart = JSON.parse(cart);
			return parsedCart.reduce(
				(sum: number, item: CardTypeInCart) => sum + item.count,
				0
			);
		} catch (error) {
			console.error('Failed to parse cart from localStorage', error);
			return 0;
		}
	};
	const sumPriceInCart = () => {
		const cart = localStorage.getItem('cart');
		if (!cart) return 0;
		try {
			const parsedCart = JSON.parse(cart);
			return parsedCart.reduce(
				(sum: number, item: CardTypeInCart) => sum + item.price * item.count,
				0
			);
		} catch (error) {
			console.error('Failed to parse cart from localStorage', error);
			return 0;
		}
	};
	const sumSalePriceInCart = () => {
		const cart = localStorage.getItem('cart');
		if (!cart) return 0;
		try {
			const parsedCart = JSON.parse(cart);
			return parsedCart.reduce(
				(sum: number, item: CardTypeInCart) =>
					sum + item.salePrice * item.count,
				0
			);
		} catch (error) {
			console.error('Failed to parse cart from localStorage', error);
			return 0;
		}
	};

	const onClickOrder = () => {
		dispatch(setOrderModalStatus(true));
	};

	const onClickClear = async () => {
		localStorage.removeItem('cart');
		await dispatch(clearCart());
		await dispatch(fetchGetCart());
	};

	return (
		<>
			<div className={styles.cart}>
				{productsInCart.length > 0 ? (
					<div className={styles.cart__inner}>
						<div className={styles.cart__left}>
							<div className={styles.cart__title}>Корзина</div>
							<div
								className={styles.cart__clearbtn}
								onClick={() => onClickClear()}
							>
								Очистить корзину
							</div>
							<div className={styles.cart__items}>
								{productsInCart.map((item, index) => (
									<div className={styles.cart__item} key={index}>
										<Link
											className={styles.cart__item_image}
											to={`/product/${item.productId}`}
										>
											<img
												src={window.location.origin + item.imageUrl}
												alt='alt'
											/>
										</Link>
										<div className={styles.cart__item_info}>
											<Link
												className={styles.cart__item_name}
												to={`/product/${item.productId}`}
											>
												{item.name}
											</Link>
											<div className={styles.cart__item_calcbox}>
												<AddToCartCalcform item={item} />
												<DeleteFromCartBtn item={item} />
											</div>
										</div>
										<div className={styles.cart__item_total}>
											<div className={styles.cart__item_totalsaleprice}>
												{formatNumber(item.currentTotalSalePrice)} ₽
											</div>
											<div className={styles.cart__item_totalprice}>
												{formatNumber(item.currentTotalPrice)} ₽
											</div>
											<div className={styles.cart__item_priceforone}>
												{formatNumber(item.salePrice)} ₽ за 1 шт
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
						<div className={styles.cart__right}>
							<div className={styles.cart__title}>Общая стоимость</div>
							<div className={styles.cart__results}>
								<div className={styles.cart__profit}>
									<div className={styles.cart__profit_text}>
										{sumCountInCart()}
										{normalize_count_form(sumCountInCart())}
									</div>
									<div className={styles.cart__profit_price}>
										{formatNumber(sumPriceInCart())} ₽
									</div>
								</div>
								<div className={styles.cart__profit}>
									<div className={styles.cart__profit_text}>Скидка</div>
									<div className={styles.cart__profit_profitprice}>
										{formatNumber(sumPriceInCart() - sumSalePriceInCart())} ₽
									</div>
								</div>
								<div className={styles.cart__result}>
									<div className={styles.cart__result_text}>Итого</div>
									<div className={styles.cart__result_price}>
										{formatNumber(sumSalePriceInCart())}₽
									</div>
								</div>
								<div
									className={styles.cart__orderbtn}
									onClick={() => onClickOrder()}
								>
									Оформить
								</div>
							</div>
						</div>
					</div>
				) : (
					<div className={styles.cart__inner}>
						<div className={styles.cart__left}>
							<div className={styles.cart__title}>Корзина</div>
							<div className={styles.cart__items}>
								{isLogged ? (
									<p>У вас нет добавленных в корзину товаров!</p>
								) : (
									<p>Войдите в ваш аккаунт для добавления товаров в корзину</p>
								)}
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default Cart;

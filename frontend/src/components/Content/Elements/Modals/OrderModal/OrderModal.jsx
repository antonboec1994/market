import { setOrderModalStatus } from '@/redux/cart/slice';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import ReactInputMask from 'react-input-mask';
import { useDispatch, useSelector } from 'react-redux';
import styles from './OrderModal.module.scss';

const OrderModal = () => {
	const dispatch = useDispatch();
	const { orderModalStatus } = useSelector(state => state.cart);
	const telRef = useRef(null);

	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm({
		mode: 'onBlur',
	});

	const onSubmit = () => {};

	const onChangeTel = e => {
		const tel = e.target.value.replace(/\D/g, '').replace(/^7/, '8');
		if (tel.length < 11) {
		} else {
		}
	};

	const modalClose = e => {
		if (e.target.classList.contains('dismiss')) {
			dispatch(setOrderModalStatus(false));
			console.log('click');
		}
	};

	return (
		<div
			className={
				orderModalStatus
					? `${styles.orderModal} ${styles.active}`
					: styles.orderModal
			}
			onClick={modalClose}
		>
			<div className={`${styles.orderModal__overlay} dismiss`}>
				<div className={styles.orderModal__content}>
					<div className={`${styles.orderModal__content_close} dismiss`}></div>
					<div className={styles.orderModal__content_title}>Оформить заказ</div>
					<form
						className={styles.orderModal__form}
						onSubmit={handleSubmit(onSubmit)}
					>
						<input
							className={styles.orderModal__input}
							type='text'
							placeholder='Ваше имя* ...'
							{...register('name', {
								required: 'Поле имя обязательно к заполнению',
							})}
						/>{' '}
						<div className={styles.product_feedback__form_errors}>
							{errors?.name && (
								<p>{errors?.name?.message || 'Обязательно заполните поля'}</p>
							)}
						</div>
						<ReactInputMask
							className={styles.orderModal__input}
							type='text'
							placeholder='Ваш телефон* ...'
							{...register('tel', {
								required: 'Поле телефон обязательно к заполнению',
							})}
							ref={telRef}
							mask='+7 (999) 99-99-999'
							onChange={e => onChangeTel(e)}
						/>
						<div className={styles.product_feedback__form_errors}>
							{errors?.tel && (
								<p>{errors?.tel?.message || 'Обязательно заполните поля'}</p>
							)}
						</div>
						<textarea
							className={styles.orderModal__textarea}
							placeholder='Ваше сообщение ...'
							{...register('message')}
						></textarea>
						<div className={styles.orderModal__checkbox}>
							<input type='checkbox' />
							<label>
								Подтверждаю согласие на обработку персональных данных
							</label>
						</div>
						<button className={styles.orderModal__btn} type='submit'>
							Отправить
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default OrderModal;

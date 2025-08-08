import StarRating from '@/components/Content/Elements/StarRating/StarRating';
import { Success } from '@/errors';
import { SelectAuth } from '@/redux/auth/selectors';
import { setLoginModalStatus, setRequestError } from '@/redux/auth/slice';
import { SelectFeedbacks } from '@/redux/getFeedbacks/selectors';
import { addFeedback, fetchFeedbacks } from '@/redux/getFeedbacks/thunks';
import type { FeedbacksType } from '@/redux/getFeedbacks/types';
import { Status, type ProductType } from '@/redux/getProducts/types';
import {
	ntfMessageAddNewfeedback,
	ntfTypeAddNewfeedback,
} from '@/redux/notification/consts';
import { useAppDispatch } from '@/redux/store';
import { getDate, getTime } from '@/utils/getDateTime';
import { DispatchNotification } from '@/utils/notificationDispatch';
import { addFeedbackSchema } from '@/utils/yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import styles from './Feedbacks.module.scss';
import FeedbacksItem from './FeedbacksItem';

type feedbacksProps = {
	product: ProductType;
};

interface FeedbacksFormInputs {
	feedbackMessage: string;
}

const Feedbacks: React.FC<feedbacksProps> = ({ product }) => {
	const dispatch = useAppDispatch();
	const [currProductFeedbacks, setCurrProductFeedbacks] = useState<
		FeedbacksType[]
	>([]);
	const { user } = useSelector(SelectAuth);
	const { feedbackRating, feedbacks, status, feedbacksAll, statusAll } =
		useSelector(SelectFeedbacks);
	const { isLogged } = useSelector(SelectAuth);

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<FeedbacksFormInputs>({
		mode: 'onBlur',
		resolver: yupResolver(addFeedbackSchema),
	});

	useEffect(() => {
		if (isLogged && status === Status.SUCCESS) {
			setCurrProductFeedbacks(
				feedbacks.filter(item => item.productId === product.id)
			);
		} else if (statusAll === Status.SUCCESS) {
			setCurrProductFeedbacks(
				feedbacksAll.filter(item => item.productId === product.id)
			);
		}
	}, [feedbacks, feedbacksAll, status, statusAll, isLogged, product.id]);

	const onSubmit = async (data: any) => {
		dispatch(setRequestError(''));
		const feedback = {
			productId: product.id,
			date: getDate(),
			time: getTime(),
			rating: feedbackRating,
			userId: user.id,
			userEmail: user.email,
			userName: user.name,
			feedbackMessage: data.feedbackMessage,
		};
		const res = await dispatch(addFeedback(feedback));
		if ('error' in res) {
			const errorMessage = res.payload || res.error.message;
			dispatch(setRequestError(errorMessage));
		} else {
			await dispatch(fetchFeedbacks());
			dispatch(setRequestError(Success.successAddedFeedback));
			DispatchNotification(
				true,
				product,
				ntfMessageAddNewfeedback,
				ntfTypeAddNewfeedback
			);
		}
	};

	const Login = () => {
		dispatch(setLoginModalStatus(true));
	};

	return (
		<>
			<section className={styles.product_feedback} id='feedbacks'>
				<div className='title_head'>
					<h2 className='title_head__title'>Отзывы</h2>
				</div>
				<div className={styles.product_feedback__inner}>
					{currProductFeedbacks?.length > 0 ? (
						<div className={styles.product_feedback__items}>
							{currProductFeedbacks.map(
								(item: FeedbacksType, index: number) => (
									<FeedbacksItem item={item} key={index} ix={index} />
								)
							)}
						</div>
					) : (
						<p className={styles.product_feedback__inner_text}>
							Нет никаких отзывов на этот продукт.
						</p>
					)}
					{isLogged ? (
						<form
							className={styles.product_feedback__inner_form}
							onSubmit={handleSubmit(onSubmit)}
						>
							<div className={styles.product_feedback__inner_title}>
								Добавить ваш отзыв
							</div>
							<div className={styles.product_feedback__inner_ratebox}>
								<p className={styles.product_feedback__inner_text}>Рейтинг</p>
								<StarRating rating={feedbackRating} editValue={true} />
							</div>
							<div className={styles.product_feedback__form_box}>
								<TextField
									className={styles.product_feedback__form_textarea}
									label='Напишите ваш отзыв'
									{...register('feedbackMessage')}
									variant='outlined'
									multiline
									rows={5}
									error={!!errors.feedbackMessage}
									helperText={
										errors.feedbackMessage
											? `${errors.feedbackMessage.message}`
											: ''
									}
								/>
								<button
									className={styles.product_feedback__form_button}
									type='submit'
								>
									Отправить
								</button>
							</div>
						</form>
					) : (
						<>
							<p className={styles.isNoLogged}>
								Выполните вход, для того чтобы оставить ваш отзыв.
							</p>
							<button className={styles.login} onClick={() => Login()}>
								Войти
							</button>
						</>
					)}
				</div>
			</section>
		</>
	);
};

export default Feedbacks;

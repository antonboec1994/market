import StarRating from '@/components/Content/Elements/StarRating/StarRating';
import { Success } from '@/errors';
import { SelectAuth } from '@/redux/auth/selectors';
import { setLoginModalStatus, setRequestError } from '@/redux/auth/slice';
import { SelectFeedbacks } from '@/redux/getFeedbacks/selectors';
import { type ProductType } from '@/redux/getProducts/types';
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
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import styles from './Feedbacks.module.scss';
import FeedbacksItem from './FeedbacksItem';
import type { FeedbackType } from '@/redux/getFeedbacks/types';
import {
	useAddFeedbackMutation,
	useGetFeedbacksQuery,
} from '@/redux/getFeedbacks/api';

type feedbacksProps = {
	product: ProductType;
};

interface FeedbacksFormInputs {
	feedbackMessage: string;
}

const Feedbacks: React.FC<feedbacksProps> = ({ product }) => {
	const dispatch = useAppDispatch();
	const { userData, isLogged } = useSelector(SelectAuth);
	const { feedbackRating } = useSelector(SelectFeedbacks);
	const { data } = useGetFeedbacksQuery({});
	const [addFeedback] = useAddFeedbackMutation();

	const user = userData?.user;
	const currProductFeedbacks =
		data?.feedbacks.filter(item => item.productId === product.id) || [];

	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm<FeedbacksFormInputs>({
		mode: 'onBlur',
		resolver: yupResolver(addFeedbackSchema),
	});

	const onSubmit = async (data: any) => {
		dispatch(setRequestError(''));
		if (!user) return;
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
		try {
			await addFeedback(feedback).unwrap();
			dispatch(setRequestError(Success.successAddedFeedback));
			DispatchNotification(
				true,
				product,
				ntfMessageAddNewfeedback,
				ntfTypeAddNewfeedback
			);
			reset();
		} catch (error: any) {
			dispatch(
				setRequestError(error.message || 'Ошибка при добавлении отзыва')
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
							{currProductFeedbacks.map((item: FeedbackType, index: number) => (
								<FeedbacksItem item={item} key={index} ix={index} />
							))}
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

import StarRating from '@/components/Content/Elements/StarRating/StarRating';
import { deleteFeedback } from '@/redux/getFeedbacks/thunks';
import type { FeedbacksType } from '@/redux/getFeedbacks/types';
import { SelectGetProducts } from '@/redux/getProducts/selectors';
import {
	ntfMessageDeletefeedback,
	ntfTypeDeletefeedback,
} from '@/redux/notification/consts';
import { useAppDispatch } from '@/redux/store';
import { DispatchNotification } from '@/utils/notificationDispatch';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import styles from './Feedbacks.module.scss';

type feedbackItemProps = {
	item: FeedbacksType;
	ix: number;
	initialCountfeedbackToShow?: number;
};

const FeedbacksItem: React.FC<feedbackItemProps> = ({
	item,
	ix,
	initialCountfeedbackToShow,
}) => {
	const dispatch = useAppDispatch();
	const { productsAll } = useSelector(SelectGetProducts);
	const currentfeedbackProductId = item?.productId;
	const location = useLocation();
	const [show, setShow] = useState(false);
	const pathnameProduct = location.pathname.includes('product');
	const pathnameProfile = location.pathname.includes('profile');

	const findProduct = productsAll.find(item => {
		return item?.id === currentfeedbackProductId;
	});

	const checkIfItemIsInitial = () => {
		if (initialCountfeedbackToShow) {
			if (initialCountfeedbackToShow < ix + 1) {
				return 'itemIsNotInitial';
			} else {
				return 'itemIsInitial';
			}
		} else {
			return;
		}
	};

	const feedbackDelete = async () => {
		if (window.confirm('Удалить выбранный отзыв?')) {
			const res = await dispatch(deleteFeedback(item.id));
			if (res.meta.requestStatus === 'fulfilled') {
				window.alert('Отзыв успешно удалён');
				findProduct &&
					DispatchNotification(
						true,
						findProduct,
						ntfMessageDeletefeedback,
						ntfTypeDeletefeedback
					);
				window.location.reload();
			} else {
				const errorMessage = res.payload || 'Неизвестная ошибка';
				window.alert(`Ошибка ${errorMessage}`);
			}
		}
	};

	useEffect(() => {
		setShow(!show);
	}, []);

	return (
		<CSSTransition
			className={`${
				styles.product_feedback__item
			} ${checkIfItemIsInitial()}  alert`}
			in={show}
			timeout={300}
		>
			<div>
				<div className={styles.product_feedback_item_databox}>
					<div>
						<div className={styles.product_feedback__item_number}>
							Отзыв № {item?.id}
						</div>
						<div className={styles.product_feedback__item_date}>
							<span>
								<strong>Дата</strong> {item?.date}
							</span>
							<span>
								<strong>Время</strong> {item?.time}
							</span>
						</div>
					</div>
					{!pathnameProduct && (
						<Link
							className={styles.product_feedback__item_productId}
							to={`/product/${item?.productId}`}
						>
							<img
								className={styles.product_feedback__item_productImage}
								src={findProduct?.imageUrl}
								alt='image'
							/>
							<div className={styles.product_feedback__item_productName}>
								{findProduct?.name}
							</div>
						</Link>
					)}
				</div>
				<div className={styles.product_feedback_topbox}>
					<div className={styles.product_feedback__item_box}>
						<div className={styles.product_feedback__item_name}>
							{item?.userName}
						</div>
						<div className={styles.product_feedback__item_rating}>
							{<StarRating rating={item?.rating} editValue={false} size={20} />}
						</div>
						<div className={styles.product_feedback__item_rating}>
							<span>({item?.rating})</span>
						</div>
					</div>
					<div className={styles.product_feedback__item_message}>
						{item?.feedbackMessage}
					</div>
				</div>
				{pathnameProfile && (
					<div
						className={styles.product_feedback_delete}
						onClick={() => feedbackDelete()}
					>
						Удалить
					</div>
				)}
			</div>
		</CSSTransition>
	);
};

export default FeedbacksItem;

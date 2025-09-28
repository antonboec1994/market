import StarRating from '@/components/Content/Elements/StarRating/StarRating';
import {
	ntfMessageDeletefeedback,
	ntfTypeDeletefeedback,
} from '@/redux/notification/consts';
import { DispatchNotification } from '@/utils/notificationDispatch';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import styles from './Feedbacks.module.scss';
import { useGetProductsQuery } from '@/redux/getProducts/api';
import type { ProductType } from '@/redux/getProducts/types';
import {
	useDeleteFeedbackMutation,
	useGetFeedbacksQuery,
} from '@/redux/getFeedbacks/api';
import type { FeedbackType } from '@/redux/getFeedbacks/types';
import { useSelector } from 'react-redux';
import { SelectAuth } from '@/redux/auth/selectors';

type feedbackItemProps = {
	item: FeedbackType;
	ix: number;
	initialCountfeedbackToShow?: number;
};

const FeedbacksItem: React.FC<feedbackItemProps> = ({
	item,
	ix,
	initialCountfeedbackToShow,
}) => {
	const { data } = useGetProductsQuery({});
	const [deleteFeedback] = useDeleteFeedbackMutation();
	const location = useLocation();
	const [show, setShow] = useState(false);
	const { userData } = useSelector(SelectAuth);
	const userId = userData?.user.id;
	const { refetch } = useGetFeedbacksQuery({ userId });

	const pathnameProduct = location.pathname.includes('product');
	const pathnameProfile = location.pathname.includes('profile');

	const currentfeedbackProductId = item?.productId;
	const productsAll = data?.items;

	const findProduct = productsAll?.find((item: ProductType) => {
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
		if (!item.id) return;
		if (window.confirm('Удалить выбранный отзыв?')) {
			try {
				await deleteFeedback({ id: item.id }).unwrap();
				refetch();
				window.location.reload();
				window.alert('Отзыв успешно удалён');
				DispatchNotification(
					true,
					findProduct,
					ntfMessageDeletefeedback,
					ntfTypeDeletefeedback
				);
			} catch (error: any) {
				window.alert(`Ошибка при удалении отзыва ${error.message}`);
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

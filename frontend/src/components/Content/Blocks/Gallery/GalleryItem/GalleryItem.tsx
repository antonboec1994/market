import AddToCartBtn from '@/components/Content/Elements/Buttons/AddToCartBtn';
import ViewBtn from '@/components/Content/Elements/Buttons/ViewBtn';
import StarRating from '@/components/Content/Elements/StarRating/StarRating';
import { SelectAuth } from '@/redux/auth/selectors';
import type { ProductType } from '@/redux/getProducts/types';
import { formatNumber } from '@/utils/formatNumbers';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { tabsList } from '../Gallery';
import styles from '../Gallery.module.scss';

type GalleryItemProps = {
	tabSelected: number;
	tabListIndex: number;
	productType: ProductType | undefined;
};

const GalleryItem: React.FC<GalleryItemProps> = ({
	tabSelected,
	tabListIndex,
	productType,
}) => {
	const { isLogged } = useSelector(SelectAuth);

	if (!productType) {
		return (
			<div className={styles.gallery__tabs_tab_content}>Товар не найден</div>
		);
	}

	return (
		<div
			className={
				tabSelected === tabsList[tabListIndex]?.id
					? `${styles.gallery__tabs_tab_content} ${styles.current}`
					: `${styles.gallery__tabs_tab_content}`
			}
		>
			<div className={styles.gallery__tabs_content_inner}>
				<div className={styles.gallery__tabs_img_box}>
					<img
						className={styles.gallery__tabs_image}
						src={productType?.imageUrl}
						alt='alt'
					/>
				</div>
				<div className={styles.gallery__tabs_box_wrapper}>
					<div className={styles.gallery__tabs_box}>
						<Link
							className={styles.gallery__tabs_box_title}
							to={`/product/${productType?.id}`}
						>
							{productType?.name}
						</Link>
						<div className={styles.gallery__tabs_icons}>
							<ViewBtn itemId={productType?.id} />
							{isLogged && <AddToCartBtn product={productType} />}
						</div>
					</div>
					<div className={styles.gallery__tabs_box_inner}>
						<div className={styles.gallery__tabs_box_circle}>
							{productType && formatNumber(productType?.salePrice)} р
							<span className={styles.gallery__tabs_box_circle_span}>
								{productType && formatNumber(productType?.price)} р
							</span>
						</div>
						<StarRating
							editValue={false}
							rating={productType?.rating}
						></StarRating>
						<div
							className={styles.gallery__tabs_matherial_color}
							style={{ backgroundColor: `${productType?.color}` }}
						></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GalleryItem;

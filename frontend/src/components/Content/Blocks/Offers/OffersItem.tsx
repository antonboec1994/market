import styles from './Offers.module.scss';

type OffersItemType = {
	title: string;
	text: string;
	icon: string;
};

type OffersItemPropsType = {
	item: OffersItemType;
};

const OffersItem: React.FC<OffersItemPropsType> = ({ item }) => {
	return (
		<div className={styles.offers__item}>
			<div className={styles.offers__item_title}>{item?.title}</div>
			<div className={styles.offers__item_text}>{item?.text}</div>
			<i className={`${styles.offers__item_icon} ${item?.icon}`}></i>
		</div>
	);
};

export default OffersItem;

import AreaChart from '@/components/Content/Elements/Charts/AreaChart/AreaChart';
import type { AreaGraphic } from '@/redux/getGraphics/types';
import styles from './GraphicBox.module.scss';

type AreaGraphicBoxProps = {
	item: AreaGraphic;
};

const AreaGraphicBox: React.FC<AreaGraphicBoxProps> = ({ item }) => {
	const parsedItemValues = JSON.parse(item.values);

	const array = parsedItemValues.slice(
		parsedItemValues.length - 30,
		parsedItemValues.length
	);
	let totalPrice = 0;
	let totalSalePrice = 0;
	for (let i = 0; i < array.length; i++) {
		totalPrice += array[i][1];
		totalSalePrice += array[i][2];
	}
	const averagePrice = totalPrice / array.length;
	const averageSalePrice = totalSalePrice / array.length;
	const discount = averagePrice - averageSalePrice;
	const discountPercent =
		((averagePrice - averageSalePrice) / averagePrice) * 100;

	return (
		<div className={styles.graphicBox}>
			<div className={styles.info}>
				<div className={styles.name}>{item.name}</div>
				<div className={styles.price}>
					<span>Средняя цена </span>
					{averageSalePrice.toFixed(0)} ₽
				</div>
				<div className={styles.salePrice}>
					<p>Средняя скидка</p>
					<div>
						<span>{discountPercent.toFixed(2)}%</span>
						{discount.toFixed(0)} ₽
					</div>
				</div>
			</div>
			<div className={styles.graphic}>{<AreaChart values={item.values} />}</div>
		</div>
	);
};

export default AreaGraphicBox;

import LineGraphicBox from '@/components/Content/Elements/Charts/GraphicBox/LineGraphicBox';
import { SelectGetGraphics } from '@/redux/getGraphics/selectors';
import { Status } from '@/redux/getProducts/types';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import AreaGraphicBox from '../../../Elements/Charts/GraphicBox/AreaGraphicBox';
import styles from '../Profile.module.scss';

const Dashboard: React.FC = () => {
	const { status, favorites } = useSelector(SelectGetGraphics);

	const filteredArray = useMemo(() => {
		return favorites?.filter(
			(value: any, index: number, self: any) =>
				index === self.findIndex((t: any) => t.name === value.name)
		);
	}, [favorites]);

	return (
		<>
			<div className={styles.title}>Статистика</div>
			{status === Status.LOADING ? (
				'Идёт загрузка!'
			) : (
				<>
					<div className={styles.graphicBoxWrapper}>
						{filteredArray.map((item: any, index: number) => {
							return <AreaGraphicBox key={index} item={item} />;
						})}
						<LineGraphicBox array={filteredArray} />
					</div>
				</>
			)}
		</>
	);
};

export default Dashboard;

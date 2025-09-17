import LineGraphicBox from '@/components/Content/Elements/Charts/GraphicBox/LineGraphicBox';
import { useMemo } from 'react';
import AreaGraphicBox from '../../../Elements/Charts/GraphicBox/AreaGraphicBox';
import styles from '../Profile.module.scss';
import { useGetGraphicsQuery } from '@/redux/getGraphics/api';

const Dashboard: React.FC = () => {
	const { data: favorites, isLoading } = useGetGraphicsQuery();

	const filteredArray: any = useMemo(() => {
		return favorites?.filter(
			(value: any, index: number, self: any) =>
				index === self.findIndex((t: any) => t.name === value.name)
		);
	}, [favorites]);

	return (
		<>
			<div className={styles.title}>Статистика</div>
			{isLoading ? (
				'Идёт загрузка!'
			) : (
				<>
					<div className={styles.graphicBoxWrapper}>
						{filteredArray?.map((item: any, index: number) => {
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

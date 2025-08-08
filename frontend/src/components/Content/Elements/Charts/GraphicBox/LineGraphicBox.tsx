import LineChart from '@/components/Content/Elements/Charts/LineChart/LineChart';
import type { AreaGraphic } from '@/redux/getGraphics/types';
import styles from './GraphicBox.module.scss';

type LineGraphicBoxProps = {
	array: AreaGraphic[];
};

const LineGraphicBox: React.FC<LineGraphicBoxProps> = ({ array }) => {
	return <div className={styles.graphicBox}>{<LineChart array={array} />}</div>;
};

export default LineGraphicBox;

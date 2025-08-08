import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend,
	type ScriptableContext,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

import styles from '../Chart.module.scss';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend
);

type AreaChartProps = {
	values: any;
};

const AreaChart: React.FC<AreaChartProps> = ({ values }) => {
	const options = {
		responsive: true,
		scales: {
			x: {
				display: false,
				grid: {
					display: false,
				},
			},
			y: {
				grid: {
					display: false,
				},
			},
		},
		plugins: {
			legend: {
				display: false,
			},
		},
		animations: {
			tension: {
				duration: 5000,
				easing: 'linear',
				from: 1,
				to: 0,
				loop: true,
			},
		},
	};

	const data = {
		labels: JSON.parse(values).map((item: number[]): string =>
			moment(item[0]).format('DD.MM.YY')
		),
		datasets: [
			{
				label: 'Цена ₽',
				data: JSON.parse(values).map((item: number[]): number => {
					return item[1] as number;
				}),
				fill: 'start',
				backgroundColor: (context: ScriptableContext<'line'>) => {
					const ctx = context.chart.ctx;
					const gradient = ctx.createLinearGradient(0, 0, 0, 180);
					gradient.addColorStop(0, '#c1ef00');
					gradient.addColorStop(1, '#232323');
					return gradient;
				},
				pointStyle: 'circle',
			},
		],
	};

	// @ts-ignore
	return <Line options={options} data={data} className={styles.chart} />;
};

export default AreaChart;

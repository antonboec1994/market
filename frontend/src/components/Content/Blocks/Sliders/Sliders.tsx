import { SelectGetProducts } from '@/redux/getProducts/selectors';
import { useSelector } from 'react-redux';
import SliderHot from './SliderHot/SliderHot';
import SliderSave from './SliderSave/SliderSave';

const Sliders = () => {
	const { statusAll } = useSelector(SelectGetProducts);

	return (
		<>
			{statusAll === 'LOADING' ? (
				'Идёт загрузка!'
			) : (
				<section className='sliders'>
					<div
						className='sliders__inner'
						data-aos='fade-up'
						data-aos-duration='500'
					>
						<SliderSave />
						<SliderHot />
					</div>
				</section>
			)}
		</>
	);
};

export default Sliders;

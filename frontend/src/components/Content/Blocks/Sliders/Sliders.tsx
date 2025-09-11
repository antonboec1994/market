import SliderHot from './SliderHot/SliderHot';
import SliderSave from './SliderSave/SliderSave';
import { useGetProductsQuery } from '@/redux/getProducts/api';

const Sliders = () => {
	const { isLoading } = useGetProductsQuery();

	return (
		<>
			{isLoading ? (
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

import NotFound from '@/components/Content/Blocks/NotFound/NotFound';
import { setMenuUrlValue } from '@/redux/filters/slice';
import { useAppDispatch } from '@/redux/store';
import { useEffect } from 'react';

const ErrorPage = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(setMenuUrlValue(''));
	}, [dispatch]);

	return (
		<>
			<NotFound />
		</>
	);
};

export default ErrorPage;

import { SelectAuth } from '@/redux/auth/selectors';
import { logout } from '@/redux/auth/slice';
import { useAppDispatch } from '@/redux/store';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'aos/dist/aos.js';
import { useEffect } from 'react';
import { isExpired } from 'react-jwt';
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import styles from './App.module.scss';
import './assets/scss/global.scss';
import Content from './components/Content/Content';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { getUserFromLs } from './utils/authLS/getUserFromLS';

const App: React.FC = () => {
	const dispatch = useAppDispatch();
	const { isLogged } = useSelector(SelectAuth);
	const userData = getUserFromLs();

	const isMyTokenExpired = userData?.access_token
		? isExpired(userData.access_token)
		: '';

	useEffect(() => {
		AOS.init({
			duration: 2000,
		});
		if (isMyTokenExpired) {
			dispatch(logout());
		}
	}, [isLogged, dispatch, isMyTokenExpired]);

	return (
		<BrowserRouter>
			<div className={styles.wrapper}>
				<Header />
				<Content />
				<Footer />
			</div>
		</BrowserRouter>
	);
};

export default App;

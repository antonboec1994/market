// import React, { lazy } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import styles from './Content.module.scss';
import background from '../../assets/images/content-background.jpg';

// УДАЛИТЬ: const HomePage = lazy(() => import(...));
// ЗАМЕНИТЬ на обычный импорт:
import HomePage from '../../pages/HomePage';
import AboutPage from '../../pages/AboutPage';
import ContactsPage from '../../pages/ContactsPage';
import DeliveryPage from '../../pages/DeliveryPage';
import PartnershipPage from '../../pages/PartnershipPage';
import PaymentPage from '../../pages/PaymentPage';
import ProductPage from '../../pages/ProductPage';
import CatalogPage from '../../pages/CatalogPage';
import ShowroomPage from '../../pages/ShowroomPage';
import CartPage from '../../pages/CartPage';
import ProfilePage from '../../pages/ProfilePage';
import ErrorPage from '../../pages/ErrorPage';

const Content: React.FC = () => {
	const location = useLocation();
	const urlPathProductPage = location.pathname.includes('product');
	// const fallbackLoading = <div>Идёт загрузка страницы...</div>;

	const myRoutes = [
		{
			path: '/',
			element: <HomePage />,
		},
		{
			path: '/about',
			element: <AboutPage />,
		},
		{
			path: '/contacts',
			element: <ContactsPage />,
		},
		{
			path: '/delivery',
			element: <DeliveryPage />,
		},
		{
			path: '/partnership',
			element: <PartnershipPage />,
		},
		{
			path: '/payment',
			element: <PaymentPage />,
		},
		{
			path: '/product/:id',
			element: <ProductPage />,
		},
		{
			path: '/catalog',
			element: <CatalogPage />,
		},
		{
			path: '/showroom',
			element: <ShowroomPage />,
		},
		{
			path: '/cart',
			element: <CartPage />,
		},
		{
			path: '/profile/:id/*',
			element: <ProfilePage />,
		},
		{
			path: '*',
			status: '404',
			element: <ErrorPage />,
		},
	];

	return (
		<div
			className={
				urlPathProductPage ? styles.content_product_info : styles.content
			}
			style={{ backgroundImage: 'url(' + background + ')' }}
		>
			<div className='container'>
				<Routes>
					{myRoutes.map((item, index) => (
						//Из-за проблем с чанками временно заккоментировано
						// <Route
						// 	path={item.path}
						// 	key={index}
						// 	element={
						// 		<React.Suspense fallback={fallbackLoading}>
						// 			{item.element}
						// 		</React.Suspense>
						// 	}
						// ></Route>
						<Route key={index} path={item.path} element={item.element} />
					))}
				</Routes>
			</div>
		</div>
	);
};

export default Content;

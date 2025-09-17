import React, { Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import styles from './Content.module.scss';
import background from '../../assets/images/content-background.jpg';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import ContactsPage from '@/pages/ContactsPage';
import DeliveryPage from '@/pages/DeliveryPage';
import PartnershipPage from '@/pages/PartnershipPage';
import PaymentPage from '@/pages/PaymentPage';
import ProductPage from '@/pages/ProductPage';
import CatalogPage from '@/pages/CatalogPage';
import ShowroomPage from '@/pages/ShowroomPage';
import CartPage from '@/pages/CartPage';
import ProfilePage from '@/pages/ProfilePage';
import ErrorPage from '@/pages/ErrorPage';

// const HomePage = lazy(() => import('../../pages/HomePage'));
// const AboutPage = lazy(() => import('../../pages/AboutPage'));
// const ContactsPage = lazy(() => import('../../pages/ContactsPage'));
// const DeliveryPage = lazy(() => import('../../pages/DeliveryPage'));
// const PartnershipPage = lazy(() => import('../../pages/PartnershipPage'));
// const PaymentPage = lazy(() => import('../../pages/PaymentPage'));
// const ProductPage = lazy(() => import('../../pages/ProductPage'));
// const CatalogPage = lazy(() => import('../../pages/CatalogPage'));
// const ShowroomPage = lazy(() => import('../../pages/ShowroomPage'));
// const CartPage = lazy(() => import('../../pages/CartPage'));
// const ProfilePage = lazy(() => import('../../pages/ProfilePage'));
// const ErrorPage = lazy(() => import('../../pages/ErrorPage'));

const Content: React.FC = () => {
	const location = useLocation();
	const urlPathProductPage = location.pathname.includes('product');
	const fallbackLoading = <div>Идёт загрузка страницы...</div>;

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
				<Suspense fallback={fallbackLoading}>
					<Routes>
						{myRoutes.map((item, index) => (
							<Route key={index} path={item.path} element={item.element} />
						))}
					</Routes>
				</Suspense>
			</div>
		</div>
	);
};

export default Content;

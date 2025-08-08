import React, { lazy } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import styles from './Content.module.scss';

import background from '../../assets/images/content-background.jpg';

const HomePage = lazy(
	() => import(/* webpackChunkName: "HomePage" */ '../../pages/HomePage')
);
const AboutPage = lazy(
	() => import(/* webpackChunkName: "AboutPage" */ '../../pages/AboutPage')
);
const ContactsPage = lazy(
	() =>
		import(/* webpackChunkName: "ContactsPage" */ '../../pages/ContactsPage')
);
const DeliveryPage = lazy(
	() =>
		import(/* webpackChunkName: "DeliveryPage" */ '../../pages/DeliveryPage')
);
const PartnershipPage = lazy(
	() =>
		import(
			/* webpackChunkName: "PartnershipPage" */ '../../pages/PartnershipPage'
		)
);
const PaymentPage = lazy(
	() => import(/* webpackChunkName: "PaymentPage" */ '../../pages/PaymentPage')
);
const ProductPage = lazy(
	() => import(/* webpackChunkName: "ProductPage" */ '../../pages/ProductPage')
);
const CatalogPage = lazy(
	() => import(/* webpackChunkName: "CatalogPage" */ '../../pages/CatalogPage')
);
const ShowroomPage = lazy(
	() =>
		import(/* webpackChunkName: "ShowroomPage" */ '../../pages/ShowroomPage')
);
const CartPage = lazy(
	() => import(/* webpackChunkName: "CartPage" */ '../../pages/CartPage')
);
const ProfilePage = lazy(
	() => import(/* webpackChunkName: "ProfilePage" */ '../../pages/ProfilePage')
);
const ErrorPage = lazy(
	() => import(/* webpackChunkName: "ErrorPage" */ '../../pages/ErrorPage')
);

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
				<Routes>
					{myRoutes.map((item, index) => (
						<Route
							path={item.path}
							key={index}
							element={
								<React.Suspense fallback={fallbackLoading}>
									{item.element}
								</React.Suspense>
							}
						></Route>
					))}
				</Routes>
			</div>
		</div>
	);
};

export default Content;

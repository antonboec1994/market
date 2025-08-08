import LoginModal from '@/components/Content/Elements/Modals/AuthModals/LoginModal';
import RegisterModal from '@/components/Content/Elements/Modals/AuthModals/RegisterModal';
import CartModal from '@/components/Content/Elements/Modals/CartModal/CartModal';
import OrderModal from '@/components/Content/Elements/Modals/OrderModal/OrderModal';
import { useEffect, useState } from 'react';
import styles from './Header.module.scss';
import HeaderInfo from './HeaderInfo/HeaderInfo';
import HeaderMain from './HeaderMain/HeaderMain';
import HeaderSettings from './HeaderSettings/HeaderSettings';

const Header: React.FC = () => {
	const [scrollPosition, setScrollPosition] = useState(0);

	const handleScroll = () => {
		const position = window.pageYOffset;
		setScrollPosition(position);
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<>
			<header
				className={
					scrollPosition <= 150
						? styles.header
						: `${styles.header} ${styles.fixed}`
				}
			>
				<HeaderSettings />
				<HeaderInfo />
				<HeaderMain scrollPosition={scrollPosition} />
				<CartModal />
				<OrderModal />
				<RegisterModal />
				<LoginModal />
			</header>
		</>
	);
};

export default Header;

import { Link, useLocation } from 'react-router-dom';

import LogoutIcon from '@mui/icons-material/Logout';

import { logout } from '@/redux/auth/slice';
import { useAppDispatch } from '@/redux/store';
import type { SidebarMenuType } from '@/pages/ProfilePage';
import { useEffect, useState } from 'react';
import styles from './Profile.module.scss';

interface SidebarProps {
	sidebarMenu: SidebarMenuType[];
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarMenu }) => {
	const [activeLink, setActiveLink] = useState<number | null>();
	const dispatch = useAppDispatch();
	const location = useLocation();

	useEffect(() => {
		const currentPath = location.pathname;
		const ls = sidebarMenu.find(item => item.path === currentPath);
		setActiveLink(ls?.id);
	}, [location.pathname]);

	const onClickLogout = () => {
		dispatch(logout());
		localStorage.removeItem('user');
	};

	const handleClick = (index: number) => {
		setActiveLink(index);
	};

	return (
		<div className={styles.sidebar}>
			<ul>
				{sidebarMenu.map((item: SidebarMenuType, index: number) => (
					<li
						className={`${activeLink === index ? styles.active : ''} ${
							item.borderTop ? styles.borderTop : ''
						}`}
						key={index}
						onClick={() => handleClick(index)}
					>
						<Link to={item.path}>
							{item.icon}
							{item.name}
						</Link>
					</li>
				))}
				<li className={styles.borderTop}>
					<div onClick={() => onClickLogout()}>
						<LogoutIcon />
						Выйти
					</div>
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;

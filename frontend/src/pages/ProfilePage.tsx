import Dashboard from '@/components/Content/Blocks/Profile/Pages/Dashboard';
import ProfileCart from '@/components/Content/Blocks/Profile/Pages/ProfileCart';
import ProfileFeedbacks from '@/components/Content/Blocks/Profile/Pages/ProfileFeedbacks';
import Settings from '@/components/Content/Blocks/Profile/Pages/Settings';
import Sidebar from '@/components/Content/Blocks/Profile/Sidebar';
import TopBar from '@/components/Content/Blocks/Profile/TopBar';
import Workspace from '@/components/Content/Blocks/Profile/Workspace';
import { SelectAuth } from '@/redux/auth/selectors';
import {
	setLoginModalStatus,
	setRegisterModalStatus,
} from '@/redux/auth/slice';
import { SelectFilters } from '@/redux/filters/selectors';
import { setMenuUrlValue } from '@/redux/filters/slice';
import { useAppDispatch } from '@/redux/store';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MessageIcon from '@mui/icons-material/Message';
import SettingsIcon from '@mui/icons-material/Settings';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from '../components/Content/Blocks/Profile/Profile.module.scss';

export type SidebarMenuType = {
	id: number;
	name: string;
	icon: any;
	path: string | any;
	borderTop?: boolean;
};

export type ProfileRoutesType = {
	path: string;
	element: any;
};

const profileRoutes: ProfileRoutesType[] = [
	{
		path: 'dashboard',
		element: <Dashboard />,
	},
	{
		path: 'cart',
		element: <ProfileCart />,
	},
	{
		path: 'feedbacks',
		element: <ProfileFeedbacks />,
	},
	{
		path: 'settings',
		element: <Settings />,
	},
];

const ProfilePage: React.FC = () => {
	const dispatch = useAppDispatch();
	const { user, isLogged } = useSelector(SelectAuth);
	const { menuUrlValue } = useSelector(SelectFilters);
	const currentUser = user && user;

	const sidebarMenu: SidebarMenuType[] = [
		{
			id: 0,
			name: 'Панель статистики',
			icon: <DashboardIcon />,
			path: `/profile/${currentUser?.id}/dashboard`,
		},
		{
			id: 1,
			name: 'Корзина',
			icon: <ShoppingCartIcon />,
			path: `/profile/${currentUser?.id}/cart`,
		},
		{
			id: 2,
			name: 'Мои отзывы',
			icon: <MessageIcon />,
			path: `/profile/${currentUser?.id}/feedbacks`,
		},
		{
			id: 3,
			name: 'Настройки',
			icon: <SettingsIcon />,
			path: `/profile/${currentUser?.id}/settings`,
		},
	];

	useEffect(() => {
		dispatch(setMenuUrlValue(''));
	}, [menuUrlValue, dispatch]);

	const Login = () => {
		dispatch(setLoginModalStatus(true));
	};

	const Register = () => {
		dispatch(setRegisterModalStatus(true));
	};

	return (
		<>
			{isLogged ? (
				<div className={styles.profile}>
					<div className='title_head'>
						<h2 className='title_head__title'>Личный кабинет</h2>
					</div>
					<TopBar />
					<div className={styles.profile__inner}>
						<Sidebar sidebarMenu={sidebarMenu} />
						<Workspace profileRoutes={profileRoutes} />
					</div>
				</div>
			) : (
				<>
					<div className={styles.noauth_title}>
						Вы не вошли в личный кабинет.
					</div>
					<div className={styles.link} onClick={() => Login()}>
						Войти
					</div>
					<div className={styles.link} onClick={() => Register()}>
						Регистрация
					</div>
				</>
			)}
		</>
	);
};

export default ProfilePage;

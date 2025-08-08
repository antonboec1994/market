import { SelectAuth } from '@/redux/auth/selectors';
import { SelectNotification } from '@/redux/notification/selectors';
import { useAppDispatch } from '@/redux/store';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { IconButton } from '@mui/material';
import { useSelector } from 'react-redux';

import {
	setNotificationInfo,
	setNotificationStatus,
} from '@/redux/notification/slice';
import { useState } from 'react';

import type { NotificationInfo } from '@/redux/notification/types';
import styles from './Profile.module.scss';

const TopBar: React.FC = () => {
	const dispatch = useAppDispatch();
	const { user, createdDate, createdTime, updatedDate, updatedTime } =
		useSelector(SelectAuth);
	const [modal, setModal] = useState<boolean>(false);
	const { notificationStatus, notificationInfo } =
		useSelector(SelectNotification);

	const notificationBtn = () => {
		dispatch(setNotificationStatus(false));
		setModal(!modal);
	};

	const notificationClose = (e: any) => {
		if (e.target.classList.contains('dismiss')) {
			setModal(!modal);
			localStorage.setItem('notification', '');
			dispatch(setNotificationInfo(''));
		}
	};

	return (
		<div className={styles.topbar}>
			<div className={styles.topbar__info}>
				<div className={styles.author_name}>
					Здравствуйте, <span style={{ color: '#d12550' }}>{user?.name}</span>
				</div>
				<div className={styles.info_wrapper}>
					<div className={styles.info}>
						<div className={styles.info__line}>
							<p>Ваш email</p>
							<strong style={{ color: '#4848c5' }}>{user?.email}</strong>
						</div>
					</div>
					<div className={styles.info}>
						<div className={styles.info__line}>
							<p>Ваш логин</p>
							<strong style={{ color: '#11a238' }}>{user?.login}</strong>
						</div>
					</div>
				</div>
				<div className={styles.date_wrapper}>
					<div className={styles.date}>
						<div className={styles.date__line}>
							<p>Дата регистрации</p>
							<strong className={styles.date__line_numbers}>
								{createdDate}
							</strong>
						</div>
						<div className={styles.date__line}>
							<p>Время регистрации</p>
							<strong className={styles.date__line_numbers}>
								{createdTime}
							</strong>
						</div>
					</div>
					<div className={styles.date}>
						<div className={styles.date__line}>
							<p>Дата последнего обновления</p>
							<strong className={styles.date__line_numbers}>
								{updatedDate}
							</strong>
						</div>
						<div className={styles.date__line}>
							<p>Время последнего обновления</p>
							<strong className={styles.date__line_numbers}>
								{updatedTime}
							</strong>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.topbar__form}>
				<div className={styles.notification}>
					<IconButton onClick={() => notificationBtn()}>
						<NotificationsIcon />
					</IconButton>
					<div
						className={
							modal
								? `${styles.layout} ${styles.active} dismiss`
								: `${styles.layout} dismiss`
						}
						onClick={notificationClose}
					></div>
					{notificationStatus && (
						<div className={styles.notification_status}></div>
					)}
					<div
						className={
							modal
								? `${styles.notification_info} ${styles.active} isNftModal`
								: `${styles.notification_info} isNftModal`
						}
					>
						{notificationInfo.length > 0 ? (
							[...notificationInfo]
								.reverse()
								.map((element: NotificationInfo, index: number) => (
									<div className={styles.notificationInfo__item} key={index}>
										<span>{element?.message}</span>
										<strong>{element?.item?.name}</strong>
									</div>
								))
						) : (
							<span>Уведомлений нет</span>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default TopBar;

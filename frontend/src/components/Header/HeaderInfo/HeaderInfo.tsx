import { menuList2 } from '@/redux/filters/consts';
import { setMenuUrlValue } from '@/redux/filters/slice';
import type { MenuList } from '@/redux/filters/types';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logo.png';
import styles from '../Header.module.scss';

const HeaderInfo: React.FC = () => {
	const dispatch = useDispatch();

	const onClickMenuItem = (item: MenuList) => {
		dispatch(setMenuUrlValue(item));
	};

	useEffect(() => {
		dispatch(setMenuUrlValue(''));
	}, [dispatch]);

	return (
		<div className={styles.header__info}>
			<div className='container'>
				<div className={styles.header__info_inner}>
					<div className={styles.header__info_contacts}>
						<i
							className={`${styles.header__info_tel_icon} icon_phone_square`}
						></i>
						<div className={styles.header__info_contacts_box}>
							<a className={styles.header__info_tel} href='tel:+78126034337'>
								+7 <span className={styles.header__info_tel_span}>(495)</span>{' '}
								642-53-04
							</a>
							<a className={styles.header__info_tel} href='tel:+78128134618'>
								+7 <span className={styles.header__info_tel_span}>(495)</span>{' '}
								642-53-52
							</a>
						</div>
						<div className={styles.header__info_contacts_links}>
							{menuList2.map((item, index) => (
								<Link
									className={styles.header__info_contacts_link}
									to={item.url}
									key={index}
									onClick={() => onClickMenuItem(item)}
								>
									{item.name}
								</Link>
							))}
						</div>
					</div>
					<Link className={styles.header__info_logo} to='/'>
						<img className={styles.header__info_logo_image} src={logo} alt='' />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default HeaderInfo;

import Search from '@/components/Content/Elements/Search/Search';
import { menuList } from '@/redux/filters/consts';
import { SelectFilters } from '@/redux/filters/selectors';
import { setMenuUrlValue } from '@/redux/filters/slice';
import type { MenuList } from '@/redux/filters/types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from '../Header.module.scss';

type HeaderMainProps = {
	scrollPosition: number;
};

const HeaderMain: React.FC<HeaderMainProps> = ({ scrollPosition }) => {
	const dispatch = useDispatch();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { menuUrlValue } = useSelector(SelectFilters);
	const url = typeof window !== 'undefined' ? window.location.href : '';

	const onClickMenuItem = (item: MenuList) => {
		dispatch(setMenuUrlValue(item));
	};

	const onClickBurgerBtn = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	useEffect(() => {
		menuList.map(item => {
			if (url.includes(item.url)) {
				dispatch(setMenuUrlValue(item));
			}
		});
	}, [menuUrlValue, dispatch]);

	return (
		<div className={styles.header__main}>
			<div className='container'>
				<div className={styles.header__main_inner}>
					<Search scrollPosition={scrollPosition} />
					<div
						className={`${styles.menu__burger_btn} ${
							isMenuOpen ? styles.menu__burger_btn_active : ''
						}`}
						onClick={() => onClickBurgerBtn()}
					>
						<span></span>
					</div>
					<div
						className={`${styles.menu__burger} ${
							isMenuOpen ? styles.menu__burger_active : ''
						}`}
					>
						<ul className={styles.menu__burger_list}>
							{menuList.map((item, index) => (
								<li key={index}>
									<Link className={styles.menu__burger_link} to={item.url}>
										{item.name}
									</Link>
								</li>
							))}
						</ul>
					</div>
					<nav className={styles.menu}>
						<ul className={styles.menu__list}>
							{menuList.map((item, index) => (
								<li
									className={
										menuUrlValue.id === index
											? `${styles.menu__item} ${styles.active}`
											: styles.menu__item
									}
									key={index}
									onClick={() => onClickMenuItem(item)}
								>
									<Link className={styles.menu__link} to={item.url}>
										{item.name}
									</Link>
								</li>
							))}
						</ul>
					</nav>
				</div>
			</div>
		</div>
	);
};

export default HeaderMain;

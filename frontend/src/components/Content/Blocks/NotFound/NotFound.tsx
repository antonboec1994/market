import notFound from '../../../../assets/images/404.png';
import styles from './NotFound.module.scss';

const NotFount: React.FC = () => {
	return (
		<div className={styles.error__inner}>
			<div className={styles.error__title}>Странца не найдена!</div>
			<img className={styles.error__image} src={notFound} alt='alt' />
		</div>
	);
};

export default NotFount;

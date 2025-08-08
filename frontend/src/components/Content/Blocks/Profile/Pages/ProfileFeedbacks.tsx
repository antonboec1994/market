import { SelectFeedbacks } from '@/redux/getFeedbacks/selectors';
import type { FeedbacksType } from '@/redux/getFeedbacks/types';
import { normalize_count_form_feedbacks } from '@/utils/normalizeWordsForm';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FeedbacksItem from '../../Feedbacks/FeedbacksItem';
import styles from '../Profile.module.scss';

const ProfileFeedbacks: React.FC = () => {
	const [showedfeedbacks, setShowedfeedbacks] = useState<FeedbacksType[]>([]);
	const initialCountfeedbackToShow = 2;
	const [indexArray, setIndexArray] = useState<number>(
		initialCountfeedbackToShow
	);
	const { feedbacks } = useSelector(SelectFeedbacks);

	useEffect(() => {
		document.addEventListener('scroll', handleScroll);
		return () => {
			document.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const handleScroll = (e: any) => {
		if (
			e.target.documentElement.scrollHeight -
				(e.target.documentElement.scrollTop + window.innerHeight) <
			100
		) {
			setIndexArray(prevCount => prevCount + 1);
		}
	};

	const isMorefeedbacksToLoad = feedbacks.length > showedfeedbacks.length;

	useEffect(() => {
		if (isMorefeedbacksToLoad) {
			setShowedfeedbacks(feedbacks.slice(0, indexArray));
		}
	}, [feedbacks, indexArray]);

	return (
		<>
			<div className={styles.title}>
				Мои отзывы
				<span>
					{feedbacks.length} {normalize_count_form_feedbacks(feedbacks.length)}
				</span>
			</div>
			<div className={styles.feedback__items}>
				{Object.values(showedfeedbacks).map(
					(item: FeedbacksType, index: number) => (
						<FeedbacksItem
							item={item}
							key={index}
							ix={index}
							initialCountfeedbackToShow={initialCountfeedbackToShow}
						/>
					)
				)}
				{isMorefeedbacksToLoad && (
					<>
						<span
							style={{
								display: 'flex',
								justifyContent: 'center',
								margin: '20px 0 20px 0',
								color: '#969595',
							}}
						>
							Для отображения большего количество отзывов пожалуйста скрольте
							страницу вниз
						</span>
						<div className={styles.feedback__items_arrowDown}>
							<ExpandMoreIcon
								data-aos='fade-down'
								data-aos-duration='1000'
								data-aos-delay='2000'
							/>
							<ExpandMoreIcon
								data-aos='fade-down'
								data-aos-duration='1000'
								data-aos-delay='1500'
							/>
							<ExpandMoreIcon
								data-aos='fade-down'
								data-aos-duration='1000'
								data-aos-delay='500'
							/>
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default ProfileFeedbacks;

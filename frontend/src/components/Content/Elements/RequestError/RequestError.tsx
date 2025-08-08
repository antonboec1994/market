import { SelectAuth } from '@/redux/auth/selectors';
import { CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import styles from './RequestError.module.scss';

type RequestErrorPropsType = {
	error: string;
};

const RequestError: React.FC<RequestErrorPropsType> = ({ error }) => {
	const { requestError } = useSelector(SelectAuth);

	return (
		<>
			{requestError && (
				<div
					className={`${
						requestError === error ? styles.success : styles.error
					} ${styles.message}`}
				>
					{requestError}
					{requestError === error ? (
						<CircularProgress className={styles.progressIcon} color='success' />
					) : (
						''
					)}
				</div>
			)}
		</>
	);
};

export default RequestError;

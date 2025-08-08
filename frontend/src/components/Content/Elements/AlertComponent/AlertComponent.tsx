import { Alert, Snackbar, type AlertColor } from '@mui/material';

import styles from './Alert.module.scss';

type AlertComponentProps = {
	open: boolean;
	severity: AlertColor;
	text: string;
};

const AlertComponent: React.FC<AlertComponentProps> = ({
	open,
	severity,
	text,
}) => {
	return (
		<>
			<Snackbar className={styles.alertBox} open={open} autoHideDuration={6000}>
				<Alert
					className={styles.alert}
					severity={severity}
					variant='filled'
					sx={{ width: '100%' }}
				>
					{text}
				</Alert>
			</Snackbar>
		</>
	);
};

export default AlertComponent;

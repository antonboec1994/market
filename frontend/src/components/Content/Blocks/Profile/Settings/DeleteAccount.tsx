import { logout, setRequestError } from '@/redux/auth/slice';
import { useAppDispatch } from '@/redux/store';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import RequestError from '@/components/Content/Elements/RequestError/RequestError';
import { Success } from '@/errors';
import { deleteAccount } from '@/redux/auth/thunks';
import { useForm } from 'react-hook-form';
import styles from '../../../Elements/Modals/AuthModals/AuthModal.module.scss';

const DeleteAccount = () => {
	const dispatch = useAppDispatch();

	const { handleSubmit } = useForm({});

	const onSubmit = async () => {
		dispatch(setRequestError(''));
		try {
			const res = await dispatch(deleteAccount());
			if ('error' in res) {
				const errorMessage = res.payload || res.error.message;
				dispatch(setRequestError(errorMessage));
			} else {
				dispatch(setRequestError(Success.successDeleteUser));
				dispatch(logout());
				localStorage.removeItem('user');
				setTimeout(() => {
					window.location.href = '/';
					dispatch(setRequestError(''));
				}, 2000);
			}
		} catch (error) {
			dispatch(setRequestError('Произошла ошибка при удалении аккаунта'));
		}
	};

	return (
		<>
			<form
				className={`${styles.form} ${styles.formSettings}`}
				onSubmit={handleSubmit(onSubmit)}
			>
				<h2 className={styles.subtitle}>
					После удаления аккаунта, персональные данные <br /> восстановлению не
					подлежат
				</h2>
				<FormGroup className={styles.checkbox_box}>
					<FormControlLabel
						required
						control={<Checkbox />}
						label='Подтвердите удаление'
					/>
				</FormGroup>
				<RequestError error={Success.successDeleteUser} />
				<LoadingButton
					className={styles.button_box}
					variant='contained'
					type='submit'
				>
					Удалить аккаунт
				</LoadingButton>
			</form>
		</>
	);
};

export default DeleteAccount;

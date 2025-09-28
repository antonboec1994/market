import { logout, setRequestError } from '@/redux/auth/slice';
import { useAppDispatch } from '@/redux/store';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import RequestError from '@/components/Content/Elements/RequestError/RequestError';
import { Success } from '@/errors';
import { useForm } from 'react-hook-form';
import styles from '../../../Elements/Modals/AuthModals/AuthModal.module.scss';
import { useDeleteAccountMutation } from '@/redux/auth/api';
import { useSelector } from 'react-redux';
import { SelectAuth } from '@/redux/auth/selectors';

const DeleteAccount = () => {
	const dispatch = useAppDispatch();
	const { handleSubmit } = useForm({});
	const [deleteAccount] = useDeleteAccountMutation();
	const { userData } = useSelector(SelectAuth);

	const userId = userData?.user.id;

	const onSubmit = async () => {
		dispatch(setRequestError(''));
		if (!userId) return;
		try {
			await deleteAccount(userId).unwrap();
			dispatch(setRequestError(Success.successDeleteUser));
			dispatch(logout());
		} catch (error: any) {
			dispatch(
				setRequestError(
					error.message || 'Произошла ошибка при удалении аккаунта'
				)
			);
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

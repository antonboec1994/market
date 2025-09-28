import LoadingButton from '@mui/lab/LoadingButton';
import {
	Checkbox,
	FormControlLabel,
	FormGroup,
	TextField,
} from '@mui/material';

import RequestError from '@/components/Content/Elements/RequestError/RequestError';
import { Success } from '@/errors';
import { logout, setRequestError } from '@/redux/auth/slice';
import { useAppDispatch } from '@/redux/store';
import { UpdatePasswordSchema } from '@/utils/yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import styles from '../../../Elements/Modals/AuthModals/AuthModal.module.scss';
import { useUpdatePasswordMutation } from '@/redux/auth/api';
import type { IUpdateUserPassword } from '@/redux/auth/types';
import { useSelector } from 'react-redux';
import { SelectAuth } from '@/redux/auth/selectors';

interface UpdatePasswordInputs {
	oldPassword: string;
	newPassword: string;
	newPasswordRepeat: string;
}

const ChangePassword = () => {
	const dispatch = useAppDispatch();
	const [updatePassword] = useUpdatePasswordMutation();
	const { userData } = useSelector(SelectAuth);

	const userId = userData?.user.id;

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<UpdatePasswordInputs>({
		resolver: yupResolver(UpdatePasswordSchema),
	});

	const onSubmit = async (data: IUpdateUserPassword) => {
		const updatedPassword = {
			oldPassword: data.oldPassword,
			newPassword: data.newPassword,
		};
		dispatch(setRequestError(''));
		if (!userId) return;
		try {
			await updatePassword({ id: userId, updatedPassword });
			dispatch(setRequestError(Success.successUpdatePassword));
			reset();
			setTimeout(() => {
				dispatch(logout());
			}, 2000);
		} catch (error: any) {
			dispatch(
				setRequestError(error.message || 'Произошла ошибка при смене пароля')
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
					Введите ваш новый пароль и сохраните изменения
				</h2>
				<TextField
					className={styles.input_box}
					label='Введите ваш текущий пароль'
					variant='outlined'
					type='password'
					{...register('oldPassword')}
					error={!!errors.oldPassword}
					helperText={errors.oldPassword ? `${errors.oldPassword.message}` : ''}
				/>
				<TextField
					className={styles.input_box}
					label='Введите ваш новый пароль'
					variant='outlined'
					type='password'
					{...register('newPassword')}
					error={!!errors.newPassword}
					helperText={errors.newPassword ? `${errors.newPassword.message}` : ''}
				/>
				<TextField
					className={styles.input_box}
					label='Подтвердите ваш новый пароль'
					variant='outlined'
					type='password'
					{...register('newPasswordRepeat')}
					error={!!errors.newPasswordRepeat}
					helperText={
						errors.newPasswordRepeat
							? `${errors.newPasswordRepeat.message}`
							: ''
					}
				/>
				<FormGroup className={styles.checkbox_box}>
					<FormControlLabel
						required
						control={<Checkbox />}
						label='Подтвердите изменения'
					/>
				</FormGroup>
				<RequestError error={Success.successUpdatePassword} />
				<LoadingButton
					className={styles.button_box}
					variant='contained'
					type='submit'
				>
					Сохранить
				</LoadingButton>
			</form>
		</>
	);
};

export default ChangePassword;

import { useAppDispatch } from '@/redux/store';
import LoadingButton from '@mui/lab/LoadingButton';
import {
	Checkbox,
	FormControlLabel,
	FormGroup,
	TextField,
} from '@mui/material';

import RequestError from '@/components/Content/Elements/RequestError/RequestError';
import { logout, setRequestError } from '@/redux/auth/slice';
import { UpdateNameSchema } from '@/utils/yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import styles from '../../../Elements/Modals/AuthModals/AuthModal.module.scss';
import { Success } from '@/errors';
import type { IUpdateUserData } from '@/redux/auth/types';
import { useUpdateUserMutation } from '@/redux/auth/api';
import { useSelector } from 'react-redux';
import { SelectAuth } from '@/redux/auth/selectors';

interface UpdateUserFormInputs {
	email: string;
	login: string;
	name: string;
}

const UpdateUser = () => {
	const dispatch = useAppDispatch();
	const { userData } = useSelector(SelectAuth);
	const [updateUser] = useUpdateUserMutation();
	const userId = userData?.user?.id;

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<UpdateUserFormInputs>({
		resolver: yupResolver(UpdateNameSchema),
	});

	const onSubmit = async (data: IUpdateUserData) => {
		const updatedUserData = {
			email: data.email,
			login: data.login,
			name: data.name,
		};
		dispatch(setRequestError(''));
		if (!userId) return;
		try {
			await updateUser({ id: userId, updatedUserData }).unwrap();
			dispatch(setRequestError(Success.successUpdateUser));
			reset();
			setTimeout(() => {
				dispatch(logout());
			}, 2000);
		} catch (error: any) {
			dispatch(
				setRequestError(
					error.message || 'Произошла ошибка при смене данных пользователя'
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
					Введите ваши новые данные и сохраните изменения
				</h2>
				<TextField
					className={styles.input_box}
					label='Введите ваш новый email'
					variant='outlined'
					type='text'
					{...register('email')}
					error={!!errors.email}
					helperText={errors.email ? `${errors.email.message}` : ''}
				/>
				<TextField
					className={styles.input_box}
					label='Введите ваш новый логин'
					variant='outlined'
					type='text'
					{...register('login')}
					error={!!errors.login}
					helperText={errors.login ? `${errors.login.message}` : ''}
				/>
				<TextField
					className={styles.input_box}
					label='Введите ваше новое имя'
					variant='outlined'
					type='text'
					{...register('name')}
					error={!!errors.name}
					helperText={errors.name ? `${errors.name.message}` : ''}
				/>
				<FormGroup className={styles.checkbox_box}>
					<FormControlLabel
						required
						control={<Checkbox />}
						label='Подтвердите изменения'
					/>
				</FormGroup>
				<RequestError error={Success.successUpdateUser} />
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

export default UpdateUser;

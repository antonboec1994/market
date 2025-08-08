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
import { updateUser } from '@/redux/auth/thunks';
import { UpdateNameSchema } from '@/utils/yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import styles from '../../../Elements/Modals/AuthModals/AuthModal.module.scss';
import { Success } from '@/errors';

interface UpdateUserFormInputs {
	email: string;
	login: string;
	name: string;
}

const UpdateUser = () => {
	const dispatch = useAppDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UpdateUserFormInputs>({
		resolver: yupResolver(UpdateNameSchema),
	});

	const onSubmit = async (data: any) => {
		dispatch(setRequestError(''));
		const userData = {
			email: data.email,
			login: data.login,
			name: data.name,
		};

		try {
			const res = await dispatch(updateUser(userData));
			if ('error' in res) {
				const errorMessage = res.payload || res.error.message;
				dispatch(setRequestError(errorMessage));
			} else {
				dispatch(setRequestError(Success.successUpdateUser));
				setTimeout(() => {
					dispatch(setRequestError(''));
					dispatch(logout());
				}, 2000);
			}
		} catch (error) {
			dispatch(setRequestError('Произошла ошибка при смене данных'));
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

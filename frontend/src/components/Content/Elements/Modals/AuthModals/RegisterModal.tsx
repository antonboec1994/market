import { SelectAuth } from '@/redux/auth/selectors';
import {
	setLoginModalStatus,
	setRegisterModalStatus,
	setRequestError,
} from '@/redux/auth/slice';
import { loginUser, registerUser } from '@/redux/auth/thunks';
import type { IRegisterData } from '@/redux/auth/types';
import { setMenuUrlValue } from '@/redux/filters/slice';
import { useAppDispatch } from '@/redux/store';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import {
	Checkbox,
	FormControlLabel,
	FormGroup,
	TextField,
} from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RegisterSchema } from '@/utils/yup';
import RequestError from '../../RequestError/RequestError';
import styles from './AuthModal.module.scss';
import { Success } from '@/errors';

interface RegisterFormInputs {
	name: string;
	email: string;
	login: string;
	password: string;
	passwordRepeat: string;
}

const RegisterModal = () => {
	const dispatch = useAppDispatch();
	const { registerModalStatus, isLoading, requestError } =
		useSelector(SelectAuth);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormInputs>({
		resolver: yupResolver(RegisterSchema),
	});

	useEffect(() => {
		dispatch(setMenuUrlValue(''));
	});

	useEffect(() => {
		if (requestError === Success.successRegister) {
			const timer = setTimeout(() => {
				dispatch(setRequestError(''));
			}, 2000);
			return () => clearTimeout(timer);
		}
	}, [requestError, dispatch]);

	const onSubmit = async (data: any) => {
		dispatch(setRequestError(''));
		const userData: IRegisterData = {
			name: data.name,
			login: data.login,
			email: data.email,
			password: data.password,
		};
		try {
			const res = await dispatch(registerUser(userData));
			if ('error' in res) {
				const errorMessage = res.payload || res.error.message;
				dispatch(setRequestError(errorMessage));
				return;
			} else {
				dispatch(setRequestError(Success.successRegister));
				const loginResult = await dispatch(
					loginUser({ email: data.email, password: data.password })
				);
				if ('error' in loginResult) {
					dispatch(setRequestError('Ошибка входа после регистрации'));
					return;
				}
				dispatch(setRegisterModalStatus(false));
			}
		} catch (error) {
			dispatch(setRequestError('Произошла ошибка при регистрации'));
		}
	};

	const modalClose = (e: React.MouseEvent) => {
		if ((e.target as HTMLElement).classList.contains('dismiss')) {
			dispatch(setRegisterModalStatus(false));
			dispatch(setRequestError(''));
		}
	};

	return (
		<div
			className={
				registerModalStatus
					? `${styles.authModal} ${styles.active}`
					: `${styles.authModal}`
			}
			onClick={modalClose}
		>
			<div className={`${styles.authModal__overlay} dismiss`}>
				<div className={styles.wrapper}>
					<div className={`${styles.authModal__close} dismiss`}></div>
					<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
						<h2 className={styles.title}>Регистрация</h2>
						<h2 className={styles.subtitle}>Зарегистрируйте ваш логин</h2>
						<TextField
							className={styles.input_box}
							label='Введите ваш email'
							variant='outlined'
							placeholder=''
							type='email'
							{...register('email')}
							error={!!errors.email}
							helperText={errors.email ? `${errors.email.message}` : ''}
						/>
						<TextField
							className={styles.input_box}
							label='Введите ваш логин'
							variant='outlined'
							type='text'
							{...register('login')}
							error={!!errors.login}
							helperText={errors.login ? `${errors.login.message}` : ''}
						/>
						<TextField
							className={styles.input_box}
							label='Введите ваше имя'
							variant='outlined'
							type='text'
							{...register('name')}
							error={!!errors.name}
							helperText={errors.name ? `${errors.name.message}` : ''}
						/>
						<TextField
							className={styles.input_box}
							label='Введите ваш пароль'
							variant='outlined'
							type='password'
							{...register('password')}
							error={!!errors.password}
							helperText={errors.password ? `${errors.password.message}` : ''}
						/>
						<TextField
							className={styles.input_box}
							label='Подтвердите ваш пароль'
							variant='outlined'
							type='password'
							{...register('passwordRepeat')}
							error={!!errors.passwordRepeat}
							helperText={
								errors.passwordRepeat ? `${errors.passwordRepeat.message}` : ''
							}
						/>
						<FormGroup className={styles.checkbox_box}>
							<FormControlLabel
								required
								control={<Checkbox />}
								label='Соглашаюсь с правилами'
							/>
						</FormGroup>
						<RequestError error={Success.successRegister} />
						<LoadingButton
							loading={isLoading}
							className={styles.button_box}
							variant='contained'
							type='submit'
						>
							Регистрация
						</LoadingButton>
						<div className={styles.text}>
							У вас уже есть аккаунт?
							<span
								style={{ color: 'blue', cursor: 'pointer', marginLeft: '5px' }}
								onClick={() => {
									dispatch(setLoginModalStatus(true));
									dispatch(setRegisterModalStatus(false));
								}}
							>
								Войти
							</span>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default RegisterModal;

import { SelectAuth } from '@/redux/auth/selectors';
import {
	setLoginModalStatus,
	setRegisterModalStatus,
	setRequestError,
} from '@/redux/auth/slice';
import { setMenuUrlValue } from '@/redux/filters/slice';
import { useAppDispatch } from '@/redux/store';
import { LoginSchema } from '@/utils/yup';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { TextField } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import RequestError from '../../RequestError/RequestError';
import styles from './AuthModal.module.scss';
import { Success } from '@/errors';
import { useLoginUserMutation } from '@/redux/auth/api';
import { useNavigate } from 'react-router-dom';

interface LoginFormInputs {
	email: string;
	password: string;
}

const LoginModal = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { loginModalStatus } = useSelector(SelectAuth);
	const [loginUser, { isLoading: loginStatus }] = useLoginUserMutation();
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<LoginFormInputs>({
		resolver: yupResolver(LoginSchema),
	});

	useEffect(() => {
		dispatch(setMenuUrlValue(''));
	});

	const onSubmit = async (data: LoginFormInputs) => {
		const userData = {
			email: data.email,
			password: data.password,
		};
		dispatch(setRequestError(''));
		try {
			const res = await loginUser(userData).unwrap();
			dispatch(setRequestError(Success.successLogin));
			reset();
			setTimeout(() => {
				dispatch(setRequestError(''));
				dispatch(setLoginModalStatus(false));
				navigate(`/profile/${res.user.id}`);
			}, 2000);
		} catch (error: any) {
			dispatch(setRequestError(error.message || 'Произошла ошибка при входе'));
		}
	};

	const modalClose = (e: React.MouseEvent) => {
		if ((e.target as HTMLElement).classList.contains('dismiss')) {
			dispatch(setLoginModalStatus(false));
			dispatch(setRequestError(''));
		}
	};

	return (
		<div
			className={
				loginModalStatus
					? `${styles.authModal} ${styles.active}`
					: `${styles.authModal}`
			}
			onClick={modalClose}
		>
			<div className={`${styles.authModal__overlay} dismiss`}>
				<div className={styles.wrapper}>
					<div className={`${styles.authModal__close} dismiss`}></div>
					<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
						<h2 className={styles.title}>Авторизация</h2>
						<h2 className={styles.subtitle}>Введите ваш логин и пароль</h2>
						<TextField
							className={styles.input_box}
							label='Введите ваш email'
							variant='outlined'
							{...register('email')}
							error={!!errors.email}
							helperText={errors.email ? `${errors.email.message}` : ''}
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
						<RequestError error={Success.successLogin} />
						<LoadingButton
							loading={loginStatus}
							className={styles.button_box}
							variant='contained'
							type='submit'
						>
							Войти
						</LoadingButton>
						<div className={styles.text}>
							У вас нет аккаунта?
							<span
								style={{ color: 'blue', cursor: 'pointer', marginLeft: '5px' }}
								onClick={() => {
									dispatch(setLoginModalStatus(false));
									dispatch(setRegisterModalStatus(true));
								}}
							>
								Регистрация
							</span>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default LoginModal;

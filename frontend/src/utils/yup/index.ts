import { Errors } from '@/errors';
import * as yup from 'yup';

export const LoginSchema = yup.object().shape({
	email: yup.string().email('Неверный email').required('Email обязателен'),
	password: yup
		.string()
		.min(6, Errors.MinFieldLength)
		.required('Пароль обязателен'),
});

export const RegisterSchema = yup.object().shape({
	name: yup.string().required('Имя обязательно'),
	login: yup.string().required('Логин обязателен'),
	email: yup.string().email('Неверный email').required('Email обязателен'),
	password: yup
		.string()
		.min(6, 'Минимум 6 символов')
		.required('Пароль обязателен'),
	passwordRepeat: yup
		.string()
		.required('Повторите пароль')
		.oneOf([yup.ref('password')], 'Пароли должны совпадать'),
});

export const UpdateNameSchema = yup.object().shape({
	email: yup.string().email('Неверный email').required('Email обязателен'),
	login: yup.string().required('Логин обязателен'),
	name: yup.string().required('Имя обязательно'),
});

export const UpdatePasswordSchema = yup.object().shape({
	oldPassword: yup
		.string()
		.min(6, 'Минимум 6 символов')
		.required('Пароль обязателен'),
	newPassword: yup
		.string()
		.min(6, 'Минимум 6 символов')
		.required('Пароль обязателен'),
	newPasswordRepeat: yup
		.string()
		.required('Повторите пароль')
		.oneOf([yup.ref('newPassword')], 'Пароли должны совпадать'),
});

export const addFeedbackSchema = yup.object().shape({
	feedbackMessage: yup.string().required('Текст отзыва обязателен'),
});

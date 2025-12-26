import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import jestPlugin from 'eslint-plugin-jest';

export default tseslint.config(
	{ ignores: ['dist'] },
	{
		extends: [
			js.configs.recommended,
			...tseslint.configs.recommended,
			'plugin:import/recommended', // Добавляем плагин для работы с импортами
			'plugin:import/typescript', // Поддержка TypeScript для импортов,
			'plugin:jest/recommended',
		],
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		plugins: {
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
			import: require('eslint-plugin-import'), // Добавляем плагин import
			jest: jestPlugin,
		},
		settings: {
			'import/resolver': {
				typescript: {
					project: './tsconfig.app.json', // Указываем путь к tsconfig.app.json
				},
			},
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			'react-refresh/only-export-components': [
				'warn',
				{ allowConstantExport: true },
			],
			'import/no-unresolved': 'error', // Проверка неразрешенных импортов
			'import/extensions': ['error', 'never'], // Запрет расширений (.ts, .tsx) в импортах
			'jest/no-focused-tests': 'off',
		},
	}
);

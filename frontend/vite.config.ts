import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				// Автоматически импортируем vars.scss в каждый SCSS-файл
				additionalData: `@use "@/assets/scss/vars.scss" as *;`,
			},
		},
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					lodash: ['lodash'],
				},
			},
		},
	},
});

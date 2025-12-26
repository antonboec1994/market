/** @type {import('jest').Config} */
const config = {
	collectCoverage: true,
	collectCoverageFrom: ['src/**/*.{js,jsx}'],
	coverageDirectory: 'coverage',
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['<rootDir>/internal/jest.setup.js'],
	transform: {
		'^.+\\.(js|jsx)$': 'babel-jest',
	},
	moduleFileExtensions: ['js', 'jsx'],
	moduleNameMapper: {
		'^.+\\.svg$': 'jest-svg-transformer',
		'^.+\\.(css|less|scss)$': 'identity-obj-proxy',
	},
};
export default config;

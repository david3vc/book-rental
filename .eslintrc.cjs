module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
	extends: [
		'plugin:react/recommended',
		'standard-with-typescript',
		'plugin:react/jsx-runtime',
		'eslint-config-prettier',
	],
	overrides: [],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		sourceType: 'module',
		project: './tsconfig.json',
	},
	plugins: ['react'],
	rules: {},
};
import type { Config } from 'jest';

const config: Config = {
	testEnvironment: 'jsdom',
	preset: 'ts-jest/presets/default-esm',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	roots: ['<rootDir>/test'],
	moduleNameMapper: {
		'^express$': '<rootDir>/node_modules/express',
		'^react$': '<rootDir>/node_modules/react',
		'^nookies$': '<rootDir>/node_modules/nookies',
		'^zustand$': '<rootDir>/node_modules/zustand',
		'^jwt-decode$': '<rootDir>/node_modules/jwt-decode',
	},
	transformIgnorePatterns: [
		"/node_modules/(?!(@testing-library|@mui|nookies|jwt-decode|zustand)/)"
	],
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
	//verbose: true,
	collectCoverage: true,
	coverageDirectory: 'docs/coverage',
	coverageReporters: ['text', 'html', 'lcov'],
	coverageThreshold: {
		global: {
			branches: 80,
			functions: 80,
			lines: 80,
			statements: 80,
		},
	},
	transform: {
		'^.+\\.tsx?$': [
			'ts-jest',
			{
				tsconfig: 'config/tsconfig.test.json',
				diagnostics: {
					ignoreCodes: [151001],
				},
				useESM: true
			},
		],
	},
};

export default config;

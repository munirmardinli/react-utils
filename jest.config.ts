import type { Config } from 'jest';

const config: Config = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	moduleFileExtensions: ['ts', 'js'],
	roots: ['<rootDir>/test'],
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
	verbose: true,
	collectCoverage: true,
	coverageDirectory: 'docs/coverage',
	coverageReporters: ['text', 'html', 'lcov'],
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
	},
	coverageThreshold: {
		global: {
			branches: 75,
			functions: 75,
			lines: 75,
			statements: 75,
		},
	},
	transform: {
		'^.+\\.tsx?$': [
			'ts-jest',
			{
				tsconfig: 'tsconfig.test.json',
				diagnostics: {
					ignoreCodes: [151001],
				},
			},
		],
	},
};

export default config;

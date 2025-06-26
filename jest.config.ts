import type { Config } from 'jest';

const config: Config = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleFileExtensions: ['ts','js'],
	roots: ['<rootDir>/src'],
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
	verbose: true,
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
				tsconfig: 'tsconfig.json',
				diagnostics: {
					ignoreCodes: [151001],
				},
			},
		],
	},
};

export default config;

import type { Config } from 'jest';

const jestConfig: Config = {
  projects: [
    {
      moduleNameMapper: {
        '^~/(.*)$': '<rootDir>/app/$1',
      },
      displayName: 'test',
      clearMocks: true,
      testEnvironment: 'node',
    },
  ],
  collectCoverage: true,
  collectCoverageFrom: ['app/**/*.ts'],
  coverageThreshold: {
    global: {
      statements: 95,
    },
  },
};

export default jestConfig;

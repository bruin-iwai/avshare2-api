module.exports = {
  projects: [
    {
      displayName: 'test',
      clearMocks: true,
      testEnvironment: 'node',
      testPathIgnorePatterns: ['/node_modules/', '/__tests__/test-utils.js'],
      setupFilesAfterEnv: ['jest-extended'],
    },
  ],
  collectCoverage: true,
  collectCoverageFrom: ['index.js', 'app/**/*.js'],
  coverageThreshold: {
    global: {
      statements: 95,
    },
  },
};

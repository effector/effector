module.exports = {
  automock: false,
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.ts$': 'babel-jest',
  },
  collectCoverage: false,
  testMatch: [`<rootDir>/__tests__/**/*.test.ts`],
  //   watchPathIgnorePatterns: [],
  //   modulePathIgnorePatterns: [],
}

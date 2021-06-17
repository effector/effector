module.exports = {
  automock: false,
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.ts$': 'babel-jest',
  },
  collectCoverage: false,
  testMatch: [`<rootDir>/__tests__/**/*.test.ts`],
  watchPathIgnorePatterns: [`<rootDir>/__tests__/node.json`],
  modulePathIgnorePatterns: [`<rootDir>/__tests__/node.json`],
}

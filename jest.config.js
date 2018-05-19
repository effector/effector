//@flow

const moduleNameMapper = {
 '^effector$': '<rootDir>/src/index.js',
 '^effector/(.+)': '<rootDir>/src/$1',
}

const effectorConfig = {
 displayName: 'effector',
 testMatch: ['<rootDir>/src/effector/**/__test__/**/*.test.js'],
 collectCoverage: true,
 automock: false,
 browser: false,
 testEnvironment: 'node',
 transform: {
  '^.+\\.jsx?$': 'babel-jest',
 },
 moduleNameMapper,
 testPathIgnorePatterns: ['<rootDir>/node_modules/'],
 roots: ['<rootDir>/src/'],
}

const effect = packageTest('effect')

const event = packageTest('event')

const storeConfig = {
 displayName: 'store',
 testMatch: ['<rootDir>/src/store/**/__test__/**/*.test.js'],
 collectCoverage: true,
 automock: false,
 browser: false,
 testEnvironment: 'node',
 transform: {
  '^.+\\.jsx?$': 'babel-jest',
 },
 moduleNameMapper,
 testPathIgnorePatterns: ['<rootDir>/node_modules/'],
 roots: ['<rootDir>/src/'],
}

const reactConfig = {
 displayName: 'react',
 testMatch: ['<rootDir>/src/react/**/__test__/**/*.test.js'],
 collectCoverage: true,
 automock: false,
 // browser: false,
 // testEnvironment: 'jsdom',
 transform: {
  '^.+\\.jsx?$': 'babel-jest',
 },
 moduleNameMapper,
 testPathIgnorePatterns: ['<rootDir>/node_modules/'],
 roots: ['<rootDir>/src/'],
}

const projects = [effectorConfig, event, effect, storeConfig, reactConfig]

const config = {
 projects,
}

module.exports = config

function packageTest(displayName) {
 return {
  displayName,
  testMatch: [`<rootDir>/src/${displayName}/__tests__/**/*.test.js`],
  collectCoverage: true,
  automock: false,
  browser: false,
  testEnvironment: 'node',
  transform: {
   '^.+\\.jsx?$': 'babel-jest',
  },
  moduleNameMapper,
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  roots: ['<rootDir>/src/'],
 }
}

//@flow

const createDefaultConfig = () => ({
  automock: false,
  browser: false,
  testEnvironment: 'node',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  // moduleNameMapper: {},
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  transformIgnorePatterns: ['node_modules/(?!(bs-platform)/)'],
  // roots: ['<rootDir>/src/'],
})
const projects = [
  'effector',
  'effect',
  'event',
  'store',
  'domain',
  'graphite',
  'stdlib',
  'babel',
  'DataStructures',
]
module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.js',
    '!**/node_modules/**',
    '!**/__tests__/**',
    '!**/*.test.js',
    '!**/*.spec.js',
    '!<rootDir>/src/store/epic.js',
    // '!**/DataStructures/**',
    '!<rootDir>/src/graphite/tarjan/**',
    '!<rootDir>/src/babel/**',
    '!<rootDir>/src/fixtures/**',
    '!<rootDir>/src/invariant/**',
    '!<rootDir>/src/warning/**',
  ],

  watchPlugins: ['jest-runner-eslint/watch-fix'],
  projects: [
    ...projects.map(displayName =>
      Object.assign({}, createDefaultConfig(), {
        displayName,
        testMatch: [
          `<rootDir>/src/${displayName}/**/*.test.js`,
          `<rootDir>/src/${displayName}/**/*.spec.js`,
        ],
      }),
    ),
    Object.assign({}, createDefaultConfig(), {
      displayName: 'react',
      testEnvironment: 'jsdom',
      testMatch: [
        `<rootDir>/src/react/**/*.test.js`,
        `<rootDir>/src/react/**/*.spec.js`,
      ],
      setupFiles: ['<rootDir>/src/fixtures/performance.mock.js'],
    }),
    {
      runner: 'jest-runner-eslint',
      displayName: 'lint',
      testMatch: ['<rootDir>/src/**/*.js', '!**/DataStructures/**'],
    },
  ],
}

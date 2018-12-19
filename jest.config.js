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
]
module.exports = {
  // collectCoverage: true,
  // collectCoverageFrom: [
  //   '**/*.js',
  //   '!**/node_modules/**',
  //   '!**/__tests__/**',
  //   '!**/store/epic.js',
  //   '!**/store/epic.js',
  //   '!**/DataStructures/**',
  //   '!**/graphite/tarjan/**',
  //   '!**/babel/**',
  //   '!**/fixtures/**',
  // ],

  watchPlugins: ['jest-runner-eslint/watch-fix'],
  projects: [
    ...projects.map(displayName =>
      Object.assign({}, createDefaultConfig(), {
        displayName,
        testMatch: [
          `<rootDir>/src/${displayName}/__tests__/**/*.(test|spec).js`,
          `<rootDir>/src/${displayName}/**/__tests__/**/*.(test|spec).js`,
        ],
        collectCoverage: true,
        collectCoverageFrom: [
          `<rootDir>/src/${displayName}/**/*.js`,
          // `!<rootDir>/src/${displayName}/__tests__/**/*.(test|spec).js`,
          // `!<rootDir>/src/${displayName}/**/__tests__/**/*.(test|spec).js`,
          // '!**/node_modules/**',
          '!**/__tests__/**',
          // '!**/store/epic.js',
          // '!**/store/epic.js',
          // '!**/DataStructures/**',
          // '!**/graphite/tarjan/**',
          // '!**/babel/**',
          // '!**/fixtures/**',
        ],
      }),
    ),
    Object.assign({}, createDefaultConfig(), {
      displayName: 'react',
      testEnvironment: 'jsdom',
      testMatch: [
        `<rootDir>/src/react/__tests__/**/*.(test|spec).js`,
        `<rootDir>/src/react/**/__tests__/**/*.(test|spec).js`,
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

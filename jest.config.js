//@flow
const watchPathIgnorePatterns = [
  '<rootDir>/node_modules/',
  '<rootDir>/tools/',
  '<rootDir>/npm/',
  '<rootDir>/packages/',
  '<rootDir>/flow/',
  '<rootDir>/flow-typed/',
  '<rootDir>/examples/',
]
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
  watchPathIgnorePatterns,
  // roots: ['<rootDir>/src/'],
})

module.exports = {
  collectCoverage: boolean(process.env.COVERAGE, true),
  collectCoverageFrom: [
    '<rootDir>/src/**/*.js',
    '!**/node_modules/**',
    '!**/__tests__/**',
    '!**/*.test.js',
    '!**/*.spec.js',
    '!<rootDir>/src/babel/**',
    '!<rootDir>/src/fixtures/**',
    '!<rootDir>/src/invariant/**',
    '!<rootDir>/src/warning/**',
    '!<rootDir>/src/redux/**',
  ],

  watchPlugins: ['jest-runner-eslint/watch-fix'],
  watchPathIgnorePatterns,
  projects: createProjectList([
    'effector/effector',
    'effector/effect',
    'effector/event',
    'effector/store',
    'effector/domain',
    'effector/graphite',
    'effector/stdlib',
    'effector/perf',
    'effector/validate',
    'types',
    'forms',
    'babel',
    // 'redux',
    {
      react: {
        testEnvironment: 'jsdom',
        testMatch: [
          `<rootDir>/src/react/**/*.test.js`,
          `<rootDir>/src/react/**/*.spec.js`,
        ],
        setupFiles: ['<rootDir>/src/fixtures/performance.mock.js'],
        // watchPathIgnorePatterns,
      },
    },
    {
      reason: {
        testMatch: [`<rootDir>/src/reason/**/*_test.bs.js`],
      },
    },
  ]),
}

if (boolean(process.env.LINT, true)) {
  module.exports.projects.push({
    runner: 'jest-runner-eslint',
    displayName: 'lint',
    testMatch: ['<rootDir>/src/**/*.js', '!**/redux/**'],
    // watchPathIgnorePatterns,
  })
}

function createProjectList(items) {
  const list = []
  for (const item of items) {
    if (typeof item === 'string') {
      const project = Object.assign(
        {},
        createDefaultConfig(),
        {
          testMatch: [
            `<rootDir>/src/${item}/**/*.test.js`,
            `<rootDir>/src/${item}/**/*.spec.js`,
          ],
        },
        {
          displayName: item,
        },
      )
      list.push(project)
    } else {
      for (const key in item) {
        const val = item[key]
        const project = Object.assign(
          {},
          createDefaultConfig(),
          {
            testMatch: [
              `<rootDir>/src/${key}/**/*.test.js`,
              `<rootDir>/src/${key}/**/*.spec.js`,
            ],
          },
          val,
          {displayName: key},
        )
        list.push(project)
      }
    }
  }
  return list
}
function boolean(value, defaults) {
  switch (value) {
    case 'no':
    case 'false':
    case false:
      return false
    case 'yes':
    case 'true':
    case true:
      return true
    case null:
    case undefined:
    default:
      return defaults
  }
}

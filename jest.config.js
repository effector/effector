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
  modulePathIgnorePatterns: watchPathIgnorePatterns,
  testPathIgnorePatterns: watchPathIgnorePatterns,
  transformIgnorePatterns: [
    ...watchPathIgnorePatterns,
    'node_modules/(?!(bs-platform)/)',
  ],
  watchPathIgnorePatterns,
  // roots: ['<rootDir>/src/'],
})

module.exports = {
  collectCoverage: boolean(process.env.COVERAGE, false),
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
    {
      effector: {
        testMatch: [
          `<rootDir>/src/effector/__tests__/**/*.test.js`,
          `<rootDir>/src/effector/__tests__/**/*.spec.js`,
        ],
      },
    },
    'effector/effect',
    'effector/event',
    'effector/store',
    'effector/domain',
    'effector/kernel',
    'effector/stdlib',
    'effector/perf',
    'effector/validate',
    'effector/sample',
    'static-land',
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
    'types',
    {
      'new-types': {
        testMatch: [
          `<rootDir>/src/new-types/__tests__/**/*.test.js`,
          `<rootDir>/src/new-types/__tests__/**/*.spec.js`,
          `<rootDir>/src/new-types/__tests__/**/*.test.ts`,
          `<rootDir>/src/new-types/__tests__/**/*.spec.ts`,
          `<rootDir>/src/new-types/__tests__/**/*.test.tsx`,
          `<rootDir>/src/new-types/__tests__/**/*.spec.tsx`,
        ],
        transform: {
          '^.+\\.jsx?$': '<rootDir>/src/new-types/transformer.js',
          '^.+\\.tsx?$': '<rootDir>/src/new-types/transformer.js',
        },
      },
    },
  ]),
}

if (boolean(process.env.LINT, false)) {
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

function boolean(
  value /*: string | boolean | null | void*/,
  defaults /*: boolean*/,
) /*: boolean*/ {
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

const watchPathIgnorePatterns = [
  '<rootDir>/.effector/',
  '<rootDir>/.github/',
  '<rootDir>/.vscode/',
  '<rootDir>/bench/',
  '<rootDir>/coverage/',
  '<rootDir>/docs/',
  '<rootDir>/examples/',
  '<rootDir>/flow/',
  '<rootDir>/flow-typed/',
  '<rootDir>/integrations/',
  '<rootDir>/node_modules/',
  '<rootDir>/npm/',
  '<rootDir>/recipes/',
  '<rootDir>/rfc/',
  '<rootDir>/stats/',
  '<rootDir>/tasks/',
  '<rootDir>/tools/',
  '<rootDir>/website/',
]

const transform = {
  '^.+\\.jsx?$': 'babel-jest',
  '^.+\\.tsx?$': 'babel-jest',
}

const createDefaultConfig = () => ({
  automock: false,
  testEnvironment: 'node',
  transform,
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
    '!<rootDir>/src/babel/**',
    '!<rootDir>/src/fixtures/**',
  ],
  watchPathIgnorePatterns,
  projects: createProjectList(
    boolean(process.env.DOM, false)
      ? [
        {
          forestBrowser: {
            automock: false,
            testEnvironment: 'node',
            testMatch: [
              '<rootDir>/src/forest/__tests__/**/*.test.ts',
              '!<rootDir>/src/forest/__tests__/ssr/**',
            ],
            transform,
            testTimeout: 60e3,
            runner: './src/forest/__fixtures__/browserstackTestRunner.js',
          },
        },
      ]
      : [
        {
          effector: {
            testMatch: [`<rootDir>/src/effector/__tests__/**/*.test.ts`],
            transform,
          },
        },
        'babel',
        {
          react: {
            testEnvironment: 'jsdom',
            testMatch: [`<rootDir>/src/react/**/*.test.tsx`],
            transform,
          },
        },
        {
          vue: {
            testEnvironment: 'jsdom',
            testMatch: ['<rootDir>/src/vue/__tests__/**/*.test.ts'],
            transform,
          },
        },
        {
          reason: {
            testMatch: [`<rootDir>/src/reason/**/*_test.bs.js`],
          },
        },
        {
          forest: {
            automock: false,
            testEnvironment: 'node',
            testMatch: [`<rootDir>/src/forest/**/*.test.ts`],
            transform,
            testTimeout: 60e3,
          },
        },
        !boolean(process.env.NO_TYPE_TESTS, false) && {
          types: {
            testMatch: [
              `<rootDir>/src/types/__tests__/**/*.test.js`,
              `<rootDir>/src/types/__tests__/**/*.test.ts`,
              `<rootDir>/src/types/__tests__/**/*.test.tsx`,
            ],
            globalSetup: './src/types/src/globalSetup.js',
            globalTeardown: './src/types/src/globalTeardown.js',
            maxConcurrency: 25,
            transform,
          },
        },
      ],
  ),
}

function createProjectList(items) {
  items = items.filter(Boolean)
  const list = []
  for (const item of items) {
    if (typeof item === 'string') {
      const project = Object.assign(
        {},
        createDefaultConfig(),
        {
          testMatch: [`<rootDir>/src/${item}/**/*.test.js`],
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
            testMatch: [`<rootDir>/src/${key}/**/*.test.js`],
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

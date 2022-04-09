const watchPathIgnorePatterns = [
  '<rootDir>/.effector/',
  '<rootDir>/.github/',
  '<rootDir>/.vscode/',
  '<rootDir>/dist/',
  '<rootDir>/coverage/',
  '<rootDir>/docs/',
  '<rootDir>/examples/',
  '<rootDir>/node_modules/',
  '<rootDir>/npm/',
  '<rootDir>/recipes/',
  '<rootDir>/stats/',
  '<rootDir>/tasks/',
  '<rootDir>/tools/',
  '<rootDir>/website/',
  // 'node_modules',
  'docs',
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
  transformIgnorePatterns: watchPathIgnorePatterns,
  watchPathIgnorePatterns,
  // roots: ['<rootDir>/src/'],
})

const compatBrowsers = [
  {
    name: 'IE 11',
    effectorBuild: 'compat',
    needPolyfill: true,
    noAsyncAwait: true,
    capabilitiesTag: 'ie',
    capabilities: {
      'bstack:options': {
        os: 'Windows',
        osVersion: '7',
        projectName: 'effector-compat',
        buildName: 'IE 11',
        seleniumVersion: '3.141.59',
        ie: {
          noFlash: 'true',
          driver: '3.141.59',
        },
      },
      browserName: 'IE',
      browserVersion: '11.0',
    },
  },
  {
    name: 'Chrome TV',
    effectorBuild: 'compat',
    needPolyfill: true,
    noAsyncAwait: true,
    capabilitiesTag: 'chromeTV',
    capabilities: {
      'bstack:options': {
        os: 'OS X',
        osVersion: 'Mojave',
        projectName: 'effector-compat',
        buildName: 'Chrome TV',
        seleniumVersion: '3.141.59',
      },
      browserName: 'Chrome',
      browserVersion: '47.0',
      // 'browserstack.localIdentifier': 'Test123',
    },
  },
  {
    name: 'iPhone XS',
    effectorBuild: 'cjs',
    needPolyfill: false,
    capabilitiesTag: 'ios',
    capabilities: {
      'bstack:options': {
        osVersion: '12',
        deviceName: 'iPhone XS',
        realMobile: 'true',
        projectName: 'effector-compat',
        buildName: 'iPhone XS',
        deviceOrientation: 'portrait',
      },
    },
  },
  {
    name: 'macos Safari',
    effectorBuild: 'cjs',
    needPolyfill: false,
    capabilitiesTag: 'macos',
    capabilities: {
      'bstack:options': {
        os: 'OS X',
        osVersion: 'Mojave',
        projectName: 'effector-compat',
        buildName: 'macos Safari',
        seleniumVersion: '3.141.59',
      },
      browserName: 'Safari',
      browserVersion: '12.1',
    },
  },
]

module.exports = {
  collectCoverage: boolean(process.env.COVERAGE, false),
  collectCoverageFrom: [
    '<rootDir>/src/effector/**/*.ts',
    '<rootDir>/src/react/**/*.ts',
    '<rootDir>/src/forest/**/*.ts',
    '!**/node_modules/**',
    '!**/__tests__/**',
    '!**/*.test.js',
    '!**/*.test.ts',
  ],
  watchPathIgnorePatterns,
  projects: createProjectList(
    boolean(process.env.DOM, false)
      ? [
          {
            forestBrowser: {
              automock: false,
              testEnvironment: 'node',
              testMatch: ['<rootDir>/src/forest/__tests__/**/*.test.ts'],
              testPathIgnorePatterns: ['<rootDir>/src/forest/__tests__/ssr/'],
              transform,
              testTimeout: 120e3,
              runner:
                './tools/remoteDeviceTestRunner/browserstackTestRunner.js',
              globals: {
                needForest: true,
                effectorBuild: 'cjs',
                needPolyfill: false,
                capabilitiesTag: 'forest',
                noAsyncAwait: false,
                capabilities: {
                  'bstack:options': {
                    os: 'OS X',
                    osVersion: 'Mojave',
                    projectName: 'forest',
                    buildName: 'macos Safari',
                    seleniumVersion: '3.141.59',
                  },
                  browserName: 'Safari',
                  browserVersion: '12.1',
                },
              },
            },
          },
        ]
      : boolean(process.env.COMPAT, false)
      ? [createCompatProjects(compatBrowsers)]
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
              moduleNameMapper: boolean(process.env.REACT_17) && {
                '(.*)/fixtures/react$': '$1/fixtures/react-17',
                '^react-dom((\\/.*)?)$': 'react-dom-17$1',
                '^react((\\/.*)?)$': 'react-17$1',
              },
              globals: {
                IS_REACT_ACT_ENVIRONMENT: !boolean(process.env.REACT_17, false),
              },
            },
            vue: {
              testEnvironment: 'jsdom',
              testMatch: ['<rootDir>/src/vue/__tests__/**/*.test.ts'],
              transform,
            },
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
              globalSetup: './src/types/src/globalSetup.ts',
              globalTeardown: './src/types/src/globalTeardown.ts',
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

function createCompatProjects(browsers) {
  const projects = {}
  for (const {
    name,
    effectorBuild,
    needPolyfill,
    capabilitiesTag,
    capabilities,
    noAsyncAwait = false,
  } of browsers) {
    projects[`compat/${name}`] = {
      automock: false,
      testEnvironment: 'node',
      testMatch: ['<rootDir>/src/compat/**/*.test.ts'],
      transform,
      testTimeout: 120e3,
      runner: './tools/remoteDeviceTestRunner/browserstackTestRunner.js',
      globals: {
        needForest: false,
        effectorBuild,
        needPolyfill,
        capabilitiesTag,
        capabilities,
        noAsyncAwait,
      },
    }
  }
  return projects
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

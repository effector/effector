const {resolve: resolvePath} = require('path')

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

// babel-jest defaults `root` to jest rootDir, so it has to be pointed at the
// solid config explicitly, otherwise the root babel.config.js wins
const solidBabelRoot = resolvePath(__dirname, 'src/solid')
const solidTransform = {
  '^.+\\.jsx?$': ['babel-jest', {cwd: solidBabelRoot, root: solidBabelRoot}],
  '^.+\\.tsx?$': ['babel-jest', {cwd: solidBabelRoot, root: solidBabelRoot}],
}

// keeps the pre-jest-29 serialization of the existing snapshots
const snapshotFormat = {escapeString: true, printBasicPrototype: true}

const createDefaultConfig = () => ({
  automock: false,
  testEnvironment: 'node',
  transform,
  snapshotFormat,
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
    // browserstack retired ios 12, and 11 is not an option either: this runs
    // the plain cjs build with no polyfill, and it needs Array.prototype.flat,
    // which safari only got in 12. 13 is the oldest ios still offered above it
    name: 'iPhone 11',
    effectorBuild: 'cjs',
    needPolyfill: false,
    capabilitiesTag: 'ios',
    capabilities: {
      'bstack:options': {
        osVersion: '13',
        deviceName: 'iPhone 11',
        realMobile: 'true',
        projectName: 'effector-compat',
        buildName: 'iPhone 11',
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
  collectCoverage: boolean(process.env.COVERAGE),
  maxConcurrency: 25,
  collectCoverageFrom: [
    '<rootDir>/src/effector/**/*.ts',
    '<rootDir>/src/react/**/*.ts',
    '<rootDir>/src/solid/**/*.ts',
    '<rootDir>/src/forest/**/*.ts',
    '!**/node_modules/**',
    '!**/__tests__/**',
    '!**/*.test.js',
    '!**/*.test.ts',
  ],
  watchPathIgnorePatterns,
  projects: createProjectListByEnv({
    DOM: [
      {
        forestBrowser: {
          automock: false,
          testEnvironment: 'node',
          testMatch: ['<rootDir>/src/forest/__tests__/**/*.test.ts'],
          testPathIgnorePatterns: ['<rootDir>/src/forest/__tests__/ssr/'],
          transform,
          testTimeout: 120e3,
          runner: './tools/remoteDeviceTestRunner/browserstackTestRunner.js',
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
    ],
    COMPAT: [createCompatProjects(compatBrowsers)],
    OLD_REACT: [
      {
        react17: {
          testEnvironment: 'jsdom',
          testMatch: [`<rootDir>/src/react/**/*.test.tsx`],
          transform,
          moduleNameMapper: {
            '(.*)/fixtures/react$': '$1/fixtures/react-17',
            '^react-dom((\\/.*)?)$': 'react-dom-17$1',
            '^react((\\/.*)?)$': 'react-17$1',
          },
          globals: {
            IS_REACT_ACT_ENVIRONMENT: true,
          },
        },
        react18: {
          testEnvironment: 'jsdom',
          testMatch: [`<rootDir>/src/react/**/*.test.tsx`],
          transform,
          moduleNameMapper: {
            '(.*)/fixtures/react$': '$1/fixtures/react-18',
            '^react-dom((\\/.*)?)$': 'react-dom-18$1',
            '^react((\\/.*)?)$': 'react-18$1',
          },
          globals: {
            IS_REACT_ACT_ENVIRONMENT: true,
          },
        },
      },
    ],
    default: [
      {
        effector: {
          testMatch: [`<rootDir>/src/effector/__tests__/**/*.test.ts`],
          transform,
        },
        babel: {
          testMatch: [`<rootDir>/src/babel/**/*.test.(j|t)s`],
        },
        react: {
          testEnvironment: 'jsdom',
          testMatch: [`<rootDir>/src/react/**/*.test.tsx`],
          transform,
          globals: {
            IS_REACT_ACT_ENVIRONMENT: true,
          },
        },
        solid: {
          testEnvironment: 'jsdom',
          testMatch: [`<rootDir>/src/solid/**/*.test.tsx`],
          transform: solidTransform,
          setupFilesAfterEnv: ['<rootDir>/src/solid/__tests__/setupTests.ts'],
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
      !boolean(process.env.NO_TYPE_TESTS) && {
        types: {
          testMatch: [
            `<rootDir>/src/types/__tests__/**/*.test.js`,
            `<rootDir>/src/types/__tests__/**/*.test.ts`,
            `<rootDir>/src/types/__tests__/**/*.test.tsx`,
          ],
          globalSetup: './src/types/src/globalSetup.ts',
          globalTeardown: './src/types/src/globalTeardown.ts',
          transform,
        },
      },
    ],
  }),
}

function createProjectListByEnv(itemsMapRaw) {
  const {default: defaultProjects, ...itemsMap} = itemsMapRaw
  for (const envKey in itemsMap) {
    if (boolean(process.env[envKey])) {
      return createProjectList(itemsMap[envKey])
    }
  }
  return createProjectList(defaultProjects)
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

function boolean(value) {
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
      return false
  }
}

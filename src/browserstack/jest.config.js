require('dotenv').config()
const {resolve} = require('path')

const creds = {
  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,
}

const config = {
  displayName: '',
  testEnvironment: './testEnvironment.js',
  testMatch: ['<rootDir>/__tests__/**/*.test.js'],
  testEnvironmentOptions: {
    user: creds.user,
    key: creds.key,
    services: ['browserstack'],
    browserstackLocal: true,
    updateJob: false,
    capabilities: null,
    logLevel: 'warn',
    coloredLogs: true,
    screenshotPath: './errorShots/',
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    host: 'hub.browserstack.com',
    staticServer: {
      port: 5000,
      root: resolve(__dirname, '../..'),
    },
  },
  // automock: false,
  // browser: false,
  // transform: {
  //   '^.+\\.jsx?$': 'babel-jest',
  // },
}

const browsers = {
  'IE 10': {
    globals: {},
    capabilities: {
      'bstack:options': {
        os: 'Windows',
        osVersion: '7',
        projectName: 'effector-compat',
        buildName: 'IE 10',
        seleniumVersion: '3.141.59',
        ie: {
          noFlash: 'true',
          driver: '3.141.59',
        },
      },
      browserName: 'IE',
      browserVersion: '10.0',
    },
  },
  'Chrome TV': {
    globals: {},
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
  'iPhone XS': {
    globals: {},
    capabilities: {
      'bstack:options': {
        osVersion: '12',
        deviceName: 'iPhone XS',
        realMobile: 'true',
        projectName: 'effector-compat',
        buildName: 'iPhone XS',
        deviceOrientation: 'portrait',
        // seleniumVersion: '3.141.59',
      },
      // browserName: 'Safari',
      // browserVersion: '12.1',
    },
  },
  'macos Safari': {
    globals: {},
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
}

const projects = []

for (const name in browsers) {
  const {capabilities, globals} = browsers[name]
  projects.push({
    ...config,
    displayName: name,
    globals,
    testEnvironmentOptions: {
      ...config.testEnvironmentOptions,
      capabilities: {
        ...capabilities,
        'bstack:options': {
          ...capabilities['bstack:options'],
          userName: creds.user,
          accessKey: creds.key,
          // local: 'true',
          debug: 'true',
          video: 'true',
        },
        'browserstack.use_w3c': true,
        'browserstack.local': true,
        'browserstack.console': 'verbose',
        'browserstack.networkLogs': true,
      },
    },
  })
}

module.exports = {projects}

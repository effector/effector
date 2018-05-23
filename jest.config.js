//@flow

const effector = packageTest('effector')
const effect = packageTest('effect')
const event = packageTest('event')
const store = packageTest('store')
const react = packageTest('react', {
 testEnvironment: 'jsdom',
})

const projects = [effector, event, effect, store, react]

const config = {
 projects,
}

module.exports = config

function packageTest(displayName, opts = {}) {
 return Object.assign(
  {
   displayName,
   testMatch: [`<rootDir>/src/${displayName}/__tests__/**/*.(test|spec).js`],
   collectCoverage: true,
   automock: false,
   browser: false,
   testEnvironment: 'node',
   transform: {
    '^.+\\.jsx?$': 'babel-jest',
   },
   moduleNameMapper: {
    '^effector$': '<rootDir>/src/index.js',
    '^effector/(.+)': '<rootDir>/src/$1',
   },
   testPathIgnorePatterns: ['<rootDir>/node_modules/'],
   roots: ['<rootDir>/src/'],
  },
  opts,
 )
}

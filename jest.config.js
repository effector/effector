//@flow

const {loadYamlSync} = require('./scripts/yaml-util')

const projects = addProjects(loadYamlSync('./jestproject.yml'))
module.exports = {projects}

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
    'effector/fixtures': '<rootDir>/src/fixtures/index.js',
    '^effector/(.+)': '<rootDir>/src/$1',
   },
   testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/packages/'],
   roots: ['<rootDir>/src/'],
  },
  opts,
 )
}

function addProjects({tests, include}) {
 const projects = []
 for (const pkg of tests) {
  if (typeof pkg === 'string') {
   if (include[pkg]) projects.push(packageTest(pkg))
  } else {
   const [name, config] = pkg
   if (include[name]) {
    projects.push(packageTest(name, config))
   }
  }
 }
 return projects
}

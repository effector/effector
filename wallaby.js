process.env.BABEL_ENV = 'test'

module.exports = function(wallaby) {
 const getTest = name => `src/${name}/**/__tests__/**/*.test.js`
 return {
  files: [
   'src/**/*.js',
   {pattern: 'src/**/__tests__/**/*.*', ignore: true},
   // '!src/react/**/*.js',
   '!src/redux/**/*.js',
   // '!src/**/__tests__/**/*.test.js',
   // {pattern: 'src/**/*.debug.js', ignore: false},
   // '!schema-generator/**/__tests__/**/*.test.js',
  ],

  tests: [
   ...['event', 'graphite'].map(getTest),
   // 'src/effector/__tests__/index.test.js',
  ],

  env: {
   type: 'node',
   runner: 'node',
  },

  compilers: {
   '**/*.js?(x)': wallaby.compilers.babel({
    babel: require('babel-core'),
    presets: [
     '@babel/preset-flow',
     '@babel/preset-react',
     // [
     //  '@babel/preset-env',
     //  {
     //   loose: true,
     //   modules: 'commonjs',
     //   shippedProposals: true,
     //   targets: {
     //    node: 'current',
     //   },
     //  },
     // ],
    ],
    plugins: [
     '@babel/plugin-proposal-export-namespace-from',
     '@babel/plugin-proposal-optional-chaining',
     // '@babel/plugin-proposal-nullish-coalescing-operator',
     ['@babel/plugin-proposal-class-properties', {loose: true}],
     'babel-plugin-dev-expression',
     'macros',
     '@babel/plugin-transform-modules-commonjs',
    ],
   }),
  },

  testFramework: 'jest',

  debug: false,
  delays: {
   run: 1500,
  },
  setup(wallaby) {
   wallaby.testFramework.configure({
    // testMatch: [`<rootDir>/src/**/__tests__/**/*.(test|spec).js`],
    collectCoverage: false,
    automock: false,
    browser: false,
    testEnvironment: 'node',
    // transform: {
    //  '^.+\\.jsx?$': 'babel-jest',
    // },
    moduleNameMapper: {
     '^effector$': '<rootDir>/src/index.js',
     '^effector/(.+)': '<rootDir>/src/$1',
    },
    // testPathIgnorePatterns: ['<rootDir>/node_modules/'],
    // roots: ['<rootDir>/src/'],
   })
  },
 }
}

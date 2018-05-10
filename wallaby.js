process.env.BABEL_ENV = 'test'

module.exports = function(wallaby) {
 return {
  files: [
   'src/**/*.js',
   {pattern: 'src/graph/**/__test__/**/*.test.js', ignore: true},
   // '!schema-generator/**/__tests__/**/*.test.js',
  ],

  tests: ['src/graph/**/__test__/**/*.test.js'],

  env: {
   type: 'node',
   runner: 'node',
  },

  compilers: {
   '**/*.js?(x)': wallaby.compilers.babel({
    babel: require('babel-core'),
    presets: ['@babel/preset-react'],
    plugins: [
     '@babel/plugin-transform-flow-strip-types',
     [
      '@babel/plugin-proposal-object-rest-spread',
      {
       useBuiltIns: true,
      },
     ],
     ['@babel/plugin-proposal-class-properties', {loose: true}],
     '@babel/plugin-proposal-async-generator-functions',
     '@babel/plugin-transform-block-scoping',
     'babel-plugin-dev-expression',

     '@babel/plugin-transform-modules-commonjs',
    ],
   }),
  },

  testFramework: 'jest',

  debug: true,
  delays: {
   run: 2500,
  },
  setup(wallaby) {
   wallaby.testFramework.configure({
    displayName: 'graph',
    testMatch: ['<rootDir>/src/graph/**/__test__/**/*.test.js'],
    collectCoverage: true,
    automock: false,
    browser: false,
    testEnvironment: 'node',
    transform: {
     '^.+\\.jsx?$': 'babel-jest',
    },
    testPathIgnorePatterns: ['<rootDir>/node_modules/'],
    roots: ['<rootDir>/src/'],
   })
  },
 }
}

import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
// import alias from 'rollup-plugin-path-alias'
import cleanup from 'rollup-plugin-cleanup'

import {resolve as resolvePath} from 'path'

const babelCfg = {
 env: {
  test: {
   presets: ['@babel/preset-react'],
   plugins: ['@babel/plugin-transform-modules-commonjs'],
  },
  commonjs: {
   plugins: [
    'babel-plugin-transform-inline-environment-variables',
    '@babel/plugin-transform-modules-commonjs',
   ],
  },
  es: {
   plugins: ['babel-plugin-transform-inline-environment-variables'],
  },
 },
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
 ],
}

// const resolvePackage = name =>
//  resolvePath(__dirname, '..', `${name}/src/index.js`)

const presets = babelCfg.presets

const plugins = babelCfg.plugins

export default [
 {
  input: 'src/index.js',
  output: [
   {
    file: resolvePath(__dirname, 'npm/effector/effector.es.js'),
    format: 'es',
    name: 'effector',
    sourcemap: true,
   },
   {
    file: resolvePath(__dirname, 'npm/effector/effector.cjs.js'),
    format: 'cjs',
    name: 'effector',
    sourcemap: true,
   },
  ],

  plugins: [
   // alias({
   //  paths: {
   //   '@effector/effector': resolvePackage('effector'),
   //   '@effector/store': resolvePackage('store'),
   //   '@effector/derive': resolvePackage('derive'),
   //  },
   //  extensions: ['js'],
   // }),
   resolve({
    jail: resolvePath(__dirname, 'src'),
   }),
   babel({
    //  exclude: 'node_modules/**',
    presets,
    plugins,
    runtimeHelpers: true,
   }),
   cleanup({
    comments: [/#/],
   }),
  ],
 },
 {
  input: 'src/react/index.js',
  output: [
   {
    file: resolvePath(__dirname, 'npm/react/effector-react.es.js'),
    format: 'es',
    name: 'effector-react',
    sourcemap: true,
   },
   {
    file: resolvePath(__dirname, 'npm/react/effector-react.cjs.js'),
    format: 'cjs',
    name: 'effector-react',
    sourcemap: true,
   },
  ],

  plugins: [
   // alias({
   //  paths: {
   //   '@effector/effector': resolvePackage('effector'),
   //   '@effector/store': resolvePackage('store'),
   //   '@effector/derive': resolvePackage('derive'),
   //  },
   //  extensions: ['js'],
   // }),
   resolve({
    jail: resolvePath(__dirname, 'src'),
   }),
   babel({
    //  exclude: 'node_modules/**',
    presets,
    plugins,
    runtimeHelpers: true,
   }),
   cleanup({
    comments: [/#/],
   }),
  ],
 },
]

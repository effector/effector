import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import alias from 'rollup-plugin-path-alias'
import {resolve as resolvePath} from 'path'

const resolvePackage = name =>
 resolvePath(__dirname, '..', `${name}/src/index.js`)

const presets = [
 '@babel/preset-flow',
 [
  '@babel/preset-env',
  {
   modules: false,
   shippedProposals: true,
   targets: {
    node: '6',
   },
  },
 ],
]

const plugins = [
 [
  '@babel/plugin-proposal-object-rest-spread',
  {
   useBuiltIns: true,
  },
 ],
 ['@babel/plugin-proposal-class-properties', {loose: true}],
]

export default {
 input: 'src/index.js',
 output: [
  {
   file: resolvePath(__dirname, '../..', 'npm/effector.es.js'),
   format: 'es',
   name: 'effector',
   sourcemap: true,
  },
  {
   file: resolvePath(__dirname, '../..', 'npm/effector.cjs.js'),
   format: 'cjs',
   name: 'effector',
   sourcemap: true,
  },
 ],

 plugins: [
  alias({
   paths: {
    '@effector/effector': resolvePackage('effector'),
    '@effector/avar': resolvePackage('avar'),

    '@effector/atom': resolvePackage('atom'),
    '@effector/lazy': resolvePackage('lazy'),
    '@effector/emission': resolvePackage('emission'),
   },
   extensions: ['js'],
  }),
  resolve({
   jail: resolvePath(__dirname, '..'),
  }),
  babel({
   //  exclude: 'node_modules/**',
   presets,
   plugins,
   runtimeHelpers: true,
  }),
 ],
}

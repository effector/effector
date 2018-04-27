import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import alias from 'rollup-plugin-path-alias'
import cleanup from 'rollup-plugin-cleanup'

import {resolve as resolvePath} from 'path'

const babelCfg = require('../../.babelrc.js')

const resolvePackage = name =>
 resolvePath(__dirname, '..', `${name}/src/index.js`)

const presets = babelCfg.presets

const plugins = babelCfg.plugins

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
    '@effector/store': resolvePackage('store'),
    '@effector/derive': resolvePackage('derive'),
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
  cleanup({
   comments: [/#/],
  }),
 ],
}

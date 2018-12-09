//@noflow

import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import builtins from 'rollup-plugin-node-builtins'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import globals from 'rollup-plugin-node-globals'

import {resolve as resolvePath} from 'path'

const rollupPlugins = [
  globals(),
  builtins(),
  resolve({}),
  babel({
    // presets,
    // plugins,
    runtimeHelpers: true,
  }),
  replace({
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.platform': JSON.stringify('linux'),
  }),
  commonjs({}),
]

export default {
  input: resolvePath(__dirname, 'suite.js'),
  plugins: [...rollupPlugins],
  external: [], //['os', 'path', 'util', 'fs'],
  output: [
    {
      file: resolvePath(__dirname, 'browser', `suite.bundle.js`),
      format: 'iife',
      name: 'suite',
      sourcemap: false,
      // globals: {
      //   os: 'browseros',
      //   path: 'browserpath',
      //   util: 'browserutil',
      //   fs: 'browserfs',
      // },
    },
  ],
}

import {resolve} from 'path'

import babel from 'rollup-plugin-babel'
import resolvePlugin from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'

export default {
  input: resolve(__dirname, 'index.js'),
  plugins: [babel(), json(), resolvePlugin(), commonjs()],
  external: [
    'path',
    'execa',
    'fs-extra',
    'chroma-js',
    'js-yaml',
    'viz.js',
    'viz.js/full.render.js',
    'sharp',
    'chalk',
    'rollup',
    'rollup-plugin-json',
    'rollup-plugin-babel',
    'rollup-plugin-node-resolve',
    'rollup-plugin-terser',
    'rollup-plugin-commonjs',
    'rollup-plugin-replace',
    'rollup-plugin-size-snapshot',
  ],
  output: {
    file: resolve(__dirname, '..', 'builder.js'),
    format: 'cjs',
    sourcemap: false,
  },
}

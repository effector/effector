import babel from 'rollup-plugin-babel'
import resolver from 'rollup-plugin-node-resolve'
// import {uglify} from 'rollup-plugin-uglify'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import json from 'rollup-plugin-json'

import {resolve} from 'path'

import {nodeInternals, reactExports} from './fixtures'

export default {
 input: 'src/server/index.js',

 plugins: [
  resolver({
   preferBuiltins: true,
  }),
  json({}),
  babel({}),
  commonjs({
   namedExports: reactExports,
  }),
  replace({
   'process.env.NODE_ENV': JSON.stringify('production'),
  }),
 ],
 external: nodeInternals,
 output: [
  {
   file: `${__dirname}/dist/server.js`,
   format: 'cjs',
   name: 'serverBundle',
   sourcemap: true,
  },
 ],
}

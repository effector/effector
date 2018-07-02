import babel from 'rollup-plugin-babel'
import resolver from 'rollup-plugin-node-resolve'
// import {uglify} from 'rollup-plugin-uglify'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'

import {resolve} from 'path'

export default {
 input: 'src/server/index.js',
 plugins: [
  resolver({
   jsnext: true,
  }),
  babel({
   runtimeHelpers: true,
  }),
  commonjs({}),
  replace({
   'process.env.NODE_ENV': JSON.stringify('production'),
  }),
 ],
 external: [
  'effector',
  'effector-react',
  'express',
  'react',
  'invariant',
  'react-dom/server',
  // 'path',
 ],
 output: [
  {
   file: resolve(__dirname, 'dist', 'server.js'),
   format: 'cjs',
   name: 'serverBundle',
   sourcemap: true,
  },
 ],
}

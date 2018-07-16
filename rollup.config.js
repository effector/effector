import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import alias from './rollup-alias'
import {uglify} from 'rollup-plugin-uglify'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import {sizeSnapshot} from 'rollup-plugin-size-snapshot'
// import visualizer from 'rollup-plugin-visualizer'
import bucklescript from 'rollup-plugin-bucklescript'

import {resolve as resolvePath} from 'path'
import {readPackageList, writePackages} from './scripts/monorepoTools'

const packages = readPackageList()
if (!process.env.BUILD_UMD) writePackages(packages)

const staticPlugins = [
 babel({
  // presets,
  // plugins,
  runtimeHelpers: true,
  exclude: /(\.re|node_modules.*)/,
 }),
 bucklescript({module: 'es6', inSource: true}),
 uglify(
  {
   mangle: {
    toplevel: true,
   },
   compress: {
    pure_getters: true,
   },
   output: {
    comments: /#/i,
    // beautify: true,
    // indent_level: 2,
   },
  },
  require('uglify-es').minify,
 ),
]
if (process.env.BUILD_UMD) {
 staticPlugins.push(
  replace({
   'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  commonjs({}),
 )
}
const rollupPlugins = [
 alias({
  pathMap: getPathMap([
   'effect',
   'event',
   'store',
   'domain',
   'datatype',
   'graphite',
   'fixtures',
   'kind',
  ]),
  extensions: ['re', 'bs', 'bs.js', 'js'],
 }),
 resolve({}),
 ...staticPlugins,
 sizeSnapshot(),
]
function getPathMap(list) {
 const pairs = []
 for (const item of list) {
  pairs.push([`effector/${item}`, resolvePath(__dirname, 'src', item)])
 }
 return new Map(pairs)
}
function createBuild(name) {
 if (process.env.BUILD_UMD)
  return {
   input: resolvePath(__dirname, 'packages', name, 'index.js'),
   plugins: [...rollupPlugins],
   external: ['react'],
   output: [
    {
     file: resolvePath(__dirname, 'npm', name, `${name}.bundle.js`),
     format: 'iife',
     name: name.replace(/\-/gi, ''),
     sourcemap: true,
    },
   ],
  }
 return {
  input: resolvePath(__dirname, 'packages', name, 'index.js'),
  plugins: [
   // visualizer({
   //  filename: `./stats-${name}.html`,
   //  title: `${name} bundle stats`,
   //  sourcemap: true,
   // }),
   ...rollupPlugins,
  ],
  external: ['warning', 'invariant', 'react', 'most', 'symbol-observable'],
  output: [
   {
    file: resolvePath(__dirname, 'npm', name, `${name}.es.js`),
    format: 'es',
    name,
    sourcemap: true,
   },
   {
    file: resolvePath(__dirname, 'npm', name, `${name}.cjs.js`),
    format: 'cjs',
    name,
    sourcemap: true,
   },
  ],
 }
}

export default packages.map(createBuild)

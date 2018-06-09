import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import alias from './rollup-alias'
import {uglify} from 'rollup-plugin-uglify'
import visualizer from 'rollup-plugin-visualizer'
import bucklescript from 'rollup-plugin-bucklescript'

import {resolve as resolvePath} from 'path'
import {readPackageList, writePackages} from './scripts/monorepoTools'

const packages = readPackageList()
writePackages(packages)
const {plugins, presets} = require('./.babelrc.js')

const staticPlugins = [
 babel({
  presets,
  plugins,
  runtimeHelpers: true,
  exclude: /\.re/,
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
const rollupPlugins = [
 alias({
  pathMap: new Map([
   ['effector/effect', resolvePath(__dirname, 'src', 'effect')],
   ['effector/event', resolvePath(__dirname, 'src', 'event')],
   ['effector/store', resolvePath(__dirname, 'src', 'store')],
   ['effector/domain', resolvePath(__dirname, 'src', 'domain')],
   ['effector/datatype', resolvePath(__dirname, 'src', 'datatype')],
   ['effector/graphite', resolvePath(__dirname, 'src', 'graphite')],
   ['effector/fixtures', resolvePath(__dirname, 'src', 'fixtures')],
  ]),
  extensions: ['re', 'bs', 'bs.js', 'js'],
 }),
 resolve({}),
 ...staticPlugins,
]

function createBuild(name) {
 return {
  input: resolvePath(__dirname, 'packages', name, 'index.js'),
  plugins: [
   visualizer({
    filename: `./stats-${name}.html`,
    title: `${name} bundle stats`,
    sourcemap: true,
   }),
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

import {resolve as resolvePath} from 'path'

import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import {terser} from 'rollup-plugin-terser'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import {sizeSnapshot} from 'rollup-plugin-size-snapshot'

import {readPackageList, writePackages} from './scripts/monorepoTools'

const packages = readPackageList()
if (!process.env.BUILD_UMD) writePackages(packages)

const plugins = {
  babel: babel({
    runtimeHelpers: true,
    exclude: /(\.re|node_modules.*)/,
  }),
  replace: replace({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  commonjs: commonjs({}),
  resolve: resolve({}),
  terser: terser({
    ecma: 8,
    mangle: {
      toplevel: true,
    },
    compress: {
      pure_getters: true,
    },
    output: process.env.PRETTIFY
      ? {
        comments: /#/i,
        beautify: true,
        indent_level: 2,
      }
      : {
        comments: /#/i,
      },
  }),
  sizeSnapshot: sizeSnapshot(),
}

const staticPlugins = [plugins.babel]
if (process.env.BUILD_UMD) {
  staticPlugins.push(plugins.replace, plugins.commonjs)
}
const rollupPlugins = [
  plugins.resolve,
  ...staticPlugins,
  plugins.terser,
  plugins.sizeSnapshot,
]

function createBuild(name) {
  if (process.env.BUILD_UMD)
    return [
      {
        input: resolvePath(__dirname, 'packages', name, 'index.js'),
        plugins: rollupPlugins,
        external: ['react'],
        output: {
          file: resolvePath(__dirname, 'npm', name, `${name}.bundle.js`),
          format: 'iife',
          name: name.replace(/\-/gi, ''),
          sourcemap: true,
        },
      },
    ]
  const subconfig = output => ({
    input: resolvePath(__dirname, 'packages', name, 'index.js'),
    plugins: rollupPlugins,
    external: ['warning', 'invariant', 'react', 'most', 'symbol-observable'],
    output,
  })
  return [
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
  ].map(subconfig)
}

export default packages
  .map(createBuild)
  .reduce((list, items) => [...list, ...items], [])

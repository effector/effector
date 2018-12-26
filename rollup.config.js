import {join, extname, dirname, resolve as resolvePath, relative} from 'path'

import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import {terser} from 'rollup-plugin-terser'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import {sizeSnapshot} from 'rollup-plugin-size-snapshot'
import packageJson from './package.json'

import {readPackageList, writePackages} from './scripts/monorepoTools'

const packages = readPackageList()
if (!process.env.BUILD_UMD) writePackages(packages)
const minifyMode = {
  normal: {
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
  },
  extreme: {
    ecma: 8,
    // module: true,
    // toplevel: true,
    parse: {
      bare_returns: true,
    },
    mangle: {
      // toplevel: true,
      // properties: true,
    },
    nameCache: {},
    compress: {
      pure_getters: true,
      hoist_funs: true,
      arguments: true,
      keep_fargs: false,
      passes: 2,
      unsafe_arrows: true,
      unsafe_comps: true,
      unsafe_Function: true,
      unsafe_math: true,
      unsafe_methods: true,
      unsafe_proto: true,
      unsafe_regexp: true,
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
  },
}
const plugins = {
  babel: babel({
    // runtimeHelpers: true,
    // exclude: /(\.re|node_modules.*)/,
  }),
  replace: replace({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  commonjs: commonjs({}),
  resolve: resolve({}),
  terser: terser(minifyMode.normal),
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
  function sourcemapPathTransform(relativePath) {
    let packagePath = join('../..', packageJson.alias[name])
    if (extname(packagePath) !== '') {
      packagePath = dirname(packagePath)
    }
    return join(`node_modules/${name}`, relative(packagePath, relativePath))
  }
  
  if (name.startsWith('bs')) return []
  if (process.env.BUILD_UMD)
    return [
      {
        input: resolvePath(__dirname, 'packages', name, 'index.js'),
        plugins: rollupPlugins,
        external: ['react', 'effector'],
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
    external: [
      'warning',
      'invariant',
      'react',
      'vue',
      'most',
      'symbol-observable',
      'effector',
    ],
    output,
  })
  return [
    {
      file: resolvePath(__dirname, 'npm', name, `${name}.es.js`),
      format: 'es',
      name,
      sourcemap: true,
      sourcemapPathTransform,
    },
    {
      file: resolvePath(__dirname, 'npm', name, `${name}.cjs.js`),
      format: 'cjs',
      name,
      sourcemap: true,
      sourcemapPathTransform,
    },
  ].map(subconfig)
}

export default packages
  .map(createBuild)
  .reduce((list, items) => [...list, ...items], [])

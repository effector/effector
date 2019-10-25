//@flow
import {rollup} from 'rollup'
//$off
import babel from 'rollup-plugin-babel'
import json from 'rollup-plugin-json'
//$off
import resolve from 'rollup-plugin-node-resolve'
//$off
import {terser} from 'rollup-plugin-terser'
//$off
import commonjs from 'rollup-plugin-commonjs'
//$off
import replace from 'rollup-plugin-replace'
//$off
import {sizeSnapshot} from 'rollup-plugin-size-snapshot'
//$off
import analyze from 'rollup-plugin-visualizer'

import graphPlugin from './moduleGraphGenerator'
import {dir, getSourcemapPathTransform} from './utils'
import {minifyConfig} from './minificationConfig'

const nameCache = {}
const compatNameCache = {}
const onwarn = (warning, rollupWarn: any) => {
  if (warning.code !== 'CIRCULAR_DEPENDENCY') {
    rollupWarn(warning)
  }
}

const compatTarget = {
  browsers: [
    'Chrome 47',
    'last 2 Firefox versions',
    'last 2 Safari versions',
    'last 2 Edge versions',
    'IE 11',
  ],
}

const getPlugins = (name: string) => ({
  babel: babel({
    runtimeHelpers: false,
    exclude: /(\.re|node_modules.*)/,
  }),
  replace: replace({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  commonjs: commonjs({}),
  resolve: resolve({}),
  sizeSnapshot: sizeSnapshot({
    printInfo: false,
  }),
  analyzer: analyze({
    filename: `stats/${name}.html`,
    title: `${name} size report`,
    sourcemap: true,
  }),
  terser: terser(
    minifyConfig({
      beautify: !!process.env.PRETTIFY,
    }),
  ),
  graph: graphPlugin({
    output: 'modules.dot',
    exclude: 'effector/package.json',
  }),
  json: json({
    preferConst: true,
    indent: '  ',
  }),
})

export async function rollupBabel() {
  const name = '@effector/babel-plugin'
  const plugins = getPlugins(name)
  const terserConfig = minifyConfig({
    beautify: true,
  })
  const build = await rollup({
    input: dir('src/babel/babel-plugin'),
    plugins: [
      plugins.babel,
      terser({
        ...terserConfig,
        compress: false,
        mangle: false,
        keep_classnames: true,
        keep_fnames: true,
        toplevel: false,
      }),
    ],
    external: ['./plugin/defaultMetaVisitor.js'],
  })
  await build.write({
    file: dir(`npm/${name}/index.js`),
    format: 'cjs',
    freeze: false,
    name,
    sourcemap: true,
  })
}

export async function rollupBabelReact() {
  const name = '@effector/babel-plugin-react'
  const plugins = getPlugins(name)
  const terserConfig = minifyConfig({
    beautify: true,
  })
  const build = await rollup({
    input: dir('src/babel/babel-plugin-react'),
    plugins: [
      plugins.babel,
      terser({
        ...terserConfig,
        compress: false,
        mangle: false,
        keep_classnames: true,
        keep_fnames: true,
        toplevel: false,
      }),
    ],
  })
  await build.write({
    file: dir(`npm/${name}/index.js`),
    format: 'cjs',
    freeze: false,
    name,
    sourcemap: true,
  })
}

export async function rollupEffector() {
  const name = 'effector'
  await Promise.all([
    createEsCjs(name, {
      file: {
        cjs: dir(`npm/${name}/${name}.cjs.js`),
        es: dir(`npm/${name}/${name}.es.js`),
      },
      renderModuleGraph: true,
    }),
    createUmd(name, {
      external: ['react', 'effector'],
      file: dir(`npm/${name}/${name}.umd.js`),
      umdName: name,
      globals: {},
    }),
    createCompat(name),
  ])
}

export async function rollupEffectorReduxAdapter() {
  const name = '@effector/redux-adapter'

  await Promise.all([
    createEsCjs(name, {
      file: {
        cjs: dir(`npm/${name}/adapter.cjs.js`),
        es: dir(`npm/${name}/adapter.es.js`),
      },
    }),
    createUmd(name, {
      external: ['effector'],
      file: dir(`npm/${name}/adapter.umd.js`),
      umdName: 'effectorReduxAdapter',
      globals: {
        effector: 'effector',
      },
    }),
    createCompat(name),
  ])
}

export async function rollupEffectorForms() {
  const name = '@effector/forms'

  await Promise.all([
    createEsCjs(name, {
      file: {
        cjs: dir(`npm/${name}/forms.cjs.js`),
        es: dir(`npm/${name}/forms.es.js`),
      },
    }),
    createUmd(name, {
      external: ['react', 'effector'],
      file: dir(`npm/${name}/forms.umd.js`),
      umdName: 'effectorForms',
      globals: {
        effector: 'effector',
        react: 'React',
      },
    }),
    createCompat(name),
  ])
}

export async function rollupEffectorReact() {
  const name = 'effector-react'

  await Promise.all([
    createEsCjs(name, {
      file: {
        cjs: dir(`npm/${name}/${name}.cjs.js`),
        es: dir(`npm/${name}/${name}.es.js`),
      },
    }),
    createUmd(name, {
      external: ['react', 'effector'],
      file: dir(`npm/${name}/${name}.umd.js`),
      umdName: 'effectorReact',
      globals: {
        effector: 'effector',
        react: 'React',
      },
    }),
    createCompat(name),
  ])
}

export async function rollupEffectorVue() {
  const name = 'effector-vue'
  await Promise.all([
    createEsCjs(name, {
      file: {
        cjs: dir(`npm/${name}/${name}.cjs.js`),
        es: dir(`npm/${name}/${name}.es.js`),
      },
    }),
    createUmd(name, {
      external: ['vue', 'effector'],
      file: dir(`npm/${name}/${name}.umd.js`),
      umdName: 'effectorVue',
      globals: {
        effector: 'effector',
        vue: 'Vue',
      },
    }),
    createCompat(name),
  ])
}

async function createUmd(name, {external, file, umdName, globals}) {
  const plugins = getPlugins(`${name}.umd`)
  const build = await rollup({
    onwarn,
    input: dir(`packages/${name}/index.js`),
    plugins: [
      plugins.resolve,
      plugins.json,
      plugins.babel,
      plugins.replace,
      plugins.commonjs,
      plugins.sizeSnapshot,
      plugins.terser,
      plugins.analyzer,
    ],
    external,
  })
  await build.write({
    file,
    format: 'umd',
    freeze: false,
    name: umdName,
    sourcemap: true,
    globals,
  })
}
async function createCompat(name) {
  const plugins = getPlugins(`${name}.compat`)
  //$off
  const {getAliases} = require('../babel.config')
  const terserConfig = minifyConfig({
    beautify: !!process.env.PRETTIFY,
  })
  const pluginList = [
    plugins.resolve,
    plugins.json,
    babel({
      runtimeHelpers: false,
      exclude: /(\.re|node_modules.*)/,
      babelrc: false,
      presets: [
        '@babel/preset-flow',
        ['@babel/preset-react', {useBuiltIns: false}],
        [
          '@babel/preset-env',
          {
            loose: true,
            useBuiltIns: 'entry',
            modules: false,
            shippedProposals: true,
            targets: compatTarget,
          },
        ],
      ],
      plugins: [
        '@babel/plugin-proposal-export-namespace-from',
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-proposal-nullish-coalescing-operator',
        ['@babel/plugin-proposal-class-properties', {loose: true}],
        'macros',
        [
          'babel-plugin-module-resolver',
          {
            alias: getAliases({
              isBuild: true,
              isTest: false,
              isCompat: true,
            }),
          },
        ],
      ],
    }),
    plugins.sizeSnapshot,
    terser({
      ...terserConfig,
      parse: {
        ...terserConfig.parse,
        ecma: 5,
      },
      compress: {
        ...terserConfig.compress,
        directives: false,
        ecma: 5,
      },
      mangle: {
        ...terserConfig.mangle,
        safari10: true,
      },
      output: {
        ...terserConfig.output,
        ecma: 5,
        safari10: true,
        webkit: true,
      },
      ecma: 5,
      nameCache: compatNameCache,
      safari10: true,
    }),
    plugins.analyzer,
  ]
  const build = await rollup({
    onwarn,
    input: dir(`packages/${name}/index.js`),
    external: [
      'react',
      'vue',
      'symbol-observable',
      'effector',
      'effector/compat',
    ],
    plugins: pluginList,
  })
  await build.write({
    file: dir(`npm/${name}/compat.js`),
    format: 'cjs',
    freeze: false,
    name,
    sourcemap: true,
    sourcemapPathTransform: getSourcemapPathTransform(name),
  })
}
async function createEsCjs(
  name,
  {
    file: {es, cjs},
    renderModuleGraph = false,
  }: {|file: {|es: string, cjs: string|}, renderModuleGraph?: boolean|},
) {
  const plugins = getPlugins(name)
  const pluginList = [
    plugins.resolve,
    plugins.json,
    plugins.babel,
    plugins.sizeSnapshot,
    plugins.terser,
    plugins.analyzer,
  ]
  if (renderModuleGraph) {
    pluginList.push(
      graphPlugin({
        output: 'modules.dot',
        exclude: 'effector/package.json',
      }),
    )
  }
  const build = await rollup({
    onwarn,
    input: dir(`packages/${name}/index.js`),
    external: ['react', 'vue', 'symbol-observable', 'effector'],
    plugins: pluginList,
  })
  await Promise.all([
    build.write({
      file: cjs,
      format: 'cjs',
      freeze: false,
      name,
      sourcemap: true,
      sourcemapPathTransform: getSourcemapPathTransform(name),
    }),
    build.write({
      file: es,
      format: 'es',
      freeze: false,
      name,
      sourcemap: true,
      sourcemapPathTransform: getSourcemapPathTransform(name),
    }),
  ])
}

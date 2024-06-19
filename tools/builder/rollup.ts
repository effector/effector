import {rollup} from 'rollup'
import {babel} from '@rollup/plugin-babel'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import {terser} from 'rollup-plugin-terser'
import commonjs from '@rollup/plugin-commonjs'
import analyze from 'rollup-plugin-visualizer'
import alias from '@rollup/plugin-alias'

import {dir, getSourcemapPathTransform} from './utils'
import {minifyConfig} from './minificationConfig'

const compatNameCache = {}
const onwarn = (warning: any, rollupWarn: any) => {
  if (
    warning.code !== 'CIRCULAR_DEPENDENCY' &&
    warning.code !== 'NON_EXISTENT_EXPORT'
  ) {
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

const extensions = ['.js', '.mjs', '.ts', '.tsx']
const externals = [
  'effector',
  'effector/effector.mjs',
  'effector/compat',
  'effector-react',
  'effector-react/effector-react.mjs',
  'effector-react/compat',
  'effector-vue',
  'effector-vue/effector-vue.mjs',
  'effector-vue/compat',
  'effector-solid',
  'effector-solid/effector-solid.mjs',
  'forest',
  'forest/forest.mjs',
  'forest/server',
  '@vue/reactivity',
  '@vue/runtime-core',
  'vue',
  'react',
  'use-sync-external-store/shim',
  'use-sync-external-store/shim/with-selector',
  'use-sync-external-store/shim/index.js',
  'use-sync-external-store/shim/with-selector.js',
  'solid-js',
  'solid-js/web',
]

const getPlugins = (
  name: string,
  {
    isEsm = false,
    replaceVueReactivity = false,
    replaceReactShim = false,
    replaceVueNext = false,
  } = {},
) => ({
  babel: isEsm
    ? babel({
        babelHelpers: 'bundled',
        extensions,
        skipPreflightCheck: true,
        exclude: /node_modules.*/,
        babelrc: false,
        ...require('../babel.config').generateConfig({
          isBuild: true,
          isTest: false,
          isCompat: false,
          isEsm: true,
          replaceVueReactivity,
          replaceVueNext,
          replaceReactShim,
        }),
      })
    : babel({
        babelHelpers: 'bundled',
        skipPreflightCheck: true,
        extensions,
        exclude: /node_modules.*/,
        babelrc: false,
        ...require('../babel.config').generateConfig({
          isBuild: true,
          isTest: false,
          isCompat: false,
          isEsm: false,
          replaceVueReactivity,
          replaceVueNext,
          replaceReactShim: false,
        }),
      }),
  commonjs: commonjs({extensions}),
  resolve: resolve({extensions}),
  analyzer: analyze({
    filename: `stats/${name}.html`,
    title: `${name} size report`,
    sourcemap: true,
    template: 'treemap',
  }),
  analyzerJSON: analyze({
    sourcemap: true,
    filename: `stats/${name}.json`,
    template: 'raw-data',
  }),
  terser: terser(
    minifyConfig({
      beautify: !!process.env.PRETTIFY,
    }) as any,
  ),
  json: json({
    preferConst: true,
    indent: '  ',
  }),
  alias: alias({
    entries: {
      effector: dir('src/effector'),
    },
  }),
})

export async function rollupEffector() {
  const name = 'effector'
  await Promise.all([
    createEsCjs(name, {
      file: {
        cjs: dir(`npm/${name}/${name}.cjs.js`),
        es: dir(`npm/${name}/${name}.mjs`),
      },
      inputExtension: 'ts',
    }),
    createEsCjs(name, {
      file: {
        cjs: dir(`npm/${name}/inspect.js`),
        es: dir(`npm/${name}/inspect.mjs`),
      },
      input: 'inspect',
      inputExtension: 'ts',
    }),
    createCompat(name),
  ])
}
export async function rollupEffectorDom({name}: {name: string}) {
  await Promise.all([
    createEsCjs(name, {
      file: {
        cjs: dir(`npm/${name}/${name}.cjs.js`),
        es: dir(`npm/${name}/${name}.mjs`),
      },
      inputExtension: 'ts',
    }),
    createEsCjs(name, {
      file: {
        cjs: dir(`npm/${name}/server.js`),
        es: dir(`npm/${name}/server.mjs`),
      },
      input: 'server',
      inputExtension: 'ts',
    }),
  ])
}

export async function rollupEffectorReact() {
  const name = 'effector-react'

  await Promise.all([
    createEsCjs(name, {
      file: {
        cjs: dir(`npm/${name}/${name}.cjs.js`),
        es: dir(`npm/${name}/${name}.mjs`),
      },
      inputExtension: 'ts',
      replaceReactShim: true,
    }),
    createCompat(name),
  ])
}

export async function rollupEffectorSolid() {
  const name = 'effector-solid'

  await Promise.all([
    createEsCjs(name, {
      file: {
        cjs: dir(`npm/${name}/${name}.cjs.js`),
        es: dir(`npm/${name}/${name}.mjs`),
      },
      inputExtension: 'ts',
    }),
  ])
}

export async function rollupEffectorVue() {
  const name = 'effector-vue'
  await Promise.all([
    createEsCjs(name, {
      file: {
        cjs: dir(`npm/${name}/${name}.cjs.js`),
        es: dir(`npm/${name}/${name}.mjs`),
      },
      inputExtension: 'ts',
    }),
    createEsCjs(name, {
      file: {
        cjs: dir(`npm/${name}/composition.cjs.js`),
        es: dir(`npm/${name}/composition.mjs`),
      },
      input: 'composition',
      inputExtension: 'ts',
      replaceVueReactivity: true,
    }),
    createCompat(name),
  ])
}

async function createCompat(name: string) {
  const plugins = getPlugins(`${name}.compat`)

  const {getAliases} = require('../babel.config')
  const terserConfig = minifyConfig({
    beautify: !!process.env.PRETTIFY,
  })
  const pluginList = [
    plugins.resolve,
    plugins.json,
    babel({
      babelHelpers: 'bundled',
      extensions,
      skipPreflightCheck: true,
      exclude: /node_modules.*/,
      babelrc: false,
      presets: [
        [
          '@babel/preset-typescript',
          {
            isTSX: true,
            allExtensions: true,
          },
        ],
        ['@babel/preset-react', {useBuiltIns: false}],
        [
          '@babel/preset-env',
          {
            loose: true,
            useBuiltIns: 'entry',
            corejs: 3,
            modules: false,
            shippedProposals: true,
            targets: compatTarget,
          },
        ],
      ],
      plugins: [
        '@babel/plugin-transform-export-namespace-from',
        '@babel/plugin-transform-optional-chaining',
        '@babel/plugin-transform-nullish-coalescing-operator',
        ['@babel/plugin-transform-class-properties', {loose: true}],
        [
          'babel-plugin-module-resolver',
          {
            alias: getAliases({
              isBuild: true,
              isTest: false,
              isCompat: true,
              isEsm: false,
            }),
            loglevel: 'silent',
          },
        ],
      ],
    }),
    plugins.commonjs,
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
    plugins.analyzerJSON,
  ]
  const build = await rollup({
    onwarn,
    input: dir(`packages/${name}/index.ts`),
    external: externals,
    plugins: pluginList,
  })
  await build.write({
    file: dir(`npm/${name}/compat.js`),
    format: 'cjs',
    freeze: false,
    name,
    sourcemap: true,
    sourcemapPathTransform: getSourcemapPathTransform(name),
    externalLiveBindings: false,
  })
}
async function createEsCjs(
  name: string,
  {
    file: {es, cjs},
    input = 'index',
    inputExtension = 'js',
    replaceVueReactivity = false,
    replaceReactShim = false,
  }: {
    file: {es?: string; cjs: string}
    input?: string
    inputExtension?: string
    replaceVueReactivity?: boolean
    replaceReactShim?: boolean
  },
) {
  const pluginsCjs = getPlugins(input === 'index' ? name : input, {
    replaceVueNext: true,
    replaceReactShim: false,
  })
  const pluginListCjs = [
    pluginsCjs.resolve,
    pluginsCjs.json,
    pluginsCjs.babel,
    pluginsCjs.terser,
    pluginsCjs.analyzer,
    pluginsCjs.analyzerJSON,
  ]
  const pluginsEsm = getPlugins(input === 'index' ? name : input, {
    isEsm: true,
    replaceVueReactivity,
    replaceVueNext: true,
    replaceReactShim,
  })
  const pluginListEsm = [
    pluginsEsm.resolve,
    pluginsEsm.json,
    pluginsEsm.babel,
    pluginsEsm.terser,
    pluginsEsm.analyzer,
    pluginsEsm.analyzerJSON,
  ]
  const [buildCjs, buildEs] = await Promise.all([
    rollup({
      onwarn,
      input: dir(`packages/${name}/${input}.${inputExtension}`),
      external: externals,
      plugins: pluginListCjs,
    }),
    es &&
      rollup({
        onwarn,
        input: dir(`packages/${name}/${input}.${inputExtension}`),
        external: externals,
        plugins: pluginListEsm,
      }),
  ])
  await Promise.all([
    buildCjs.write({
      file: cjs,
      format: 'cjs',
      freeze: false,
      name,
      sourcemap: true,
      sourcemapPathTransform: getSourcemapPathTransform(name),
      externalLiveBindings: false,
    }),
    es &&
      buildEs.write({
        file: es,
        format: 'es',
        freeze: false,
        name,
        sourcemap: true,
        sourcemapPathTransform: getSourcemapPathTransform(name),
      }),
  ])
}

import {rollup} from 'rollup'
import {babel} from '@rollup/plugin-babel'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import {terser} from 'rollup-plugin-terser'
import commonjs from '@rollup/plugin-commonjs'
//@ts-expect-error
import {sizeSnapshot} from 'rollup-plugin-size-snapshot'
//@ts-expect-error
import analyze from 'rollup-plugin-visualizer'
import alias from '@rollup/plugin-alias'

import graphPlugin from './moduleGraphGenerator'
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
  'effector-react/scope',
  'effector-react/scope.mjs',
  'effector-react/compat',
  'effector-vue',
  'effector-vue/effector-vue.mjs',
  'effector-vue/compat',
  'forest',
  'forest/forest.mjs',
  'forest/server',
  '@vue/reactivity',
  '@vue/runtime-core',
  'vue',
  'react',
]

const getPlugins = (
  name: string,
  {isEsm = false, replaceVueReactivity = false, replaceVueNext = false} = {},
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
        }),
      }),
  commonjs: commonjs({extensions}),
  resolve: resolve({extensions}),
  sizeSnapshot: sizeSnapshot({
    printInfo: false,
  }),
  analyzer: analyze({
    filename: `stats/${name}.html`,
    title: `${name} size report`,
    sourcemap: true,
    template: 'treemap',
  }),
  analyzerJSON: analyze({
    sourcemap: true,
    json: true,
    filename: `stats/${name}.json`,
  }),
  terser: terser(
    minifyConfig({
      beautify: !!process.env.PRETTIFY,
      inline: !name.endsWith('.umd'),
    }) as any,
  ),
  graph: graphPlugin({
    output: 'modules.dot',
    exclude: 'effector/package.json',
  }),
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
      renderModuleGraph: true,
      inputExtension: 'ts',
    }),
    createEsCjs(name, {
      file: {
        cjs: dir(`npm/${name}/fork.js`),
        es: dir(`npm/${name}/fork.mjs`),
      },
      input: 'fork',
      inputExtension: 'ts',
    }),
    createUmd(name, {
      external: externals,
      file: dir(`npm/${name}/${name}.umd.js`),
      umdName: name,
      globals: {},
      extension: 'ts',
    }),
    createCompat(name, 'ts'),
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
    createUmd(name, {
      external: externals,
      file: dir(`npm/${name}/${name}.umd.js`),
      umdName: name,
      globals: {
        effector: 'effector',
      },
      extension: 'ts',
      bundleEffector: false,
    }),
    // createCompat(name),
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
    }),
    createSSR({
      file: {
        cjs: dir(`npm/${name}/scope.js`),
        es: dir(`npm/${name}/scope.mjs`),
      },
    }),
    createUmd(name, {
      external: externals,
      file: dir(`npm/${name}/${name}.umd.js`),
      umdName: 'effectorReact',
      globals: {
        effector: 'effector',
        react: 'React',
      },
      extension: 'ts',
    }),
    createCompat(name, 'ts'),
  ])

  async function createSSR({
    file: {cjs, es},
  }: {
    file: {cjs: string; es: string}
  }) {
    await Promise.all([
      runBuild(cjs, 'cjs'),
      runBuild(es, 'es'),
      createEsCjs(name, {
        file: {
          cjs: dir(`npm/${name}/ssr.js`),
          es: dir(`npm/${name}/ssr.mjs`),
        },
        input: 'ssr',
        inputExtension: 'ts',
      }),
    ])
    async function runBuild(file: string, format: 'cjs' | 'es') {
      const plugins = getPlugins(name, {isEsm: format === 'es'})
      const pluginList = [
        plugins.resolve,
        plugins.json,
        plugins.babel,
        plugins.sizeSnapshot,
        plugins.terser,
        plugins.analyzer,
        plugins.analyzerJSON,
      ]
      const build = await rollup({
        onwarn,
        input: dir(`packages/${name}/scope.ts`),
        external: externals,
        plugins: pluginList,
      })
      await build.write({
        file,
        format,
        freeze: false,
        name,
        sourcemap: true,
        sourcemapPathTransform: getSourcemapPathTransform(name),
        externalLiveBindings: format === 'es',
      })
    }
  }
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
    createEsCjs(name, {
      file: {
        cjs: dir(`npm/${name}/ssr.cjs.js`),
        es: dir(`npm/${name}/ssr.mjs`),
      },
      input: 'ssr',
      inputExtension: 'ts',
      replaceVueReactivity: true,
    }),
    createUmd(name, {
      external: externals,
      file: dir(`npm/${name}/${name}.umd.js`),
      umdName: 'effectorVue',
      globals: {
        effector: 'effector',
        vue: 'Vue',
      },
      extension: 'ts',
    }),
    createCompat(name, 'ts'),
  ])
}

async function createUmd(
  name: string,
  {external, file, umdName, globals, extension = 'js', bundleEffector = false},
) {
  const plugins = getPlugins(`${name}.umd`)
  const build = await rollup({
    onwarn,
    input: dir(`packages/${name}/index.${extension}`),
    plugins: [
      plugins.resolve,
      plugins.json,
      plugins.babel,
      bundleEffector && plugins.alias,
      plugins.commonjs,
      plugins.sizeSnapshot,
      plugins.terser,
      plugins.analyzer,
      plugins.analyzerJSON,
    ].filter(Boolean),
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
async function createCompat(name: string, extension = 'js') {
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
        extension === 'js'
          ? '@babel/preset-flow'
          : [
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
        '@babel/plugin-proposal-export-namespace-from',
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-proposal-nullish-coalescing-operator',
        ['@babel/plugin-proposal-class-properties', {loose: true}],
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
    plugins.analyzerJSON,
  ]
  const build = await rollup({
    onwarn,
    input: dir(`packages/${name}/index.${extension}`),
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
    renderModuleGraph = false,
    input = 'index',
    inputExtension = 'js',
    replaceVueReactivity = false,
  }: {
    file: {es?: string; cjs: string}
    renderModuleGraph?: boolean
    input?: string
    inputExtension?: string
    replaceVueReactivity?: boolean
  },
) {
  const pluginsCjs = getPlugins(input === 'index' ? name : input, {
    replaceVueNext: true,
  })
  const pluginListCjs = [
    pluginsCjs.resolve,
    pluginsCjs.json,
    pluginsCjs.babel,
    pluginsCjs.sizeSnapshot,
    pluginsCjs.terser,
    pluginsCjs.analyzer,
    pluginsCjs.analyzerJSON,
  ]
  const pluginsEsm = getPlugins(input === 'index' ? name : input, {
    isEsm: true,
    replaceVueReactivity,
    replaceVueNext: true,
  })
  const pluginListEsm = [
    pluginsEsm.resolve,
    pluginsEsm.json,
    pluginsEsm.babel,
    pluginsEsm.sizeSnapshot,
    pluginsEsm.terser,
    pluginsEsm.analyzer,
    pluginsEsm.analyzerJSON,
  ]
  if (renderModuleGraph) {
    pluginListCjs.push(
      graphPlugin({
        output: 'modules.dot',
        exclude: 'effector/package.json',
      }),
    )
  }
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

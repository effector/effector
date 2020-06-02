//@flow
import {rollup} from 'rollup'
//$off
import {babel} from '@rollup/plugin-babel'
import json from '@rollup/plugin-json'
//$off
import resolve from '@rollup/plugin-node-resolve'
//$off
import {terser} from 'rollup-plugin-terser'
//$off
import commonjs from '@rollup/plugin-commonjs'
//$off
import {sizeSnapshot} from 'rollup-plugin-size-snapshot'
//$off
import analyze from 'rollup-plugin-visualizer'
import alias from '@rollup/plugin-alias'

import graphPlugin from './moduleGraphGenerator'
import {dir, getSourcemapPathTransform} from './utils'
import {minifyConfig} from './minificationConfig'

const compatNameCache = {}
const onwarn = (warning, rollupWarn: any) => {
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

const getPlugins = (name: string) => ({
  babel: babel({
    babelHelpers: 'bundled',
    skipPreflightCheck: true,
    extensions,
    exclude: /(\.re|node_modules.*)/,
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
  alias: alias({
    entries: {
      effector: dir('src/effector'),
    },
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
    createEsCjs(name, {
      file: {
        cjs: dir(`npm/${name}/fork.js`),
      },
      input: 'fork',
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
export async function rollupEffectorDom({name}) {
  await Promise.all([
    createEsCjs(name, {
      file: {
        cjs: dir(`npm/${name}/${name}.cjs.js`),
        es: dir(`npm/${name}/${name}.es.js`),
      },
      inputExtension: 'ts',
    }),
    createEsCjs(name, {
      file: {
        cjs: dir(`npm/${name}/server.js`),
      },
      input: 'server',
      inputExtension: 'ts',
    }),
    createUmd(name, {
      external: [],
      file: dir(`npm/${name}/${name}.umd.js`),
      umdName: name,
      globals: {},
      extension: 'ts',
      bundleEffector: true,
    }),
    // createCompat(name),
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
      inputExtension: 'ts',
    }),
    createSSR({file: {cjs: dir(`npm/${name}/ssr.js`)}}),
    createUmd(name, {
      external: ['react', 'effector', 'effector/compat'],
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

  async function createSSR({file: {cjs}}: {|file: {|cjs: string|}|}) {
    const plugins = getPlugins(name)
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
      input: dir(`packages/${name}/ssr.ts`),
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
      file: cjs,
      format: 'cjs',
      freeze: false,
      name,
      sourcemap: true,
      sourcemapPathTransform: getSourcemapPathTransform(name),
    })
  }
}

export async function rollupEffectorVue() {
  const name = 'effector-vue'
  await Promise.all([
    createEsCjs(name, {
      file: {
        cjs: dir(`npm/${name}/${name}.cjs.js`),
        es: dir(`npm/${name}/${name}.es.js`),
      },
      inputExtension: 'ts',
    }),
    createUmd(name, {
      external: ['vue', 'effector', 'effector/compat'],
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
  name,
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
async function createCompat(name, extension = 'js') {
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
      babelHelpers: 'bundled',
      extensions,
      skipPreflightCheck: true,
      exclude: /(\.re|node_modules.*)/,
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
            }),
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
    input = 'index',
    inputExtension = 'js',
  }: {|
    file: {|es?: string, cjs: string|},
    renderModuleGraph?: boolean,
    input?: string,
    inputExtension?: string,
  |},
) {
  const plugins = getPlugins(input === 'index' ? name : input)
  const pluginList = [
    plugins.resolve,
    // plugins.typescript,
    plugins.json,
    plugins.babel,
    plugins.sizeSnapshot,
    plugins.terser,
    plugins.analyzer,
    plugins.analyzerJSON,
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
    input: dir(`packages/${name}/${input}.${inputExtension}`),
    external: [
      'react',
      'vue',
      'symbol-observable',
      'effector',
      'effector/compat',
      'perf_hooks',
    ],
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
    es &&
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

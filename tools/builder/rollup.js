//@flow
import {rollup} from 'rollup'
import {readFile, outputFile} from 'fs-extra'
//$off
import Viz from 'viz.js'
//$off
import {Module, render} from 'viz.js/full.render.js'
//$off
import sharp from 'sharp'
//$off
import babel from 'rollup-plugin-babel'
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

import graphPlugin from './moduleGraphGenerator'
import {dir, getSourcemapPathTransform} from './utils'

const nameCache = {}

const minifyConfig = ({beautify}: {beautify: boolean}) => ({
  parse: {
    bare_returns: false,
    ecma: 8,
    html5_comments: false,
    shebang: true,
  },
  compress: {
    global_defs: {
      // __DEV__: false,
      // 'process.env.NODE_ENV': 'production',
    },
    arrows: true,
    arguments: true,
    booleans: true,
    booleans_as_integers: true,
    collapse_vars: true,
    comparisons: true,
    computed_props: true,
    conditionals: true,
    dead_code: true,
    directives: true,
    drop_console: false,
    drop_debugger: true,
    ecma: 8,
    evaluate: true,
    expression: true, //?
    hoist_funs: true, //?
    hoist_props: true,
    hoist_vars: false,
    if_return: true,
    inline: true,
    join_vars: true, //?

    defaults: false,
    keep_classnames: false,
    keep_fargs: false,
    keep_fnames: false,
    loops: true,
    module: true,
    properties: true,
    pure_getters: true,
    reduce_funcs: true,
    reduce_vars: true,
    sequences: true,
    side_effects: true,
    switches: true,
    toplevel: true,

    typeofs: true,
    unused: true,
    passes: 3,

    unsafe_arrows: true,
    unsafe_Function: true,
    unsafe_math: true,
    unsafe_proto: true,
  },
  mangle: {
    reserved: ['effector', 'effectorVue', 'effectorReact', 'it', 'test'],
    eval: true,
    keep_classnames: false,
    keep_fnames: false,
    module: true,
    toplevel: true, //?
    safari10: false,
    // properties: {
    //   builtins: false,
    //   debug: false,
    //   keep_quoted: false, //?
    //   reserved: ['test', 'it'],
    // },
  },
  output: {
    ascii_only: false,
    braces: false, //?
    // comments: /#/i,
    comments: false,
    ecma: 8,
    beautify,
    indent_level: 2,
    inline_script: false, //?
    keep_quoted_props: false, //?
    quote_keys: false,
    quote_style: 3, //?
    safari10: false,
    semicolons: true, //?
    shebang: true,
    webkit: false,
    wrap_iife: false,
  },
  // sourceMap: {
  //     // source map options
  // },
  ecma: 8,
  keep_classnames: false,
  keep_fnames: false,
  ie8: false,
  module: true,
  nameCache,
  safari10: false,
  toplevel: true,
  warnings: true,
})

const getPlugins = () => ({
  babel: babel({
    runtimeHelpers: false,
    exclude: /(\.re|node_modules.*)/,
  }),
  replace: replace({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  commonjs: commonjs({}),
  resolve: resolve({}),
  terser: terser(
    minifyConfig({
      beautify: !!process.env.PRETTIFY,
    }),
  ),
  sizeSnapshot: sizeSnapshot(),
  graph: graphPlugin({
    output: 'modules.dot',
  }),
})

export async function rollupBabel(name: string, plugin: *) {
  const plugins = getPlugins()
  const terserConfig = minifyConfig({
    beautify: true,
  })
  const build = await rollup({
    input: (dir(plugin): string),
    plugins: [plugins.babel, terser({
      ...terserConfig, 
      compress: false,
      mangle: false, 
      keep_classnames: true, 
      keep_fnames: true,
      toplevel: false,
    })],
  })
  await Promise.all([
    build.write({
      file: dir(`npm/${name}/index.js`),
      format: 'cjs',
      name,
      sourcemap: true,
    }),
  ])
}

export async function rollupEffector() {
  const name = 'effector'
  await Promise.all([cjsAndEs(), umd()])

  async function cjsAndEs() {
    const plugins = getPlugins()
    const build = await rollup({
      input: (dir(`packages/${name}/index.js`): string),
      external: [
        'warning',
        'invariant',
        'react',
        'vue',
        'most',
        'symbol-observable',
        'effector',
      ],
      plugins: [
        plugins.resolve,
        plugins.babel,
        plugins.graph,
        plugins.terser,
        plugins.sizeSnapshot,
      ],
    })

    await Promise.all([
      build.write({
        file: dir(`npm/${name}/${name}.cjs.js`),
        format: 'cjs',
        name,
        sourcemap: true,
        sourcemapPathTransform: getSourcemapPathTransform(name),
      }),
      build.write({
        file: dir(`npm/${name}/${name}.es.js`),
        format: 'es',
        name,
        sourcemap: true,
        sourcemapPathTransform: getSourcemapPathTransform(name),
      }),
    ])
  }
  async function umd() {
    const plugins = getPlugins()
    //$off
    const build = await rollup({
      input: String(dir(`packages/${name}/index.js`)),
      plugins: [
        plugins.resolve,
        plugins.babel,
        plugins.replace,
        plugins.commonjs,
        // plugins.terser,
        plugins.sizeSnapshot,
      ],
      external: ['react', 'effector'],
    })

    await build.write({
      file: (dir(`npm/${name}/${name}.umd.js`): string),
      format: 'umd',
      name,
      sourcemap: true,
    })
  }
}

export async function rollupEffectorReact() {
  const name = 'effector-react'

  await Promise.all([cjsAndEs(), umd()])

  async function cjsAndEs() {
    const plugins = getPlugins()
    const build = await rollup({
      input: (dir(`packages/${name}/index.js`): string),
      external: [
        'warning',
        'invariant',
        'react',
        'vue',
        'most',
        'symbol-observable',
        'effector',
      ],
      plugins: [
        plugins.resolve,
        plugins.babel,
        plugins.terser,
        plugins.sizeSnapshot,
      ],
    })

    await Promise.all([
      build.write({
        file: dir(`npm/${name}/${name}.cjs.js`),
        format: 'cjs',
        name,
        sourcemap: true,
        sourcemapPathTransform: getSourcemapPathTransform(name),
      }),
      build.write({
        file: dir(`npm/${name}/${name}.es.js`),
        format: 'es',
        name,
        sourcemap: true,
        sourcemapPathTransform: getSourcemapPathTransform(name),
      }),
    ])
  }
  async function umd() {
    const plugins = getPlugins()
    //$off
    const build = await rollup({
      input: String(dir(`packages/${name}/index.js`)),
      plugins: [
        plugins.resolve,
        plugins.babel,
        plugins.replace,
        plugins.commonjs,
        plugins.terser,
        plugins.sizeSnapshot,
      ],
      external: ['react', 'effector'],
    })

    await build.write({
      file: (dir(`npm/${name}/${name}.umd.js`): string),
      format: 'umd',
      name: 'effectorReact',
      sourcemap: true,
    })
  }
}
const viz = new Viz({Module, render})
export async function renderModulesGraph() {
  const root = process.cwd()
  const source = await readFile(root + '/modules.dot', 'utf8')

  const svg = await viz.renderString(source)
  await outputFile(root + '/modules.svg', svg)
  const buffer = await new Promise((rs, rj) => {
    sharp(root + '/modules.svg')
      // .resize(1024)
      // .extract({left: 290, top: 760, width: 40, height: 40})
      .toFormat('png')
      .toBuffer((err, data, info) => {
        if (err) return void rj(err)
        info
        rs(data)
      })
  })
  await outputFile(root + '/modules.png', buffer)
}
export async function rollupEffectorVue() {
  const name = 'effector-vue'
  await Promise.all([cjsAndEs(), umd()])

  async function cjsAndEs() {
    const plugins = getPlugins()
    const build = await rollup({
      input: (dir(`packages/${name}/index.js`): string),
      external: [
        'warning',
        'invariant',
        'react',
        'vue',
        'most',
        'symbol-observable',
        'effector',
      ],
      plugins: [
        plugins.resolve,
        plugins.babel,
        plugins.terser,
        plugins.sizeSnapshot,
      ],
    })
    await Promise.all([
      build.write({
        file: dir(`npm/${name}/${name}.cjs.js`),
        format: 'cjs',
        name,
        sourcemap: true,
        sourcemapPathTransform: getSourcemapPathTransform(name),
      }),
      build.write({
        file: dir(`npm/${name}/${name}.es.js`),
        format: 'es',
        name,
        sourcemap: true,
        sourcemapPathTransform: getSourcemapPathTransform(name),
      }),
    ])
  }
  async function umd() {
    const plugins = getPlugins()
    //$off
    const build = await rollup({
      input: String(dir(`packages/${name}/index.js`)),
      plugins: [
        plugins.resolve,
        plugins.babel,
        plugins.replace,
        plugins.commonjs,
        plugins.terser,
        plugins.sizeSnapshot,
      ],
      external: ['vue', 'effector'],
    })

    await build.write({
      file: (dir(`npm/${name}/${name}.umd.js`): string),
      format: 'umd',
      name: 'effectorVue',
      sourcemap: true,
    })
  }
}

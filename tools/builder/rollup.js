//@flow
import {rollup} from 'rollup'
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

const minifyConfig = ({prettify}: {prettify: boolean}) => ({
  ecma: 8,
  mangle: {
    toplevel: true,
    module: true,
    reserved: ['effector', 'effectorVue', 'effectorReact', 'it'],
  },
  compress: {
    pure_getters: true,
  },
  output: prettify
    ? {
      comments: /#/i,
      beautify: true,
      indent_level: 2,
    }
    : {
      comments: /#/i,
    },
})

const getPlugins = () => ({
  babel: babel({
    // runtimeHelpers: true,
    // exclude: /(\.re|node_modules.*)/,
  }),
  replace: replace({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  commonjs: commonjs({}),
  resolve: resolve({}),
  terser: terser(
    minifyConfig({
      prettify: !!process.env.PRETTIFY,
    }),
  ),
  sizeSnapshot: sizeSnapshot(),
  graph: graphPlugin({
    output: 'modules.dot',
  }),
})

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
        plugins.terser,
        plugins.sizeSnapshot,
      ],
      external: ['react', 'effector'],
    })

    await build.write({
      file: (dir(`npm/${name}/${name}.bundle.js`): string),
      format: 'iife',
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
      file: (dir(`npm/${name}/${name}.bundle.js`): string),
      format: 'iife',
      name: 'effectorReact',
      sourcemap: true,
    })
  }
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
      file: (dir(`npm/${name}/${name}.bundle.js`): string),
      format: 'iife',
      name: 'effectorVue',
      sourcemap: true,
    })
  }
}

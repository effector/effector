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

import {dir, getSourcemapPathTransform} from './utils'
// import
const minifyConfig = ({prettify}: {prettify: boolean}) => ({
  ecma: 8,
  mangle: {
    toplevel: true,
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

export const getPlugins = () => ({
  babel: babel({
    // runtimeHelpers: true,
    // exclude: /(\.re|node_modules.*)/,
  }),
  replace: replace({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  commonjs: commonjs({}),
  resolve: resolve({}),
  terser: terser(minifyConfig({prettify: !!process.env.PRETTIFY})),
  sizeSnapshot: sizeSnapshot(),
})

export async function rollupEffector() {
  const run = async output => {
    const plugins = getPlugins()
    const build = await rollup({
      input: (dir('packages/effector/index.js'): string),
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

    await build.write(output)
  }
  async function umd() {
    const plugins = getPlugins()
    //$off
    const build = await rollup({
      input: String(dir('packages/effector/index.js')),
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
      file: (dir('npm/effector/effctor.bundle.js'): string),
      format: 'iife',
      name: 'effector',
      sourcemap: true,
    })
  }
  await Promise.all([
    run({
      file: dir('npm/effector/effector.cjs.js'),
      format: 'cjs',
      name: 'effector',
      sourcemap: ((true: any): boolean | 'inline'),
      sourcemapPathTransform: getSourcemapPathTransform('effector'),
    }),
    run({
      file: dir('npm/effector/effector.es.js'),
      format: 'es',
      name: 'effector',
      sourcemap: ((true: any): boolean | 'inline'),
      sourcemapPathTransform: getSourcemapPathTransform('effector'),
    }),
    umd(),
  ])
}

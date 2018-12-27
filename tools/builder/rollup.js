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

const minifyConfig = ({
  prettify,
  toplevel = true,
}: {
  prettify: boolean,
  top_retain?: ?RegExp,
  toplevel?: boolean,
}) => ({
  ecma: 8,
  mangle: {
    toplevel,
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

export const getPlugins = (
  name: string,
  type: 'umd' | 'cjs' | 'es' = 'cjs',
) => ({
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
      toplevel: type !== 'umd',
    }),
  ),
  sizeSnapshot: sizeSnapshot(),
})

export async function rollupEffector() {
  const name = 'effector'
  const run = async output => {
    const plugins = getPlugins(name, output.format)
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

    await build.write(output)
  }
  async function umd() {
    const plugins = getPlugins(name, 'umd')
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
  await Promise.all([
    run({
      file: dir(`npm/${name}/${name}.cjs.js`),
      format: 'cjs',
      name,
      sourcemap: true,
      sourcemapPathTransform: getSourcemapPathTransform(name),
    }),
    run({
      file: dir(`npm/${name}/${name}.es.js`),
      format: 'es',
      name,
      sourcemap: true,
      sourcemapPathTransform: getSourcemapPathTransform(name),
    }),
    umd(),
  ])
}

export async function rollupEffectorReact() {
  const name = 'effector-react'
  const run = async output => {
    const plugins = getPlugins(name, output.format)
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

    await build.write(output)
  }
  async function umd() {
    const plugins = getPlugins(name, 'umd')
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
  await Promise.all([
    run({
      file: dir(`npm/${name}/${name}.cjs.js`),
      format: 'cjs',
      name,
      sourcemap: true,
      sourcemapPathTransform: getSourcemapPathTransform(name),
    }),
    run({
      file: dir(`npm/${name}/${name}.es.js`),
      format: 'es',
      name,
      sourcemap: true,
      sourcemapPathTransform: getSourcemapPathTransform(name),
    }),
    umd(),
  ])
}

export async function rollupEffectorVue() {
  const name = 'effector-vue'
  const run = async output => {
    const plugins = getPlugins(name, output.format)
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

    await build.write(output)
  }
  async function umd() {
    const plugins = getPlugins(name, 'umd')
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
  await Promise.all([
    run({
      file: dir(`npm/${name}/${name}.cjs.js`),
      format: 'cjs',
      name,
      sourcemap: true,
      sourcemapPathTransform: getSourcemapPathTransform(name),
    }),
    run({
      file: dir(`npm/${name}/${name}.es.js`),
      format: 'es',
      name,
      sourcemap: true,
      sourcemapPathTransform: getSourcemapPathTransform(name),
    }),
    umd(),
  ])
}

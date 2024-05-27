const {resolve} = require('path')

const {babel} = require('@rollup/plugin-babel')
const {nodeResolve: resolvePlugin} = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const json = require('@rollup/plugin-json')

const extensions = ['.js', '.mjs', '.ts', '.tsx', '.json']
const input = {
  input: resolve(__dirname, 'index.ts'),
  plugins: [
    babel({
      babelrc: false,
      skipPreflightCheck: true,
      extensions,
      presets: [
        ['@babel/preset-typescript', {allExtensions: true}],
        [
          '@babel/preset-env',
          {
            loose: true,
            useBuiltIns: 'entry',
            corejs: 3,
            modules: false,
            shippedProposals: true,
            targets: {
              node: 'current',
            },
          },
        ],
      ],
      plugins: [
        '@babel/plugin-proposal-export-namespace-from',
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-proposal-nullish-coalescing-operator',
        ['@babel/plugin-proposal-class-properties', {loose: true}],
      ],
      babelHelpers: 'bundled',
    }),
    json(),
    resolvePlugin({extensions}),
    commonjs({extensions}),
  ],
  external: [
    'path',
    'execa',
    'fs-extra',
    'js-yaml',
    'chalk',
    'rollup',
    '@rollup/plugin-json',
    '@rollup/plugin-typescript',
    '@rollup/plugin-alias',
    '@rollup/plugin-babel',
    '@rollup/plugin-node-resolve',
    'rollup-plugin-terser',
    '@rollup/plugin-commonjs',
    '@rollup/plugin-replace',
    'rollup-plugin-size-snapshot',
    'rollup-plugin-visualizer',
    'readable-stream',
    'cross-fetch',
    'zlib',
    'tar-stream',
    'events',
    'assert',
    'string_decoder',
    'buffer',
    'crypto',
    'fs',
    'stream',
  ],
}

const output = {
  file: resolve(__dirname, '..', 'builder.js'),
  format: 'cjs',
  sourcemap: false,
}

module.exports = {input, output}

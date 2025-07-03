import {join} from 'path'
import {readFile} from 'fs/promises'
import {format} from 'prettier'
import {transformAsync} from '@babel/core'
// @ts-expect-error no types
import tsPreset from '@babel/preset-typescript'

import babelPlugin from '../babel-plugin'

export function formatCode(code: string) {
  return format(code, {
    semi: false,
    printWidth: 80,
    tabWidth: 2,
    singleQuote: true,
    trailingComma: 'all',
    bracketSpacing: false,
    jsxBracketSameLine: true,
    arrowParens: 'avoid',
    parser: 'babel',
  })
}

function getPlugins(format: 'es' | 'cjs') {
  return format === 'es'
    ? [
        [
          babelPlugin,
          {hmr: format, addNames: false, addLoc: false, forceScope: true},
        ],
      ]
    : [
        [
          babelPlugin,
          {hmr: format, addNames: false, addLoc: false, forceScope: true},
        ],
        '@babel/plugin-transform-modules-commonjs',
      ]
}

const jsSetup = (format: 'es' | 'cjs') => ({
  plugins: getPlugins(format),
  configFile: false,
  babelrc: false,
})

const tsSetup = (format: 'es' | 'cjs') => ({
  plugins: getPlugins(format),
  presets: [[tsPreset, {isTSX: true, allExtensions: true}]],
  configFile: false,
  babelrc: false,
})

export const configSetup = (format: 'es' | 'cjs', lang: 'ts' | 'js') =>
  lang === 'ts' ? tsSetup(format) : jsSetup(format)

export async function compile(sourceCode: string, config: any) {
  try {
    const result = await transformAsync(sourceCode, config)
    return formatCode(result?.code ?? '') as string
  } catch (error) {
    console.error(error)
    return `error during compilation: ${(error as Error).message}`
  }
}

export async function readAndCompile(
  dirname: string,
  filename: string,
  config: any,
) {
  const sourceCode = await readFile(join(dirname, filename), 'utf-8')
  return compile(sourceCode, config)
}

import {join} from 'path'
import {readFile} from 'fs/promises'
import {format} from 'prettier'
import {transformAsync} from '@babel/core'
// @ts-expect-error no types
import tsPreset from '@babel/preset-typescript'

// @ts-expect-error no types
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

const jsSetup = (format: 'es' | 'cjs') => ({
  plugins: [[babelPlugin, {hmr: format, addNames: false, addLoc: false}]],
  configFile: false,
  babelrc: false,
})

const tsSetup = (format: 'es' | 'cjs') => ({
  plugins: [[babelPlugin, {hmr: format, addNames: false, addLoc: false}]],
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

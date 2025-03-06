import {readFile} from 'fs/promises'
import babelPlugin from '../babel-plugin'
import {join} from 'path'
import {transformAsync} from '@babel/core'
import {formatCode} from './utils'

async function transform(format) {
  const code = await readFile(join(__dirname, `./fixtures/hmr.js`), 'utf-8')

  return transformAsync(code, {
    plugins: [[babelPlugin, {hmr: format, addNames: false, addLoc: false}]],
  }).then(({code}) => formatCode(code))
}

describe('hmr module', () => {
  test('esm format', async () => {
    expect(await transform('es')).toMatchSnapshot()
  })

  test('cjs format', async () => {
    expect(await transform('cjs')).toMatchSnapshot()
  })
})

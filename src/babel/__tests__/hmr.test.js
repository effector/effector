import {readFile} from 'fs/promises'
import babelPlugin from '../babel-plugin'
import {join} from 'path'
import {transformAsync} from '@babel/core'
import {formatCode} from './utils'

async function transform(caseId) {
  const code = await readFile(
    join(__dirname, `./fixtures/hmr/${caseId}.js`),
    'utf-8',
  )

  return transformAsync(code, {
    plugins: [[babelPlugin, {addNames: false, addLoc: false, hmr: true}]],
  }).then(({code}) => formatCode(code))
}

describe('hmr babel', () => {
  test('effector code at root', async () => {
    expect(await transform(1)).toMatchSnapshot()
  })

  test('effector code in incorrect uncalled fabric', async () => {
    expect(await transform(2)).toMatchSnapshot()
  })

  test('effector code in incorrect called fabric', async () => {
    expect(await transform(3)).toMatchSnapshot()
  })

  test('effector code in correct uncalled fabric', async () => {
    expect(await transform(4)).toMatchSnapshot()
  })

  test('effector code at corrent called fabric', async () => {
    expect(await transform(5)).toMatchSnapshot()
  })

  test('effector code at corrent called fabric (callback in invoke)', async () => {
    expect(await transform(5.1)).toMatchSnapshot()
  })

  test('effector code at root & incorrect uncalled fabric in same file', async () => {
    expect(await transform(6)).toMatchSnapshot()
  })

  test('effector code at root & incorrect called fabric in same file', async () => {
    expect(await transform(7)).toMatchSnapshot()
  })

  test('effector code at root & correct uncalled fabric in same file', async () => {
    expect(await transform(8)).toMatchSnapshot()
  })

  test('effector code at root & correct called fabric in same file', async () => {
    expect(await transform(9)).toMatchSnapshot()
  })

  test('effector code at root & correct called fabric in same file (callback in invoke)', async () => {
    expect(await transform(9.1)).toMatchSnapshot()
  })

  test('effector code at root & sample variable', async () => {
    expect(await transform(10)).toMatchSnapshot()
  })
})

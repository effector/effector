import {readFile} from 'fs/promises'
import babelPlugin from '../babel-plugin'
import {join} from 'path'
import {parseAsync, transformAsync, traverse} from '@babel/core'
import generate from '@babel/generator'
import {modifyFile} from '../hmr'
import {formatCode} from './utils'

async function transformHMR(caseId) {
  const code = await readFile(
    join(__dirname, `./fixtures/hmr/${caseId}.js`),
    'utf-8',
  )

  const ast = await parseAsync(code)

  traverse(ast, {
    enter(path) {
      modifyFile(path)
    },
  })

  return formatCode(generate(ast).code)
}

async function transformPlugin(caseId) {
  const code = await readFile(
    join(__dirname, `./fixtures/hmr/${caseId}.js`),
    'utf-8',
  )

  return transformAsync(code, {
    plugins: [[babelPlugin, {addNames: false, addLoc: false, hmr: true}]],
  }).then(({code}) => formatCode(code))
}

describe('hmr babel', () => {
  describe('independent hmr modify', () => {
    test('effector code at root', async () => {
      expect(await transformHMR(1)).toMatchSnapshot()
    })

    test('effector code in incorrect uncalled fabric', async () => {
      expect(await transformHMR(2)).toMatchSnapshot()
    })

    test('effector code in incorrect called fabric', async () => {
      expect(await transformHMR(3)).toMatchSnapshot()
    })

    test('effector code in correct uncalled fabric', async () => {
      expect(await transformHMR(4)).toMatchSnapshot()
    })

    test('effector code at corrent called fabric', async () => {
      expect(await transformHMR(5)).toMatchSnapshot()
    })

    test('effector code at corrent called fabric (callback in invoke)', async () => {
      expect(await transformHMR(5.1)).toMatchSnapshot()
    })

    test('effector code at root & incorrect uncalled fabric in same file', async () => {
      expect(await transformHMR(6)).toMatchSnapshot()
    })

    test('effector code at root & incorrect called fabric in same file', async () => {
      expect(await transformHMR(7)).toMatchSnapshot()
    })

    test('effector code at root & correct uncalled fabric in same file', async () => {
      expect(await transformHMR(8)).toMatchSnapshot()
    })

    test('effector code at root & correct called fabric in same file', async () => {
      expect(await transformHMR(9)).toMatchSnapshot()
    })

    test('effector code at root & correct called fabric in same file (callback in invoke)', async () => {
      expect(await transformHMR(9.1)).toMatchSnapshot()
    })
  })

  describe('babel plugin intergation', () => {
    test('effector code at root', async () => {
      expect(await transformPlugin(1)).toMatchSnapshot()
    })

    test('effector code in incorrect uncalled fabric', async () => {
      expect(await transformPlugin(2)).toMatchSnapshot()
    })

    test('effector code in incorrect called fabric', async () => {
      expect(await transformPlugin(3)).toMatchSnapshot()
    })

    test('effector code in correct uncalled fabric', async () => {
      expect(await transformPlugin(4)).toMatchSnapshot()
    })

    test('effector code at corrent called fabric', async () => {
      expect(await transformPlugin(5)).toMatchSnapshot()
    })

    test('effector code at corrent called fabric (callback in invoke)', async () => {
      expect(await transformPlugin(5.1)).toMatchSnapshot()
    })

    test('effector code at root & incorrect uncalled fabric in same file', async () => {
      expect(await transformPlugin(6)).toMatchSnapshot()
    })

    test('effector code at root & incorrect called fabric in same file', async () => {
      expect(await transformPlugin(7)).toMatchSnapshot()
    })

    test('effector code at root & correct uncalled fabric in same file', async () => {
      expect(await transformPlugin(8)).toMatchSnapshot()
    })

    test('effector code at root & correct called fabric in same file', async () => {
      expect(await transformPlugin(9)).toMatchSnapshot()
    })

    test('effector code at root & correct called fabric in same file (callback in invoke)', async () => {
      expect(await transformPlugin(9.1)).toMatchSnapshot()
    })

    test('effector code at root & sample variable', async () => {
      expect(await transformPlugin(10)).toMatchSnapshot()
    })
  })
})

import {readFile} from 'fs/promises'
import babelPlugin from '../babel-plugin'
import {join} from 'path'
import {parseAsync, transformAsync} from '@babel/core'
import generate from '@babel/generator'
import {modifyFile} from '../hmr'

async function transformHMR(caseId) {
  const code = await readFile(
    join(__dirname, `./fixtures/hmr/${caseId}.js`),
    'utf-8',
  )

  const ast = await parseAsync(code)
  modifyFile(ast)

  return generate(ast).code
}

async function transformPlugin(caseId) {
  const code = await readFile(
    join(__dirname, `./fixtures/hmr/${caseId}.js`),
    'utf-8',
  )

  return transformAsync(code, {
    plugins: [[babelPlugin, {addNames: false, addLoc: false, hmr: true}]],
  }).then(({code}) => code)
}

describe('hmr babel', () => {
  describe('independent hmr modify', () => {
    test('effector code at root', async () => {
      expect(await transformHMR(1)).toMatchInlineSnapshot()
    })

    test('effector code in incorrect uncalled fabric', async () => {
      expect(await transformHMR(2)).toMatchInlineSnapshot()
    })

    test('effector code in incorrect called fabric', async () => {
      expect(await transformHMR(3)).toMatchInlineSnapshot()
    })

    test('effector code in correct uncalled fabric', async () => {
      expect(await transformHMR(4)).toMatchInlineSnapshot()
    })

    test('effector code at corrent called fabric', async () => {
      expect(await transformHMR(5)).toMatchInlineSnapshot()
    })

    test('effector code at corrent called fabric (callback in invoke)', async () => {
      expect(await transformHMR(5.1)).toMatchInlineSnapshot()
    })

    test('effector code at root & incorrect uncalled fabric in same file', async () => {
      expect(await transformHMR(6)).toMatchInlineSnapshot()
    })

    test('effector code at root & incorrect called fabric in same file', async () => {
      expect(await transformHMR(7)).toMatchInlineSnapshot()
    })

    test('effector code at root & correct uncalled fabric in same file', async () => {
      expect(await transformHMR(8)).toMatchInlineSnapshot()
    })

    test('effector code at root & correct called fabric in same file', async () => {
      expect(await transformHMR(9)).toMatchInlineSnapshot()
    })

    test('effector code at root & correct called fabric in same file (callback in invoke)', async () => {
      expect(await transformHMR(9.1)).toMatchInlineSnapshot()
    })
  })

  describe('babel plugin intergation', () => {
    test('effector code at root', async () => {
      expect(await transformPlugin(1)).toMatchInlineSnapshot()
    })

    test('effector code in incorrect uncalled fabric', async () => {
      expect(await transformPlugin(2)).toMatchInlineSnapshot()
    })

    test('effector code in incorrect called fabric', async () => {
      expect(await transformPlugin(3)).toMatchInlineSnapshot()
    })

    test('effector code in correct uncalled fabric', async () => {
      expect(await transformPlugin(4)).toMatchInlineSnapshot()
    })

    test('effector code at corrent called fabric', async () => {
      expect(await transformPlugin(5)).toMatchInlineSnapshot()
    })

    test('effector code at corrent called fabric (callback in invoke)', async () => {
      expect(await transformPlugin(5.1)).toMatchInlineSnapshot()
    })

    test('effector code at root & incorrect uncalled fabric in same file', async () => {
      expect(await transformPlugin(6)).toMatchInlineSnapshot()
    })

    test('effector code at root & incorrect called fabric in same file', async () => {
      expect(await transformPlugin(7)).toMatchInlineSnapshot()
    })

    test('effector code at root & correct uncalled fabric in same file', async () => {
      expect(await transformPlugin(8)).toMatchInlineSnapshot()
    })

    test('effector code at root & correct called fabric in same file', async () => {
      expect(await transformPlugin(9)).toMatchInlineSnapshot()
    })

    test('effector code at root & correct called fabric in same file (callback in invoke)', async () => {
      expect(await transformPlugin(9.1)).toMatchInlineSnapshot()
    })
  })
})

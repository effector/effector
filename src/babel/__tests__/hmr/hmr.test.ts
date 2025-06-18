// @ts-expect-error no types
import tsPreset from '@babel/preset-typescript'

// @ts-expect-error no types
import babelPlugin from '../../babel-plugin'
import {compile, configSetup, readAndCompile} from '../utils'

describe('hmr module', () => {
  test('esm format', async () => {
    expect(
      await readAndCompile(__dirname, 'hmr.js', configSetup('es', 'js')),
    ).toMatchSnapshot()
  })

  test('cjs format', async () => {
    expect(
      await readAndCompile(__dirname, 'hmr.js', configSetup('cjs', 'js')),
    ).toMatchSnapshot()
  })
})

test('dont throw on already imported methods', async () => {
  const code = `
  import {createNode, withRegion} from 'effector'
  `
  expect(await compile(code, configSetup('es', 'ts'))).toMatchInlineSnapshot(
    `""`,
  )
})

test('reference with factories', async () => {
  const code = `
  import type {Store} from 'effector'
  import {debug} from 'patronum'

  debug()
  `
  expect(
    await compile(code, {
      plugins: [[babelPlugin, {addNames: false, addLoc: false}]],
      presets: [[tsPreset, {isTSX: true, allExtensions: true}]],
      configFile: false,
      babelrc: false,
    }),
  ).toMatchInlineSnapshot(`
    "import {withFactory as _withFactory} from 'effector'
    import {debug} from 'patronum'

    _withFactory({
      sid: 'ujj0q3',
      fn: () => debug(),
    })
    "
  `)
})

describe('put hmr only to modules with effector', () => {
  test('no effector no hmr', async () => {
    const code = `import {useMemo} from 'react'`
    expect(await compile(code, configSetup('es', 'ts'))).toMatchInlineSnapshot(
      `""`,
    )
  })

  test('has factories has hmr', async () => {
    const code = `
    import {debug} from 'patronum'

    debug()
    `
    expect(await compile(code, configSetup('es', 'ts'))).toMatchInlineSnapshot(`
      "import {
        createNode as _createNode,
        clearNode as _clearNode,
        withRegion as _withRegion,
        withFactory as _withFactory,
      } from 'effector'

      const _internalHMRRegion = _createNode({
        regional: true,
      })

      import {debug} from 'patronum'

      _withRegion(_internalHMRRegion, () =>
        _withFactory({
          sid: 'uiz86g',
          fn: () => debug(),
        }),
      )

      if (import.meta.hot || import.meta.webpackHot) {
        ;(import.meta.hot || import.meta.webpackHot).dispose(() =>
          _clearNode(_internalHMRRegion),
        )
      } else {
        console.warn('[effector hmr] HMR is not available in current environment.')
      }
      "
    `)
  })

  test('has stores has hmr', async () => {
    const code = `
    import {createStore} from 'effector'
    const $foo = createStore(0)
    `
    expect(await compile(code, configSetup('es', 'ts'))).toMatchInlineSnapshot(`
      "import {
        createNode as _createNode,
        clearNode as _clearNode,
        withRegion as _withRegion,
      } from 'effector'

      const _internalHMRRegion = _createNode({
        regional: true,
      })

      import {createStore} from 'effector'

      const $foo = _withRegion(_internalHMRRegion, () =>
        createStore(0, {
          sid: 'fjm8r',
        }),
      )

      if (import.meta.hot || import.meta.webpackHot) {
        ;(import.meta.hot || import.meta.webpackHot).dispose(() =>
          _clearNode(_internalHMRRegion),
        )
      } else {
        console.warn('[effector hmr] HMR is not available in current environment.')
      }
      "
    `)
  })

  test('unused imports', async () => {
    const code = `
    import {createStore} from 'effector'
    import {useMemo} from 'react'
    `
    expect(await compile(code, configSetup('es', 'ts'))).toMatchInlineSnapshot(
      `""`,
    )
  })
})

describe('imports correctness', () => {
  test('type imports', async () => {
    const code = `
    import type {Store} from 'effector'
    import {debug} from 'patronum'
    `
    expect(await compile(code, configSetup('es', 'ts'))).toMatchInlineSnapshot(
      `""`,
    )
  })
  test('imports in the end of file', async () => {
    const code = `
    import {debug} from 'patronum'
    debug()
    import {createStore} from 'effector'
    const $foo = createStore(0)
    `
    expect(await compile(code, configSetup('es', 'ts'))).toMatchInlineSnapshot(`
      "import {
        createNode as _createNode,
        clearNode as _clearNode,
        withRegion as _withRegion,
        withFactory as _withFactory,
      } from 'effector'

      const _internalHMRRegion = _createNode({
        regional: true,
      })

      import {debug} from 'patronum'

      _withRegion(_internalHMRRegion, () =>
        _withFactory({
          sid: 'uiffl3',
          fn: () => debug(),
        }),
      )

      import {createStore} from 'effector'

      const $foo = _withRegion(_internalHMRRegion, () =>
        createStore(0, {
          sid: '1dmv15',
        }),
      )

      if (import.meta.hot || import.meta.webpackHot) {
        ;(import.meta.hot || import.meta.webpackHot).dispose(() =>
          _clearNode(_internalHMRRegion),
        )
      } else {
        console.warn('[effector hmr] HMR is not available in current environment.')
      }
      "
    `)
  })
})

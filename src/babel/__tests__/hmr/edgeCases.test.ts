// @ts-expect-error no types
import tsPreset from '@babel/preset-typescript'

import babelPlugin from '../../babel-plugin'
import {compile, configSetup} from '../utils'

test('dont throw on already imported methods', async () => {
  const code = `
  import {createNode, withRegion} from 'effector'
  `
  expect(await compile(code, configSetup('es', 'ts'))).toMatchInlineSnapshot(`
    "export {}
    "
  `)
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

describe('factories in functions', () => {
  test('without root level units', async () => {
    const code = `
    import {createStore} from 'effector'
    import {debug} from 'patronum'

    export function factory() {
      const $foo = createStore(0)

      debug($foo)

      return $foo
    }
    `
    expect(await compile(code, configSetup('es', 'ts'))).toMatchInlineSnapshot(`
      "import {withFactory as _withFactory} from 'effector'
      import {createStore} from 'effector'
      import {debug} from 'patronum'
      export function factory() {
        const $foo = createStore(0, {
          sid: '1uohh2',
        })
        _withFactory({
          sid: 'ul6elm',
          fn: () => debug($foo),
        })
        return $foo
      }
      "
    `)
  })
  test('with root level units', async () => {
    const code = `
    import {createStore} from 'effector'
    import {debug} from 'patronum'

    export const $bar = createStore(0)

    export function factory() {
      const $foo = createStore(0)

      debug($foo)

      return $foo
    }
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
      import {createStore} from 'effector'
      import {debug} from 'patronum'
      export const $bar = _withRegion(_internalHMRRegion, () =>
        createStore(0, {
          sid: '-r80v7a',
        }),
      )
      export function factory() {
        const $foo = createStore(0, {
          sid: '2srq9g',
        })
        _withFactory({
          sid: 'll4v7n',
          fn: () => debug($foo),
        })
        return $foo
      }
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

describe('put hmr only to modules with effector', () => {
  test('no effector no hmr', async () => {
    const code = `import {useMemo} from 'react'`
    expect(await compile(code, configSetup('es', 'ts'))).toMatchInlineSnapshot(`
      "export {}
      "
    `)
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
    expect(await compile(code, configSetup('es', 'ts'))).toMatchInlineSnapshot(`
      "export {}
      "
    `)
  })
})

describe('imports correctness', () => {
  test('type imports', async () => {
    const code = `
    import type {Store} from 'effector'
    import {debug} from 'patronum'
    `
    expect(await compile(code, configSetup('es', 'ts'))).toMatchInlineSnapshot(`
      "export {}
      "
    `)
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

test('complex case', async () => {
  const code = `
  import {createStore} from 'effector'
  import {createJsonQuery} from '@farfetched/core'
  import { createFactory, invoke } from '@withease/factories';


  export function factory() {
    const $name = createStore('')
    const query = createJsonQuery({})
    return {name: $name, query}
  }
  export const wrappedfactory = createFactory(factory);

  export const result = invoke(() => wrappedfactory())
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
    import {createStore} from 'effector'
    import {createJsonQuery} from '@farfetched/core'
    import {createFactory, invoke} from '@withease/factories'
    export function factory() {
      const $name = createStore('', {
        sid: 'ukhrz6',
      })
      const query = _withFactory({
        sid: 'amt93u',
        fn: () => createJsonQuery({}),
      })
      return {
        name: $name,
        query,
      }
    }
    export const wrappedfactory = _withRegion(_internalHMRRegion, () =>
      _withFactory({
        sid: '-5ljuyt',
        fn: () => createFactory(factory),
      }),
    )
    export const result = _withRegion(_internalHMRRegion, () =>
      _withFactory({
        sid: '4lek8u',
        fn: () => invoke(() => wrappedfactory()),
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

test('backtick functions are supported', async () => {
  const code = `
  import {createStore} from 'effector'
  import {format} from 'patronum'

  const $foo = createStore(0)
  const $bar = format\`\${$foo}\`
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
    import {createStore} from 'effector'
    import {format} from 'patronum'
    const $foo = _withRegion(_internalHMRRegion, () =>
      createStore(0, {
        sid: '1dmuzf',
      }),
    )
    const $bar = _withRegion(_internalHMRRegion, () =>
      _withFactory({
        sid: '-qqz9ix',
        fn: () => format\`\${$foo}\`,
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

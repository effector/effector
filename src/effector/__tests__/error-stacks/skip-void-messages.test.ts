import {createEvent} from 'effector'
import {argumentHistory} from 'effector/fixtures'
import {activateAllDownstream} from '../testUtils'

import {simpleStore} from './stub/simple-store'
import {sidlessStore} from './stub/sidless-store'
import {
  baseStoreForSimpleDerived,
  simpleCombine,
  simpleDerived,
} from './stub/simple-derived'
import {$baseStore, $sidlessCombine, $sidlessMap} from './stub/sidless-derived'

const mapStackTrace = (stacktrace: string) => {
  return stacktrace.split('\n').map(line => {
    const [, , , , , , file] = line.split(' ')
    return file
  })
}

describe('skipVoid error messages', () => {
  const consoleErrorSpy = jest
    .spyOn(console, 'error')
    .mockImplementation(() => {})

  function getErrorStacks() {
    return argumentHistory(consoleErrorSpy).map(
      e =>
        e.message +
        '\n' +
        mapStackTrace(e.stack)
          .filter(x => x && x.includes('error-stacks'))
          .map(f => f.split('/').slice(-3).join('/') + '\n'),
    )
  }

  afterEach(() => {
    consoleErrorSpy.mockClear()
  })

  test('Simple store', () => {
    const event = createEvent()
    simpleStore.on(event, () => {})
    event()
    expect(getErrorStacks()).toMatchInlineSnapshot(`
      Array [
        "simpleStore at /src/effector/__tests__/error-stacks/stub/simple-store.ts: undefined is used to skip updates. To allow undefined as a value provide explicit { skipVoid: false } option
      __tests__/error-stacks/skip-void-messages.test.ts:44:5)
      ",
      ]
    `)
  })

  test('Sidless store', () => {
    const event = createEvent()
    sidlessStore.on(event, () => {})
    event()
    expect(getErrorStacks()).toMatchInlineSnapshot(`
      Array [
        "undefined is used to skip updates. To allow undefined as a value provide explicit { skipVoid: false } option
      __tests__/error-stacks/skip-void-messages.test.ts:57:5)
      ",
      ]
    `)
  })

  test('Simple derived', () => {
    const event = createEvent()
    activateAllDownstream([simpleCombine, simpleDerived])
    baseStoreForSimpleDerived.on(event, () => {})
    event()
    expect(getErrorStacks()).toMatchInlineSnapshot(`
      Array [
        "baseStoreForSimpleDerived → *: undefined is used to skip updates. To allow undefined as a value provide explicit { skipVoid: false } option
      __tests__/error-stacks/skip-void-messages.test.ts:71:5)
      ",
        "simpleCombine at /src/effector/__tests__/error-stacks/stub/simple-derived.ts: undefined is used to skip updates. To allow undefined as a value provide explicit { skipVoid: false } option
      __tests__/error-stacks/skip-void-messages.test.ts:71:5)
      ",
      ]
    `)
  })

  test('Sidless derived', () => {
    const event = createEvent()
    activateAllDownstream([$sidlessCombine, $sidlessMap])
    $baseStore.on(event, () => {})
    event()
    expect(getErrorStacks()).toMatchInlineSnapshot(`
      Array [
        "$baseStore → *: undefined is used to skip updates. To allow undefined as a value provide explicit { skipVoid: false } option
      __tests__/error-stacks/skip-void-messages.test.ts:88:5)
      ",
        "combine($baseStore): undefined is used to skip updates. To allow undefined as a value provide explicit { skipVoid: false } option
      __tests__/error-stacks/skip-void-messages.test.ts:88:5)
      ",
      ]
    `)
  })
})

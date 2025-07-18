import {createEvent} from 'effector'
import {argumentHistory} from 'effector/fixtures'

import {simpleStore} from './stub/simple-store'
import {sidlessStore} from './stub/sidless-store'
import {baseStoreForSimpleDerived} from './stub/simple-derived'
import {$baseStore} from './stub/sidless-derived'

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
        "[store] unit 'simpleStore': undefined is used to skip updates. To allow undefined as a value provide explicit { skipVoid: false } option
      __tests__/error-stacks/skip-void-messages.test.ts:39:5)
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
        "store: undefined is used to skip updates. To allow undefined as a value provide explicit { skipVoid: false } option
      __tests__/error-stacks/skip-void-messages.test.ts:52:5)
      ",
      ]
    `)
  })

  test('Simple derived', () => {
    const event = createEvent()
    baseStoreForSimpleDerived.on(event, () => {})
    event()
    expect(getErrorStacks()).toMatchInlineSnapshot(`
      Array [
        "[store] unit 'baseStoreForSimpleDerived → *': undefined is used to skip updates. To allow undefined as a value provide explicit { skipVoid: false } option
      __tests__/error-stacks/skip-void-messages.test.ts:65:5)
      ",
        "[store] unit 'simpleCombine': undefined is used to skip updates. To allow undefined as a value provide explicit { skipVoid: false } option
      __tests__/error-stacks/skip-void-messages.test.ts:65:5)
      ",
      ]
    `)
  })

  test('Sidless derived', () => {
    const event = createEvent()
    $baseStore.on(event, () => {})
    event()
    expect(getErrorStacks()).toMatchInlineSnapshot(`
      Array [
        "[store] unit '$baseStore → *': undefined is used to skip updates. To allow undefined as a value provide explicit { skipVoid: false } option
      __tests__/error-stacks/skip-void-messages.test.ts:81:5)
      ",
        "[store] unit 'combine($baseStore)': undefined is used to skip updates. To allow undefined as a value provide explicit { skipVoid: false } option
      __tests__/error-stacks/skip-void-messages.test.ts:81:5)
      ",
      ]
    `)
  })
})

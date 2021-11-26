import {createEvent, createStore, combine} from 'effector'

let warn: jest.SpyInstance<void, [message?: any, ...optionalParams: any[]]>
beforeEach(() => {
  warn = jest.spyOn(console, 'error').mockImplementation(() => {})
})
afterEach(() => {
  warn.mockRestore()
})

function getWarning() {
  return warn.mock.calls.map(([msg]) => msg)[0]
}

describe('call of derived events', () => {
  test('usage with .map is deprecated', () => {
    const a = createEvent()
    const b = a.map(() => {})
    b()
    expect(getWarning()).toMatchInlineSnapshot(
      `"call of derived event is deprecated, use createEvent instead"`,
    )
  })
  test('usage with .filterMap is deprecated', () => {
    const a = createEvent()
    const b = a.filterMap(() => {})
    b()
    expect(getWarning()).toMatchInlineSnapshot(
      `"call of derived event is deprecated, use createEvent instead"`,
    )
  })
  test('usage with .filter is deprecated', () => {
    const a = createEvent()
    const b = a.filter({fn: () => false})
    b()
    expect(getWarning()).toMatchInlineSnapshot(
      `"call of derived event is deprecated, use createEvent instead"`,
    )
  })
})

describe('.on with derived stores', () => {
  test('usage with .map is deprecated', () => {
    const trigger = createEvent()
    const $a = createStore(0)
    const $b = $a.map(x => x)
    $b.on(trigger, x => x)
    expect(getWarning()).toMatchInlineSnapshot(
      `".on in derived store is deprecated, use createStore instead"`,
    )
  })
  test('usage with combine is deprecated', () => {
    const trigger = createEvent()
    const $a = createStore(0)
    const $b = combine({a: $a})
    $b.on(trigger, x => x)
    expect(getWarning()).toMatchInlineSnapshot(
      `".on in derived store is deprecated, use createStore instead"`,
    )
  })
})

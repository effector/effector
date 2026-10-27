import {createEvent, sample, createStore, combine} from 'effector'

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

describe('store', () => {
  test('.on', () => {
    const trigger = createEvent()
    const event = createEvent()
    const $x = createStore(0).on(trigger, x => {
      event()
    })
    trigger()
    expect(getWarning()).toMatchInlineSnapshot(
      `"on: This error happened in function from this unit:"`,
    )
  })
  test('.map', () => {
    const trigger = createEvent()
    const event = createEvent()
    const $x = createStore(0).on(trigger, x => x + 1)
    const $y = $x.map(x => {
      event()
      return x
    })
    trigger()
    expect(getWarning()).toMatchInlineSnapshot(
      `"map: This error happened in function from this unit:"`,
    )
  })
  test('updateFilter', () => {
    const trigger = createEvent()
    const event = createEvent()
    const $x = createStore(0, {
      updateFilter() {
        event()
        return true
      },
    }).on(trigger, x => x + 1)
    trigger()
    expect(getWarning()).toMatchInlineSnapshot(
      `"$x at /src/effector/__tests__/imperativeCalls.test.ts: This error happened in function from this unit:"`,
    )
  })
})

describe('event', () => {
  test('.map', () => {
    const event = createEvent()
    const x = createEvent()
    const y = x.map(() => {
      event()
    })
    x()
    expect(getWarning()).toMatchInlineSnapshot(
      `"map: This error happened in function from this unit:"`,
    )
  })
  test('.prepend', () => {
    const event = createEvent()
    const y = createEvent()
    const x = y.prepend(() => {
      event()
    })
    x()
    expect(getWarning()).toMatchInlineSnapshot(
      `"prepend: This error happened in function from this unit:"`,
    )
  })
  test('.filterMap', () => {
    const event = createEvent()
    const x = createEvent()
    const y = x.filterMap(() => {
      event()
    })
    x()
    expect(getWarning()).toMatchInlineSnapshot(
      `"filterMap: This error happened in function from this unit:"`,
    )
  })
})

test('combine', () => {
  const trigger = createEvent()
  const event = createEvent()
  const $x = createStore(0).on(trigger, x => x + 1)
  const $comb = combine($x, x => {
    event()
    return x
  })
  trigger()
  expect(getWarning()).toMatchInlineSnapshot(
    `"combine: This error happened in function from this unit:"`,
  )
})

describe('sample', () => {
  test('fn', () => {
    const trigger = createEvent()
    const event = createEvent()
    sample({
      clock: trigger,
      fn() {
        event()
      },
    })
    trigger()
    expect(getWarning()).toMatchInlineSnapshot(
      `"sample: This error happened in function from this unit:"`,
    )
  })
  test('filter', () => {
    const trigger = createEvent()
    const event = createEvent()
    sample({
      clock: trigger,
      filter() {
        event()
        return true
      },
    })
    trigger()
    expect(getWarning()).toMatchInlineSnapshot(
      `"sample: This error happened in function from this unit:"`,
    )
  })
})

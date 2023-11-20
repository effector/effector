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
      `[Error: [event] unit 'event': unit call from pure function is not supported, use operators like sample instead]`,
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
      `[Error: [event] unit 'event': unit call from pure function is not supported, use operators like sample instead]`,
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
      `[Error: [event] unit 'event': unit call from pure function is not supported, use operators like sample instead]`,
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
      `[Error: [event] unit 'event': unit call from pure function is not supported, use operators like sample instead]`,
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
      `[Error: [event] unit 'event': unit call from pure function is not supported, use operators like sample instead]`,
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
      `[Error: [event] unit 'event': unit call from pure function is not supported, use operators like sample instead]`,
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
    `[Error: [event] unit 'event': unit call from pure function is not supported, use operators like sample instead]`,
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
      `[Error: [event] unit 'event': unit call from pure function is not supported, use operators like sample instead]`,
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
      `[Error: [event] unit 'event': unit call from pure function is not supported, use operators like sample instead]`,
    )
  })
})

import {
  createEvent,
  createStore,
  combine,
  sample,
  forward,
  guard,
  merge,
  split,
  createApi,
} from 'effector'

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
  test('usage with merge is deprecated', () => {
    const a = createEvent()
    const b = merge([a])
    b()
    expect(getWarning()).toMatchInlineSnapshot(
      `"call of derived event is deprecated, use createEvent instead"`,
    )
  })
  test('usage with split is deprecated', () => {
    const trigger = createEvent<number>()
    const {derived} = split(trigger, {derived: x => x > 0})
    derived(0)
    expect(getWarning()).toMatchInlineSnapshot(
      `"call of derived event is deprecated, use createEvent instead"`,
    )
  })
  test('usage with sample is deprecated', () => {
    const a = createEvent()
    const b = sample({clock: a, source: a})
    b()
    expect(getWarning()).toMatchInlineSnapshot(
      `"call of derived event is deprecated, use createEvent instead"`,
    )
  })
  test('usage with guard is deprecated', () => {
    const a = createEvent()
    const b = guard({source: a, filter: () => true})
    b()
    expect(getWarning()).toMatchInlineSnapshot(
      `"call of derived event is deprecated, use createEvent instead"`,
    )
  })
})

test('createApi', () => {
  const $a = createStore(0)
  const $derived = $a.map(x => x)
  createApi($derived, {x: () => 0})
  expect(getWarning()).toMatchInlineSnapshot(
    `".on in derived store is deprecated, use createStore instead"`,
  )
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

describe('split cases', () => {
  test('with derived store', () => {
    const trigger = createEvent<number>()
    const $a = createStore(0)
    const $derived = $a.map(x => x)
    split({
      source: trigger,
      match: () => 'a',
      cases: {
        a: $derived,
      },
    })
    expect(getWarning()).toMatchInlineSnapshot(
      `"split: derived unit in \\"cases.a\\" is deprecated, use createEvent/createStore instead"`,
    )
  })
  test('with derived event', () => {
    const trigger = createEvent<number>()
    const a = createEvent<number>()
    const derived = a.map(x => x)
    split({
      source: trigger,
      match: () => 'a',
      cases: {
        a: derived,
      },
    })
    expect(getWarning()).toMatchInlineSnapshot(
      `"split: derived unit in \\"cases.a\\" is deprecated, use createEvent/createStore instead"`,
    )
  })
})

describe('sample target', () => {
  test('with derived store', () => {
    const trigger = createEvent<number>()
    const $a = createStore(0)
    const $derived = $a.map(x => x)
    sample({
      clock: trigger,
      target: $derived,
    })
    expect(getWarning()).toMatchInlineSnapshot(
      `"sample: derived unit in \\"target\\" is deprecated, use createEvent/createStore instead"`,
    )
  })
  test('with derived event', () => {
    const trigger = createEvent<number>()
    const a = createEvent<number>()
    const derived = a.map(x => x)
    sample({
      clock: trigger,
      target: derived,
    })
    expect(getWarning()).toMatchInlineSnapshot(
      `"sample: derived unit in \\"target\\" is deprecated, use createEvent/createStore instead"`,
    )
  })
})

describe('guard target', () => {
  test('with derived store', () => {
    const trigger = createEvent<number>()
    const $a = createStore(0)
    const $derived = $a.map(x => x)
    guard({
      clock: trigger,
      filter: () => true,
      target: $derived,
    })
    expect(getWarning()).toMatchInlineSnapshot(
      `"guard: derived unit in \\"target\\" is deprecated, use createEvent/createStore instead"`,
    )
  })
  test('with derived event', () => {
    const trigger = createEvent<number>()
    const a = createEvent<number>()
    const derived = a.map(x => x)
    guard({
      clock: trigger,
      filter: () => true,
      target: derived,
    })
    expect(getWarning()).toMatchInlineSnapshot(
      `"guard: derived unit in \\"target\\" is deprecated, use createEvent/createStore instead"`,
    )
  })
})

describe('forward to', () => {
  test('with derived store', () => {
    const trigger = createEvent<number>()
    const $a = createStore(0)
    const $derived = $a.map(x => x)
    forward({
      from: trigger,
      to: $derived,
    })
    expect(getWarning()).toMatchInlineSnapshot(
      `"forward: derived unit in \\"to\\" is deprecated, use createEvent/createStore instead"`,
    )
  })
  test('with derived event', () => {
    const trigger = createEvent<number>()
    const a = createEvent<number>()
    const derived = a.map(x => x)
    forward({
      from: trigger,
      to: derived,
    })
    expect(getWarning()).toMatchInlineSnapshot(
      `"forward: derived unit in \\"to\\" is deprecated, use createEvent/createStore instead"`,
    )
  })
})

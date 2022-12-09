import {
  createEvent,
  createStore,
  createEffect,
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
  describe('interal events', () => {
    test('usage with effect.finally is warned', () => {
      const fx = createEffect(() => {})
      // @ts-expect-error
      fx.finally({
        status: "done",
        params: null,
        result: null,
      })
      expect(getWarning()).toMatchInlineSnapshot(
        `"call of derived event is deprecated, use createEvent instead"`,
      )
    })
    test('usage with effect.done is warned', () => {
      const fx = createEffect(() => {})
      // @ts-expect-error
      fx.done()
      expect(getWarning()).toMatchInlineSnapshot(
        `"call of derived event is deprecated, use createEvent instead"`,
      )
    })
    test('usage with effect.fail is warned', () => {
      const fx = createEffect(() => {})
      // @ts-expect-error
      fx.fail()
      expect(getWarning()).toMatchInlineSnapshot(
        `"call of derived event is deprecated, use createEvent instead"`,
      )
    })
    test('usage with effect.doneData is warned', () => {
      const fx = createEffect(() => {})
      fx.doneData()
      expect(getWarning()).toMatchInlineSnapshot(
        `"call of derived event is deprecated, use createEvent instead"`,
      )
    })
    test('usage with effect.failData is warned', () => {
      const fx = createEffect(() => {})
      // @ts-expect-error
      fx.failData()
      expect(getWarning()).toMatchInlineSnapshot(
        `"call of derived event is deprecated, use createEvent instead"`,
      )
    })
    test('usage with store.updates is warned', () => {
      const $store = createStore(0)
      $store.updates(0)
      expect(getWarning()).toMatchInlineSnapshot(
        `"call of derived event is deprecated, use createEvent instead"`,
      )
    })
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

describe('.on/.reset with derived stores', () => {
  test('.on usage with .map is deprecated', () => {
    const trigger = createEvent()
    const $a = createStore(0)
    const $b = $a.map(x => x)
    $b.on(trigger, x => x)
    expect(getWarning()).toMatchInlineSnapshot(
      `".on in derived store is deprecated, use .on in store created via createStore instead"`,
    )
  })
  test('.reset usage with .map is deprecated', () => {
    const trigger = createEvent()
    const $a = createStore(0)
    const $b = $a.map(x => x)
    $b.reset(trigger, x => x)
    expect(getWarning()).toMatchInlineSnapshot(
      `".reset in derived store is deprecated, use .reset in store created via createStore instead"`,
    )
  })
  test('.on usage with combine is deprecated', () => {
    const trigger = createEvent()
    const $a = createStore(0)
    const $b = combine({a: $a})
    $b.on(trigger, x => x)
    expect(getWarning()).toMatchInlineSnapshot(
      `".on in derived store is deprecated, use .on in store created via createStore instead"`,
    )
  })
  test('.reset usage with combine is deprecated', () => {
    const trigger = createEvent()
    const $a = createStore(0)
    const $b = combine({a: $a})
    $b.reset(trigger, x => x)
    expect(getWarning()).toMatchInlineSnapshot(
      `".reset in derived store is deprecated, use .reset in store created via createStore instead"`,
    )
  })
  describe('internal stores', () => {
    test('usage with effect.inFlight is warned', () => {
      const trigger = createEvent()
      const fx = createEffect(() => {})
      fx.inFlight.on(trigger, s => s + 1)
      expect(getWarning()).toMatchInlineSnapshot(
        `".on in derived store is deprecated, use createStore instead"`,
      )
    })
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
  describe('interal events', () => {
    test('usage with effect.finally is warned', () => {
      const trigger = createEvent<any>()
      const fx = createEffect(() => {})
      split({
        source: trigger,
        match: () => 'a',
        cases: {
          a: fx.finally,
        },
      })
      expect(getWarning()).toMatchInlineSnapshot(
        `"split: derived unit in \\"cases.a\\" is deprecated, use createEvent/createStore instead"`,
      )
    })
    test('usage with effect.done is warned', () => {
      const trigger = createEvent<any>()
      const fx = createEffect(() => {})
      split({
        source: trigger,
        match: () => 'a',
        cases: {
          a: fx.done,
        },
      })
      expect(getWarning()).toMatchInlineSnapshot(
        `"split: derived unit in \\"cases.a\\" is deprecated, use createEvent/createStore instead"`,
      )
    })
    test('usage with effect.fail is warned', () => {
      const trigger = createEvent<any>()
      const fx = createEffect(() => {})
      split({
        source: trigger,
        match: () => 'a',
        cases: {
          a: fx.fail,
        },
      })
      expect(getWarning()).toMatchInlineSnapshot(
        `"split: derived unit in \\"cases.a\\" is deprecated, use createEvent/createStore instead"`,
      )
    })
    test('usage with effect.doneData is warned', () => {
      const trigger = createEvent<any>()
      const fx = createEffect(() => {})
      split({
        source: trigger,
        match: () => 'a',
        cases: {
          a: fx.doneData,
        },
      })
      expect(getWarning()).toMatchInlineSnapshot(
        `"split: derived unit in \\"cases.a\\" is deprecated, use createEvent/createStore instead"`,
      )
    })
    test('usage with effect.failData is warned', () => {
      const trigger = createEvent<any>()
      const fx = createEffect(() => {})
      split({
        source: trigger,
        match: () => 'a',
        cases: {
          a: fx.failData,
        },
      })
      expect(getWarning()).toMatchInlineSnapshot(
        `"split: derived unit in \\"cases.a\\" is deprecated, use createEvent/createStore instead"`,
      )
    })
    test('usage with store.updates is warned', () => {
      const trigger = createEvent<any>()
      const $store = createStore(0)
      split({
        source: trigger,
        match: () => 'a',
        cases: {
          a: $store.updates,
        },
      })
      expect(getWarning()).toMatchInlineSnapshot(
        `"split: derived unit in \\"cases.a\\" is deprecated, use createEvent/createStore instead"`,
      )
    })
  })
  describe('internal stores', () => {
    test('usage with effect.inFlight is warned', () => {
      const trigger = createEvent<number>()
      const fx = createEffect(() => {})
      split({
        source: trigger,
        match: () => 'a',
        cases: {
          a: fx.inFlight,
        },
      })
      expect(getWarning()).toMatchInlineSnapshot(
        `"split: derived unit in \\"cases.a\\" is deprecated, use createEvent/createStore instead"`,
      )
    })
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
  describe('interal events', () => {
    test('usage with effect.finally is warned', () => {
      const trigger = createEvent<any>()
      const fx = createEffect(() => {})
      sample({
        clock: trigger,
        target: fx.finally,
      })
      expect(getWarning()).toMatchInlineSnapshot(
        `"sample: derived unit in \\"target\\" is deprecated, use createEvent/createStore instead"`,
      )
    })
    test('usage with effect.done is warned', () => {
      const trigger = createEvent<any>()
      const fx = createEffect(() => {})
      sample({
        clock: trigger,
        target: fx.done,
      })
      expect(getWarning()).toMatchInlineSnapshot(
        `"sample: derived unit in \\"target\\" is deprecated, use createEvent/createStore instead"`,
      )
    })
    test('usage with effect.fail is warned', () => {
      const trigger = createEvent<any>()
      const fx = createEffect(() => {})
      sample({
        clock: trigger,
        target: fx.fail,
      })
      expect(getWarning()).toMatchInlineSnapshot(
        `"sample: derived unit in \\"target\\" is deprecated, use createEvent/createStore instead"`,
      )
    })
    test('usage with effect.doneData is warned', () => {
      const trigger = createEvent<any>()
      const fx = createEffect(() => {})
      sample({
        clock: trigger,
        target: fx.doneData,
      })
      expect(getWarning()).toMatchInlineSnapshot(
        `"sample: derived unit in \\"target\\" is deprecated, use createEvent/createStore instead"`,
      )
    })
    test('usage with effect.failData is warned', () => {
      const trigger = createEvent<any>()
      const fx = createEffect(() => {})
      sample({
        clock: trigger,
        target: fx.failData,
      })
      expect(getWarning()).toMatchInlineSnapshot(
        `"sample: derived unit in \\"target\\" is deprecated, use createEvent/createStore instead"`,
      )
    })
    test('usage with store.updates is warned', () => {
      const trigger = createEvent<any>()
      const $store = createStore(0)
      sample({
        clock: trigger,
        target: $store.updates,
      })
      expect(getWarning()).toMatchInlineSnapshot(
        `"sample: derived unit in \\"target\\" is deprecated, use createEvent/createStore instead"`,
      )
    })
  })
  describe('internal stores', () => {
    test('usage with effect.inFlight is warned', () => {
      const trigger = createEvent<number>()
      const fx = createEffect(() => {})
      sample({
        clock: trigger,
        target: fx.inFlight,
      })
      expect(getWarning()).toMatchInlineSnapshot(
        `"sample: derived unit in \\"target\\" is deprecated, use createEvent/createStore instead"`,
      )
    })
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
  describe('interal events', () => {
    test('usage with effect.finally is warned', () => {
      const trigger = createEvent<any>()
      const fx = createEffect(() => {})
      guard({
        clock: trigger,
        filter: () => true,
        target: fx.finally,
      })
      expect(getWarning()).toMatchInlineSnapshot(
        `"guard: derived unit in \\"target\\" is deprecated, use createEvent/createStore instead"`,
      )
    })
    test('usage with effect.done is warned', () => {
      const trigger = createEvent<any>()
      const fx = createEffect(() => {})
      guard({
        clock: trigger,
        filter: () => true,
        target: fx.done,
      })
      expect(getWarning()).toMatchInlineSnapshot(
        `"guard: derived unit in \\"target\\" is deprecated, use createEvent/createStore instead"`,
      )
    })
    test('usage with effect.fail is warned', () => {
      const trigger = createEvent<any>()
      const fx = createEffect(() => {})
      guard({
        clock: trigger,
        filter: () => true,
        target: fx.fail,
      })
      expect(getWarning()).toMatchInlineSnapshot(
        `"guard: derived unit in \\"target\\" is deprecated, use createEvent/createStore instead"`,
      )
    })
    test('usage with effect.doneData is warned', () => {
      const trigger = createEvent<any>()
      const fx = createEffect(() => {})
      guard({
        clock: trigger,
        filter: () => true,
        target: fx.doneData,
      })
      expect(getWarning()).toMatchInlineSnapshot(
        `"guard: derived unit in \\"target\\" is deprecated, use createEvent/createStore instead"`,
      )
    })
    test('usage with effect.failData is warned', () => {
      const trigger = createEvent<any>()
      const fx = createEffect(() => {})
      guard({
        clock: trigger,
        filter: () => true,
        target: fx.failData,
      })
      expect(getWarning()).toMatchInlineSnapshot(
        `"guard: derived unit in \\"target\\" is deprecated, use createEvent/createStore instead"`,
      )
    })
    test('usage with store.updates is warned', () => {
      const trigger = createEvent<any>()
      const $store = createStore(0)
      guard({
        clock: trigger,
        filter: () => true,
        target: $store.updates,
      })
      expect(getWarning()).toMatchInlineSnapshot(
        `"guard: derived unit in \\"target\\" is deprecated, use createEvent/createStore instead"`,
      )
    })
  })
  describe('internal stores', () => {
    test('usage with effect.inFlight is warned', () => {
      const trigger = createEvent<number>()
      const fx = createEffect(() => {})
      guard({
        clock: trigger,
        filter: () => true,
        target: fx.inFlight,
      })
      expect(getWarning()).toMatchInlineSnapshot(
        `"guard: derived unit in \\"target\\" is deprecated, use createEvent/createStore instead"`,
      )
    })
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
  describe('interal events', () => {
    test('usage with effect.finally is warned', () => {
      const trigger = createEvent<any>()
      const fx = createEffect(() => {})
      forward({
        from: trigger,
        to: fx.finally,
      })
      expect(getWarning()).toMatchInlineSnapshot(
        `"forward: derived unit in \\"to\\" is deprecated, use createEvent/createStore instead"`,
      )
    })
    test('usage with effect.done is warned', () => {
      const trigger = createEvent<any>()
      const fx = createEffect(() => {})
      forward({
        from: trigger,
        to: fx.done,
      })
      expect(getWarning()).toMatchInlineSnapshot(
        `"forward: derived unit in \\"to\\" is deprecated, use createEvent/createStore instead"`,
      )
    })
    test('usage with effect.fail is warned', () => {
      const trigger = createEvent<any>()
      const fx = createEffect(() => {})
      forward({
        from: trigger,
        to: fx.fail,
      })
      expect(getWarning()).toMatchInlineSnapshot(
        `"forward: derived unit in \\"to\\" is deprecated, use createEvent/createStore instead"`,
      )
    })
    test('usage with effect.doneData is warned', () => {
      const trigger = createEvent<any>()
      const fx = createEffect(() => {})
      forward({
        from: trigger,
        to: fx.doneData,
      })
      expect(getWarning()).toMatchInlineSnapshot(
        `"forward: derived unit in \\"to\\" is deprecated, use createEvent/createStore instead"`,
      )
    })
    test('usage with effect.failData is warned', () => {
      const trigger = createEvent<any>()
      const fx = createEffect(() => {})
      forward({
        from: trigger,
        to: fx.failData,
      })
      expect(getWarning()).toMatchInlineSnapshot(
        `"forward: derived unit in \\"to\\" is deprecated, use createEvent/createStore instead"`,
      )
    })
    test('usage with store.updates is warned', () => {
      const trigger = createEvent<any>()
      const $store = createStore(0)
      forward({
        from: trigger,
        to: $store.updates,
      })
      expect(getWarning()).toMatchInlineSnapshot(
        `"forward: derived unit in \\"to\\" is deprecated, use createEvent/createStore instead"`,
      )
    })
  })
  describe('internal stores', () => {
    test('usage with effect.inFlight is warned', () => {
      const trigger = createEvent<number>()
      const fx = createEffect(() => {})
      forward({
        from: trigger,
        to: fx.inFlight,
      })
      expect(getWarning()).toMatchInlineSnapshot(
        `"forward: derived unit in \\"to\\" is deprecated, use createEvent/createStore instead"`,
      )
    })
  })
})

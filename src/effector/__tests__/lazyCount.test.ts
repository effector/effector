import {
  createStore,
  createEvent,
  combine,
  Store,
  Event,
  Effect,
  Node,
  fork,
  createWatch,
  Scope,
  sample,
  merge,
  forward,
  restore,
  split,
  createEffect,
} from 'effector'

function getNode(unit: Store<any> | Event<any> | Effect<any, any, any>): Node {
  return (unit as any).graphite
}

function getLazyGlobal(store: Store<any> | Event<any>) {
  return getNode(store).lazy!
}

function isActiveGlobal(store: Store<any> | Event<any>) {
  return getLazyGlobal(store).active
}
function isActiveInScope(store: Store<any> | Event<any>, scope: Scope) {
  const node = getNode(store)
  const lazy = node.lazy
  if (lazy?.alwaysActive || lazy?.active) return true
  const scopeInfo = scope.lazy[node.id]
  if (!scopeInfo) return false
  return scopeInfo.usedBy + scopeInfo.config.usedBy > 0
}

test('.on basic case', () => {
  const inc = createEvent()
  const $count = createStore(0)
  $count.on(inc, x => x + 1)
  expect(isActiveGlobal(inc)).toBe(true)
})

test('.reset basic case', () => {
  const trigger = createEvent()
  const $count = createStore(0)
  $count.reset(trigger)
  expect(isActiveGlobal(trigger)).toBe(true)
})

test('combine basic case', () => {
  const $foo = createStore(0)
  const $bar = combine($foo, n => n)
  const $baz = combine($bar, n => n)

  expect(isActiveGlobal($bar)).toBe(false)

  const unwatch = $baz.watch(() => {})
  expect(isActiveGlobal($bar)).toBe(true)
  unwatch()
  expect(isActiveGlobal($bar)).toBe(false)
})

test('combine basic case with fork', () => {
  const $foo = createStore(0)
  const $bar = combine($foo, n => n)
  const $baz = combine($bar, n => n)

  const scope = fork()

  expect(isActiveGlobal($bar)).toBe(false)
  expect(isActiveInScope($bar, scope)).toBe(false)

  const unwatch = createWatch({
    unit: $baz,
    fn: () => {},
    scope,
  })

  expect(isActiveGlobal($bar)).toBe(false)
  expect(isActiveInScope($bar, scope)).toBe(true)
  unwatch()
  expect(getLazyGlobal($bar).usedBy >= 0).toBe(true)
  expect(isActiveInScope($bar, scope)).toBe(false)
})

test('event basic case', () => {
  const event = createEvent()

  expect(isActiveGlobal(event)).toBe(false)

  const unwatch = event.watch(() => {})

  expect(isActiveGlobal(event)).toBe(true)
  unwatch()
  expect(isActiveGlobal(event)).toBe(false)
})

test('event basic case with fork', () => {
  const event = createEvent()

  const scope = fork()

  expect(isActiveGlobal(event)).toBe(false)
  expect(isActiveInScope(event, scope)).toBe(false)

  const unwatch = createWatch({
    unit: event,
    fn: () => {},
    scope,
  })

  expect(isActiveGlobal(event)).toBe(false)
  expect(isActiveInScope(event, scope)).toBe(true)
  unwatch()
  expect(isActiveInScope(event, scope)).toBe(false)
})

describe('sample support', () => {
  test('store in clock of sample, store in target', () => {
    const $target = createStore(0)
    const $foo = createStore(0)
    const $bar = combine($foo, n => n)
    const $baz = combine($bar, n => n)

    sample({
      clock: $baz,
      target: $target,
    })

    expect(isActiveGlobal($bar)).toBe(true)
  })

  test('store in clock of sample, event in target', () => {
    const target = createEvent<number>()
    const $foo = createStore(0)
    const $bar = combine($foo, n => n)
    const $baz = combine($bar, n => n)

    sample({
      clock: $baz,
      target,
    })

    expect(isActiveGlobal($bar)).toBe(false)

    const unwatch = target.watch(() => {})

    expect(isActiveGlobal($bar)).toBe(true)
    unwatch()
    expect(isActiveGlobal($bar)).toBe(false)
  })

  test('store in filter', () => {
    const clock = createEvent()
    const target = createEvent()
    const $foo = createStore(0)
    const $bar = combine($foo, n => n)
    const $baz = combine($bar, n => n > 0)

    sample({
      clock,
      filter: $baz,
      target,
    })

    expect(isActiveGlobal($bar)).toBe(false)

    const unwatch = target.watch(() => {})

    expect(isActiveGlobal($bar)).toBe(true)
    unwatch()
    expect(isActiveGlobal($bar)).toBe(false)
  })

  test('array in clock support', () => {
    const triggerA = createEvent()
    const target = createEvent()
    const $foo = createStore(0)
    const $bar = combine($foo, n => n)
    const $baz = combine($bar, n => n > 0)

    sample({
      clock: [triggerA, $baz],
      target,
    })

    expect(isActiveGlobal($bar)).toBe(false)
    expect(isActiveGlobal(triggerA)).toBe(false)

    const unwatch = target.watch(() => {})

    expect(isActiveGlobal($bar)).toBe(true)
    expect(isActiveGlobal(triggerA)).toBe(true)
    unwatch()
    expect(isActiveGlobal($bar)).toBe(false)
    expect(isActiveGlobal(triggerA)).toBe(false)
  })

  test('effects should turn everything to alwaysActive', () => {
    const targetFx = createEffect(() => {})
    const $foo = createStore(0)
    const $bar = combine($foo, n => n)
    const $baz = combine($bar, n => n)

    sample({
      clock: $baz,
      target: targetFx,
    })

    expect(isActiveGlobal($bar)).toBe(true)
  })

  test('watch added before sample call', () => {
    const target = createEvent<number>()
    const $foo = createStore(0)
    const $bar = combine($foo, n => n)
    const $baz = combine($bar, n => n)

    const unwatch = target.watch(() => {})

    sample({
      clock: $baz,
      target,
    })

    expect(isActiveGlobal($bar)).toBe(true)
    unwatch()
    expect(isActiveGlobal($bar)).toBe(false)
  })
})

test('merge support', () => {
  const triggerA = createEvent()
  const $foo = createStore(0)
  const $bar = combine($foo, n => n)
  const $baz = combine($bar, n => n > 0)

  const target = merge([triggerA, $baz])

  expect(isActiveGlobal($bar)).toBe(false)
  expect(isActiveGlobal(triggerA)).toBe(false)

  const unwatch = target.watch(() => {})

  expect(isActiveGlobal($bar)).toBe(true)
  expect(isActiveGlobal(triggerA)).toBe(true)
  unwatch()
  expect(isActiveGlobal($bar)).toBe(false)
  expect(isActiveGlobal(triggerA)).toBe(false)
})

test('store.map support', () => {
  const $foo = createStore(0)
  const $bar = $foo.map(n => n)
  const $baz = $bar.map(n => n)

  expect(isActiveGlobal($bar)).toBe(false)

  const unwatch = $baz.watch(() => {})

  expect(isActiveGlobal($bar)).toBe(true)
  unwatch()
  expect(isActiveGlobal($bar)).toBe(false)
})

test('event.map support', () => {
  const foo = createEvent()
  const bar = foo.map(() => {})
  const baz = bar.map(() => {})

  expect(isActiveGlobal(bar)).toBe(false)

  const unwatch = baz.watch(() => {})

  expect(isActiveGlobal(bar)).toBe(true)
  unwatch()
  expect(isActiveGlobal(bar)).toBe(false)
})

test('event.prepend support', () => {
  const foo = createEvent()
  const bar = foo.prepend(() => {})
  const baz = bar.prepend(() => {})

  expect(isActiveGlobal(bar)).toBe(false)
  expect(isActiveGlobal(baz)).toBe(false)

  const unwatch = foo.watch(() => {})

  expect(isActiveGlobal(bar)).toBe(true)
  expect(isActiveGlobal(baz)).toBe(true)
  unwatch()
  expect(isActiveGlobal(bar)).toBe(false)
  expect(isActiveGlobal(baz)).toBe(false)
})

describe('forward support', () => {
  const consoleError = console.error

  beforeAll(() => {
    console.error = (message, ...args) => {
      if (String(message).includes('forward')) return
      consoleError(message, ...args)
    }
  })

  afterAll(() => {
    console.error = consoleError
  })

  test('forward support', () => {
    const from = createEvent()
    const to = createEvent()

    const unwatchFwd = forward({from, to})

    expect(isActiveGlobal(from)).toBe(false)

    const unwatch = to.watch(() => {})

    expect(isActiveGlobal(from)).toBe(true)
    unwatch()
    expect(isActiveGlobal(from)).toBe(false)

    to.watch(() => {})

    expect(isActiveGlobal(from)).toBe(true)
    unwatchFwd()
    expect(isActiveGlobal(from)).toBe(false)
  })

  test('watch added before forward call', () => {
    const from = createEvent()
    const to = createEvent()

    const unwatch = to.watch(() => {})

    const unwatchFwd = forward({from, to})

    expect(isActiveGlobal(from)).toBe(true)
    unwatch()
    expect(isActiveGlobal(from)).toBe(false)

    to.watch(() => {})

    expect(isActiveGlobal(from)).toBe(true)
    unwatchFwd()
    expect(isActiveGlobal(from)).toBe(false)
  })
})

/**
 * WARN! This test assumes that restore is derived (in terms of lazy)
 * This is not a final decision!
 **/
test('restore support', () => {
  const trigger = createEvent<number>()
  const $store = restore(trigger, 0)

  expect(isActiveGlobal(trigger)).toBe(false)
  expect(isActiveGlobal($store)).toBe(false)

  const unwatch = $store.watch(() => {})

  expect(isActiveGlobal(trigger)).toBe(true)
  expect(isActiveGlobal($store)).toBe(true)
  unwatch()
  expect(isActiveGlobal(trigger)).toBe(false)
  expect(isActiveGlobal($store)).toBe(false)
})

describe('split support', () => {
  test('with cases', () => {
    const clock = createEvent()
    const target = createEvent<number>()
    const $matchA = createStore<'target'>('target')
    const $matchB = combine($matchA, x => x)
    const $matchC = combine($matchB, x => x)
    const $sourceA = createStore(0)
    const $sourceB = combine($sourceA, n => n)
    const $sourceC = combine($sourceB, n => n)

    split({
      clock,
      source: $sourceC,
      match: $matchC,
      cases: {
        target,
      },
    })

    expect(isActiveGlobal(clock)).toBe(false)
    expect(isActiveGlobal($sourceB)).toBe(false)
    expect(isActiveGlobal($matchB)).toBe(false)

    const unwatch = target.watch(() => {})

    expect(isActiveGlobal(clock)).toBe(true)
    expect(isActiveGlobal($sourceB)).toBe(true)
    expect(isActiveGlobal($matchB)).toBe(true)

    unwatch()

    expect(isActiveGlobal(clock)).toBe(false)
    expect(isActiveGlobal($sourceB)).toBe(false)
    expect(isActiveGlobal($matchB)).toBe(false)
  })
  test('with cases with fork', () => {
    const clock = createEvent()
    const target = createEvent<number>()
    const $matchA = createStore<'target'>('target')
    const $matchB = combine($matchA, x => x)
    const $matchC = combine($matchB, x => x)
    const $sourceA = createStore(0)
    const $sourceB = combine($sourceA, n => n)
    const $sourceC = combine($sourceB, n => n)

    split({
      clock,
      source: $sourceC,
      match: $matchC,
      cases: {
        target,
      },
    })

    const scope = fork()

    expect(isActiveInScope(clock, scope)).toBe(false)
    expect(isActiveInScope($sourceB, scope)).toBe(false)
    expect(isActiveInScope($matchB, scope)).toBe(false)

    const unwatch = createWatch({
      unit: target,
      fn: () => {},
      scope,
    })

    expect(isActiveInScope(clock, scope)).toBe(true)
    expect(isActiveInScope($sourceB, scope)).toBe(true)
    expect(isActiveInScope($matchB, scope)).toBe(true)

    expect(isActiveGlobal(clock)).toBe(false)
    expect(isActiveGlobal($sourceB)).toBe(false)
    expect(isActiveGlobal($matchB)).toBe(false)

    unwatch()

    expect(isActiveInScope(clock, scope)).toBe(false)
    expect(isActiveInScope($sourceB, scope)).toBe(false)
    expect(isActiveInScope($matchB, scope)).toBe(false)
  })
  test('without cases', () => {
    const $sourceA = createStore(0)
    const $sourceB = combine($sourceA, n => n)
    const $sourceC = combine($sourceB, n => n)
    const {target} = split($sourceC, {
      target: n => n > 0,
    })

    expect(isActiveGlobal($sourceB)).toBe(false)
    const unwatch = target.watch(() => {})
    expect(isActiveGlobal($sourceB)).toBe(true)
    unwatch()
    expect(isActiveGlobal($sourceB)).toBe(false)
  })
})

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
  allSettled,
} from 'effector'
import {argumentHistory} from 'effector/fixtures'

function getNode(unit: Store<any> | Event<any> | Effect<any, any, any>): Node {
  return (unit as any).graphite
}

function getLazyGlobal(store: Store<any> | Event<any>) {
  return getNode(store).lazy!
}

function isActiveGlobal(store: Store<any> | Event<any>) {
  const lazy = getLazyGlobal(store)
  return lazy.alwaysActive || lazy.usedBy.length > 0
}
function isActiveInScope(store: Store<any> | Event<any>, scope: Scope) {
  const node = getNode(store)
  const lazy = node.lazy
  if (lazy?.alwaysActive) return true
  const scopeInfo = scope.lazy[node.id]
  if (!scopeInfo) return false
  return scopeInfo.usedBy.length + scopeInfo.config.usedBy.length > 0
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

  test('sample is added after watch', () => {
    const clock = createEvent()
    const target = createEvent()

    const unwatch = target.watch(() => {})

    sample({
      clock,
      target,
    })

    expect(isActiveGlobal(clock)).toBe(true)
    unwatch()
    expect(isActiveGlobal(clock)).toBe(false)
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

  test('store in filter in dynamic', () => {
    const inc = createEvent()
    const dec = createEvent()
    const clock = createEvent()
    const target = createEvent()
    const $foo = createStore(0)
    const $bar = combine($foo, n => n)
    const $baz = combine($bar, n => n > 0)
    $foo.on(inc, x => x + 1)
    $foo.on(dec, x => x - 1)

    sample({
      clock,
      filter: $baz,
      target,
    })

    expect(isActiveGlobal($bar)).toBe(false)
    expect(isActiveGlobal(clock)).toBe(false)

    const unwatch = target.watch(() => {})

    expect(isActiveGlobal($bar)).toBe(true)
    expect(isActiveGlobal(clock)).toBe(false)
    inc()
    expect(isActiveGlobal(clock)).toBe(true)
    dec()
    expect(isActiveGlobal(clock)).toBe(false)
    inc()
    unwatch()
    expect(isActiveGlobal($baz)).toBe(false)
    expect(isActiveGlobal(clock)).toBe(false)
  })

  test('store in filter in dynamic when sample is added during active filter', () => {
    const inc = createEvent()
    const dec = createEvent()
    const clock = createEvent()
    const target = createEvent()
    const $foo = createStore(0)
    const $bar = combine($foo, n => n)
    const $baz = combine($bar, n => n > 0)
    $foo.on(inc, x => x + 1)
    $foo.on(dec, x => x - 1)

    inc()

    const unwatch = target.watch(() => {})

    sample({
      clock,
      filter: $baz,
      target,
    })

    expect($baz.getState()).toBe(true)
    expect(isActiveGlobal(clock)).toBe(true)
    dec()
    expect(isActiveGlobal(clock)).toBe(false)
    inc()
    expect(isActiveGlobal(clock)).toBe(true)
    unwatch()
    expect(isActiveGlobal(clock)).toBe(false)
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

  test('array in target support', () => {
    const fn = jest.fn()
    const trigger = createEvent<number>()
    const targetA = createEvent<number>()
    const targetB = createEvent()

    sample({
      clock: trigger,
      target: [targetA, targetB],
    })

    expect(isActiveGlobal(targetA)).toBe(false)
    expect(isActiveGlobal(trigger)).toBe(false)

    const unwatchA = targetA.watch(upd => fn(upd))
    const unwatchB = targetB.watch(() => {})

    expect(isActiveGlobal(targetA)).toBe(true)
    expect(isActiveGlobal(trigger)).toBe(true)
    trigger(0)
    unwatchA()
    expect(isActiveGlobal(targetA)).toBe(false)
    expect(isActiveGlobal(trigger)).toBe(true)
    unwatchB()
    expect(isActiveGlobal(trigger)).toBe(false)
    expect(argumentHistory(fn)).toEqual([0])
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

  test('test with fork, combine, effect, sample and allSettled', async () => {
    const fn = jest.fn()
    const inc = createEvent()
    const target = createEvent()
    const fx = createEffect(async () => {
      await new Promise(rs => setTimeout(rs, 20))
    })
    const $count = createStore(0)

    $count.on(inc, x => x + 1)

    const $countA = combine($count, x => x * 10)
    const $countB1 = combine($countA, x => x * 10)
    const $countB2 = combine($countA, x => x * 10)

    sample({
      clock: fx.doneData,
      target,
    })

    sample({
      clock: $countB1,
      target: fx,
    })

    const scope = fork()

    await allSettled(inc, {scope})

    createWatch({
      unit: target,
      scope,
      fn,
    })

    await allSettled(inc, {scope})
    expect(scope.getState($countB1)).toBe(200)
    expect(fn).toBeCalledTimes(1)
    expect(scope.getState($countB2)).toBe(200)
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

test('restore support', () => {
  const trigger = createEvent<number>()
  const $store = restore(trigger, 0)

  expect(isActiveGlobal(trigger)).toBe(true)
  expect(isActiveGlobal($store)).toBe(true)

  const unwatch = $store.watch(() => {})

  expect(isActiveGlobal(trigger)).toBe(true)
  expect(isActiveGlobal($store)).toBe(true)
  unwatch()
  expect(isActiveGlobal(trigger)).toBe(true)
  expect(isActiveGlobal($store)).toBe(true)
})

describe('split support', () => {
  test('with cases', () => {
    const fn = jest.fn()
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

    const unwatch = target.watch(upd => fn(upd))

    expect(isActiveGlobal(clock)).toBe(true)
    expect(isActiveGlobal($sourceB)).toBe(true)
    expect(isActiveGlobal($matchB)).toBe(true)

    clock()

    unwatch()

    expect(isActiveGlobal(clock)).toBe(false)
    expect(isActiveGlobal($sourceB)).toBe(false)
    expect(isActiveGlobal($matchB)).toBe(false)

    expect(argumentHistory(fn)).toEqual([0])
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
  test('with cases with match object', () => {
    const fnA = jest.fn()
    const fnB = jest.fn()
    const trigger = createEvent<number>()
    const chooseCase = createEvent<'a' | 'b'>()
    const $isCaseA = createStore(true)
    const $isCaseB = createStore(false)
    const $isCaseADerived = combine($isCaseA, x => x)
    const $isCaseBDerived = combine($isCaseB, x => x)
    const targetA = createEvent<number>()
    const targetB = createEvent<number>()

    $isCaseA.on(chooseCase, (_, upd) => upd === 'a')
    $isCaseB.on(chooseCase, (_, upd) => upd === 'b')

    split({
      source: trigger,
      match: {
        a: $isCaseADerived,
        b: $isCaseBDerived,
      },
      cases: {
        a: [targetA],
        b: targetB,
      },
    })

    expect(isActiveGlobal(trigger)).toBe(false)
    expect(isActiveGlobal($isCaseADerived)).toBe(false)

    const unwatchA = targetA.watch(upd => fnA(upd))

    expect(isActiveGlobal(trigger)).toBe(true)
    expect(isActiveGlobal($isCaseADerived)).toBe(true)

    trigger(0)
    const unwatchB = targetB.watch(upd => fnB(upd))
    chooseCase('b')
    trigger(1)

    unwatchA()
    unwatchB()

    expect(isActiveGlobal(trigger)).toBe(false)
    expect(isActiveGlobal($isCaseADerived)).toBe(false)

    expect(argumentHistory(fnA)).toEqual([0])
    expect(argumentHistory(fnA)).toEqual([1])
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

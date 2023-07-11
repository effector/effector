import {
  createEvent,
  createStore,
  sample,
  step,
  createNode,
  createEffect,
  launch,
  Event,
  Node,
  fork,
  split,
  allSettled,
  Store,
  // @ts-expect-error
  getSharedStackMeta,
} from 'effector'
import {argumentHistory} from 'effector/fixtures'

it('should call watcher as many times, as many store updates occured', () => {
  const fn = jest.fn()
  const e1 = createEvent<string>()
  const e2 = e1.map(() => 'e2')
  const st1 = createStore('str')
    .on(e1, (_, x) => x)
    .on(e2, (_, x) => x)

  st1.watch(fn)
  e1('first call')
  e1('second call')
  expect(argumentHistory(fn)).toMatchInlineSnapshot(`
    Array [
      "str",
      "first call",
      "e2",
      "second call",
      "e2",
    ]
  `)
})
it('should call sampled watcher once during a walk', () => {
  const fn = jest.fn()
  const e1 = createEvent<string>()
  const e2 = e1.map(() => 'e2')
  const st1 = createStore('str')
    .on(e1, (_, x) => x)
    .on(e2, (_, x) => x)

  sample(st1).watch(fn)
  e1('first call')
  e1('second call')
  expect(argumentHistory(fn)).toMatchInlineSnapshot(`
    Array [
      "str",
      "e2",
    ]
  `)
})

it('should avoid data races', () => {
  const fn = jest.fn()
  const routePush = createEvent<string>()

  const history = createStore<string[]>([]).on(routePush, (state, route) => [
    ...state,
    route,
  ])
  const currentIdx = createStore(-2).on(
    routePush,
    () => history.getState().length - 1,
  )

  history.watch(() => {})
  currentIdx.watch(fn)

  routePush('v 1')
  routePush('v 2')
  expect(argumentHistory(fn)).toEqual([-2, 0, 1])
})

it('should not erase sibling branches', () => {
  const fooFn = jest.fn()
  const trigger = createEvent<number>()
  const foo = createStore(0)
  foo.on(trigger, (state, payload) => payload)
  let skipped = false
  foo.watch(val => {
    if (!skipped) {
      skipped = true
      return
    }
    //@ts-expect-error
    foo.setState(val)
  })

  foo.watch(fooFn)
  trigger(30)
  expect(argumentHistory(fooFn)).toEqual([0, 30])
})

test('watch behavior should be consistent', () => {
  const fn = jest.fn()
  const trigger = createEvent<number>()

  createNode({
    node: [step.run({fn: () => fn(`watch A`)})],
    parent: [trigger],
  })
  createNode({
    node: [step.compute({fn: n => n}), step.run({fn: () => fn(`watch B`)})],
    parent: [trigger],
  })
  createNode({
    node: [step.run({fn: () => fn(`watch C`)})],
    parent: [trigger],
  })
  createNode({
    node: [step.compute({fn: n => fn(`compute`)})],
    parent: [trigger],
  })

  trigger(1)

  expect(argumentHistory(fn)).toMatchInlineSnapshot(`
    Array [
      "compute",
      "watch A",
      "watch B",
      "watch C",
    ]
  `)
})

test('stale reads', async () => {
  const fn = jest.fn()
  const fx = createEffect((tag: string) => `${tag}/end`)
  const x = createStore([] as (string | boolean)[])
    .on(fx, (words, x) => [...words, x])
    .on(fx.pending, (words, x) => [...words, x])
    .on(fx.doneData, (words, x) => [...words, x])

  x.watch(upd => fn(upd.join(', ')))

  await fx('a')
  await fx('b')
  expect(argumentHistory(fn)).toMatchInlineSnapshot(`
    Array [
      "",
      "a",
      "a, true",
      "a, true, a/end",
      "a, true, a/end, false",
      "a, true, a/end, false, b",
      "a, true, a/end, false, b, true",
      "a, true, a/end, false, b, true, b/end",
      "a, true, a/end, false, b, true, b/end, false",
    ]
  `)
})

describe('experimental stack meta', () => {
  /**
   * Private thing to experiment with, not a public API, not production ready
   */
  function withStackMeta<T>(unit: Event<T>): Event<{params: T; meta: unknown}> {
    const result = unit.map(x => x)

    const node = (result as any).graphite as Node

    node.seq.push(
      step.compute({
        fn: (params, _, stack) => ({params, meta: stack.meta}),
      }),
    )

    return result as any
  }
  function getStackMeta(): any {
    return getSharedStackMeta()
  }

  test('basics', async () => {
    // app code
    const event = createEvent()
    const $store = createStore(0).on(event, x => x + 1)
    const fx = createEffect(() => Promise.resolve(0))
    const $store2 = createStore(0).on(fx.done, x => x + 1)

    const up = createEvent()
    const $count = createStore(0).on(up, x => x + 1)

    const delayFx = createEffect(async () => Promise.resolve())

    let fromImperativeCall: any
    const wrapFx = createEffect(async () => {
      up()
      await delayFx()
      up()
      fromImperativeCall = getStackMeta()
      return await fx()
    })

    sample({
      clock: $store,
      filter: () => true,
      target: wrapFx,
    })

    const metaRead = withStackMeta($store2.updates)

    const metaUpdated = createEvent<any>()

    split({
      // @ts-expect-error
      source: metaRead,
      match: $store2.map(() => 'match_by_store' as const),
      cases: {
        match_by_store: metaUpdated.prepend(({meta}: any) => meta),
      },
    })

    const $meta = createStore<any>(null).on(metaUpdated, (_, x) => x)

    const testMeta = {
      foo: 'bar',
    } as const

    const scope = fork()

    launch({
      target: event,
      params: null,
      meta: testMeta,
      scope: scope,
    })

    await allSettled(scope)

    expect(fromImperativeCall).toMatchObject({
      foo: 'bar',
    })
    expect(scope.getState($meta)).toMatchObject({
      foo: 'bar',
    })

    /** no meta should left */
    expect(getStackMeta()).toEqual(undefined)

    /** no meta start of effect,
     * only own effect's fxID meta visible,
     * no previous meta
     */
    await allSettled(wrapFx, {scope})
    expect(fromImperativeCall?.foo).toEqual(undefined)

    /** no meta should left */
    expect(getStackMeta()).toEqual(undefined)
    expect(scope.getState($count)).toEqual(4)
  })

  test('attach-like bridge for any events', async () => {
    const a = createEvent()
    const b = createEvent()

    sample({
      clock: a,
      target: b,
    })

    const bWithMeta = withStackMeta(b)

    const bLocal = sample({
      clock: bWithMeta,
      filter: ({meta}) => (meta as any)?.local === true,
      fn: ({params}) => params,
    })

    const awatcher = jest.fn()
    const bwatcher = jest.fn()
    const blocalwatcher = jest.fn()
    a.watch(awatcher)
    b.watch(bwatcher)
    bLocal.watch(blocalwatcher)

    const scope = fork()

    allSettled(a, {scope})

    expect(awatcher).toBeCalledTimes(1)
    expect(bwatcher).toBeCalledTimes(1)
    expect(blocalwatcher).toBeCalledTimes(0)

    launch({
      target: a,
      params: null,
      scope,
      meta: {
        local: true,
      },
    })
    expect(awatcher).toBeCalledTimes(2)
    expect(bwatcher).toBeCalledTimes(2)
    expect(blocalwatcher).toBeCalledTimes(1)
  })

  test('shared controller', async () => {
    const start = createEvent()
    const otherStart = createEvent()

    const $fails = createStore<number[]>([])

    const fetchFx = createEffect(async (p: number) => {
      const meta = getStackMeta() as any as any

      const controller = meta?.controller

      return await new Promise<number>((rs, rj) => {
        if (controller) {
          const un = controller.watch(() => {
            rj(p)
            un()
          })
        }
        setTimeout(() => rs(p), p)
      })
    })

    const ex1Fx = createEffect(async () => {
      return await fetchFx(1)
    })
    const ex2Fx = createEffect(async () => {
      return await fetchFx(12)
    })
    const ex3Fx = createEffect(async () => {
      return await fetchFx(13)
    })
    const ex4Fx = createEffect(async () => {
      return await fetchFx(5)
    })

    sample({
      // @ts-expect-error
      clock: [ex1Fx.failData, ex2Fx.failData, ex3Fx.failData, ex4Fx.failData],
      source: $fails,
      fn: (fails, fail) => [...fails, fail],
      target: $fails,
    })

    const cancel = createEvent()

    const nested = createEvent()

    sample({
      clock: start,
      target: [ex1Fx],
    })
    sample({
      clock: [ex1Fx.done],
      target: [ex2Fx, nested],
    })
    sample({
      clock: nested,
      target: [ex3Fx],
    })

    sample({
      clock: otherStart,
      target: [ex4Fx],
    })

    sample({
      clock: ex4Fx.done,
      target: cancel,
    })

    const scope = fork()

    launch({
      target: start,
      params: null,
      scope,
      meta: {
        controller: cancel,
      },
    })
    allSettled(otherStart, {scope})

    await allSettled(scope)

    expect(scope.getState($fails)).toEqual([12, 13])
  })

  test('effects cases', async () => {
    const metas: any[] = []

    const saveCurrentMeta = () => metas.push(getStackMeta().testKey)
    const event = createEvent()

    const fx1 = createEffect(async () => {
      await Promise.resolve()
    })
    const fx2 = createEffect(async () => {
      await Promise.resolve()
    })
    const fx3 = createEffect(async () => {
      await Promise.resolve()
    })
    const controller1Fx = createEffect(async () => {
      saveCurrentMeta()
      fx1()
      saveCurrentMeta()
      fx2()
      saveCurrentMeta()
      fx3()
      saveCurrentMeta()
    })
    const controller2Fx = createEffect(async () => {
      saveCurrentMeta()
      await fx1()
      saveCurrentMeta()
      await fx2()
      saveCurrentMeta()
      await fx3()
      saveCurrentMeta()
    })
    const controller3Fx = createEffect(async () => {
      saveCurrentMeta()
      await Promise.all([fx1(), fx2(), fx3()])
      saveCurrentMeta()
    })
    const controller4Fx = createEffect(async () => {
      saveCurrentMeta()
      event()
      saveCurrentMeta()
      await fx2()
      saveCurrentMeta()
    })

    const start = createEvent()
    sample({
      clock: start,
      target: [controller1Fx, controller2Fx, controller3Fx, controller4Fx],
    })

    const scope = fork()

    launch({
      target: start,
      params: null,
      scope,
      meta: {
        testKey: 'testValue',
      },
    })

    await allSettled(scope)

    expect(metas.every(v => v === 'testValue')).toEqual(true)
    /** no meta should left */
    expect(getSharedStackMeta()).toEqual(undefined)
  })

  function attachMeta<T>(ev: Event<T>, key: string, value: unknown): Event<T> {
    const node = (ev as any).graphite as Node

    node.seq.unshift(
      step.compute({
        fn: (params, _scope, stack) => {
          if (stack.meta) {
            stack.meta[key] = value
          } else {
            console.error('Unsupported case yet')
          }
          return params
        },
      }),
    )

    return ev
  }

  test('batching edge case', async () => {
    const scope = fork()

    const start = createEvent()
    const ev1 = createEvent()
    const ev2 = createEvent()

    attachMeta(ev1, 'testKey1', 'testValue1')
    attachMeta(ev2, 'testKey2', 'testValue2')

    sample({
      clock: start,
      target: [ev1, ev2],
    })

    const end = sample({
      clock: [ev1, ev2],
    })

    const endMeta = withStackMeta(end).map(({meta}) => meta)

    const fn = jest.fn()
    endMeta.watch(fn)

    launch({
      target: start,
      params: null,
      scope,
      meta: {
        testKey: 'testValue',
      },
    })

    await allSettled(scope)

    expect(fn).toBeCalledTimes(1)
    expect(fn).toBeCalledWith({
      testKey: 'testValue',
      testKey1: 'testValue1',
      testKey2: 'testValue2',
    })
  })

  test.skip('inject meta from step', async () => {
    /**
     * Unsupported case yet
     */
    const scope = fork()

    const start = createEvent()
    const ev1 = createEvent()
    const ev2 = createEvent()

    attachMeta(ev1, 'testKey1', 'testValue1')
    attachMeta(ev2, 'testKey2', 'testValue2')

    sample({
      clock: start,
      target: [ev1, ev2],
    })

    const end = sample({
      clock: [ev1, ev2],
    })

    const endMeta = withStackMeta(end).map(({meta}) => meta)

    const fn = jest.fn()
    endMeta.watch(fn)

    launch({
      target: start,
      params: null,
      scope,
    })

    await allSettled(scope)

    expect(fn).toBeCalledTimes(1)
    expect(fn).toBeCalledWith({
      testKey1: 'testValue1',
      testKey2: 'testValue2',
    })
  })
})

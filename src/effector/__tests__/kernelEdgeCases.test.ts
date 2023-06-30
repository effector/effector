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

test('experimental stack meta', async () => {
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

  const event = createEvent()
  const $store = createStore(0).on(event, x => x + 1)
  const fx = createEffect(() => Promise.resolve(0))
  const $store2 = createStore(0).on(fx.done, x => x + 1)

  sample({
    clock: $store,
    filter: () => true,
    target: fx,
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

  expect(scope.getState($meta)).toEqual(testMeta)
})

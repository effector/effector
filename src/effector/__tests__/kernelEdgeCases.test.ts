import {
  createEvent,
  createStore,
  sample,
  step,
  createNode,
  createEffect,
  Node,
  Event,
  getMetaPage,
  Unit,
  fork,
  allSettled
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

describe.only('experimental metaPage approach', () => {
  function injectMetaPageReader(e: Unit<any>, cb: () => void) {
    ;(e as any as {graphite: Node}).graphite.seq.push(
      step.compute({
        fn: u => {
          cb()

          return u
        },
      }),
    )
  }

  test('There should be separate instance of metaPage for each launch from start to end', () => {
    const metaObjectsStart: any[] = []
    const metaObjectsEnd: any[] = []

    function saveMetaPageRef(t: Event<any>, saveTo: any[]) {
      injectMetaPageReader(t, () => {
        saveTo.push(getMetaPage())
      })
    }

    const event = createEvent()

    saveMetaPageRef(event, metaObjectsStart)

    const endEvent = sample({
      clock: event,
    })

    saveMetaPageRef(endEvent, metaObjectsEnd)

    /**
     * Before launch metaPage should be null
     */
    expect(getMetaPage()).toBe(null)

    event()
    event()
    event()

    /**
     * After launch metaPage should be null too
     */
    expect(getMetaPage()).toBe(null)

    metaObjectsStart.forEach((page, idx) => {
      expect(page).not.toBe(null)
      expect(page).toBe(metaObjectsEnd[idx])
      expect(
        metaObjectsEnd.filter((_p, endIdx) => endIdx !== idx),
      ).not.toContain(page)
    })
  })
  test('It should be possible to write some data to metaPage object and access it', () => {
    const event = createEvent()
    const endEvent = sample({
      clock: event,
    })

    injectMetaPageReader(event, () => {
      const metaPage = getMetaPage()
      ;(metaPage as any).test = 'test'
    })
    let endValue: any = null
    injectMetaPageReader(endEvent, () => {
      const metaPage = getMetaPage()
      endValue = metaPage?.test
    })

    event()

    expect(endValue).toBe('test')
  })
  test('metaPage object should survive through effect calls', async () => {
    const event = createEvent()
    const effect = createEffect({
      handler: () => {
        return new Promise(r => setTimeout(r))
      },
    })

    sample({
      clock: event,
      target: effect,
    })

    const endEvent = sample({
      clock: effect.done,
    })

    injectMetaPageReader(event, () => {
      const metaPage = getMetaPage()
      ;(metaPage as any).test = 'test'
    })
    let endValue: any = null
    injectMetaPageReader(endEvent, () => {
      const metaPage = getMetaPage()
      endValue = metaPage?.test
    })

    const scope = fork();

    await allSettled(event, {scope})

    expect(endValue).toBe('test')
  })
  test('metaPage object should be available inside the effect handler', async () => {
    const event = createEvent()
    const effect = createEffect({
      handler: async () => {
        const metaPage = getMetaPage()
        metaPage!.test = 'test'

        return new Promise(r => setTimeout(r))
      },
    })

    sample({
      clock: event,
      target: effect,
    })

    const endEvent = sample({
      clock: effect.done,
    })

    let endValue: any = null
    injectMetaPageReader(endEvent, () => {
      const metaPage = getMetaPage()
      endValue = metaPage?.test
    })

    const scope = fork();

    await allSettled(event, {scope})

    expect(endValue).toBe('test')
  })
  test('metaPage should survive through imperative effect calls', async () => {
    const event = createEvent()
    const sleepFx = createEffect(async () => new Promise(r => setTimeout(r)))
    const effect = createEffect({
      handler: async () => {
        await sleepFx()

        const metaPage = getMetaPage()
        metaPage!.test = 'test'
      },
    })

    sample({
      clock: event,
      target: effect,
    })

    const endEvent = sample({
      clock: effect.done,
    })

    let endValue: any = null
    injectMetaPageReader(endEvent, () => {
      const metaPage = getMetaPage()
      endValue = metaPage?.test
    })

    const scope = fork();

    await allSettled(event, {scope})

    expect(endValue).toBe('test')
  })
})

import {
  sample,
  createStore,
  createEvent,
  combine,
  guard,
  createEffect,
  restore,
  is,
  Store,
  Event,
  Effect,
} from 'effector'
import {argumentHistory} from 'effector/fixtures'

const consoleError = console.error

beforeAll(() => {
  console.error = (message, ...args) => {
    if (String(message).includes('guard')) return
    consoleError(message, ...args)
  }
})

afterAll(() => {
  console.error = consoleError
})

test('store update will always performs before sampling', () => {
  const fn = jest.fn()
  const int = createStore(0)
  const trigger = createEvent()
  sample({
    source: int,
    clock: trigger,
  }).watch(x => {
    fn(x)
  })
  int.on(trigger, x => x + 1)
  trigger()
  expect(argumentHistory(fn)).toEqual([1])
})

test('store combination will always updates before sampling', () => {
  const fn = jest.fn()
  const int = createStore(0)
  const shape = combine({int})
  const trigger = createEvent()
  sample({
    source: shape,
    clock: trigger,
  }).watch(x => {
    fn(x)
  })
  int.on(trigger, x => x + 1)
  trigger()
  expect(argumentHistory(fn)).toEqual([{int: 1}])
})

describe('clock should use the last update', () => {
  describe('with guard', () => {
    test('reference case', async () => {
      const fn = jest.fn()
      const fetchCities = createEffect(async () => ['msk', 'spb'])

      const $selectedCities = restore(fetchCities, [])
      const $areCitiesSelected = $selectedCities.map(c => c.length > 0)

      const $filterValues = createStore<string | null>(null).on(
        $selectedCities,
        (_, cities) => {
          if (cities.length) {
            return 'result'
          }
        },
      )

      const $requestData = combine({
        city: $selectedCities,
        filter: $filterValues,
      })

      const bugHere = guard({
        source: $requestData,
        filter: $areCitiesSelected,
      })

      const noBugHere = guard({
        clock: $requestData,
        filter: $areCitiesSelected,
      })

      watchAll(fn, [
        fetchCities,
        $selectedCities,
        $areCitiesSelected,
        $filterValues,
        $requestData,
        bugHere,
        noBugHere,
      ])

      fn(`## init complete`)

      await fetchCities()

      expect(argumentHistory(fn)).toMatchInlineSnapshot(`
        Array [
          "$selectedCities: []",
          "$selectedCities → *: false",
          "$filterValues: null",
          "$requestData: {city:[],filter:null}",
          "## init complete",
          "fetchCities: void",
          "fetchCities.done: [msk,spb]",
          "$selectedCities: [msk,spb]",
          "$selectedCities → *: true",
          "$filterValues: result",
          "$requestData: {city:[msk,spb],filter:result}",
          "bugHere: {city:[msk,spb],filter:result}",
          "noBugHere: {city:[msk,spb],filter:result}",
        ]
      `)
    })
    test('guard case', async () => {
      const fn = jest.fn()
      const fetchCities = createEffect(async () => ['msk', 'spb'])

      const $selectedCities = restore(fetchCities, [])
      const $areCitiesSelected = $selectedCities.map(c => c.length > 0)

      const $filterValues = createStore<string | null>(null)

      sample({
        source: guard({
          source: $selectedCities,
          filter: $areCitiesSelected,
        }),
        fn: () => 'result',
        target: $filterValues,
      })

      const $requestData = combine({
        city: $selectedCities,
        filter: $filterValues,
      })

      const bugHere = guard({
        source: $requestData,
        filter: $areCitiesSelected,
      })

      const noBugHere = guard({
        clock: $requestData,
        filter: $areCitiesSelected,
      })

      watchAll(fn, [
        fetchCities,
        $selectedCities,
        $areCitiesSelected,
        $filterValues,
        $requestData,
        bugHere,
        noBugHere,
      ])

      fn(`## init complete`)

      await fetchCities()

      expect(argumentHistory(fn)).toMatchInlineSnapshot(`
        Array [
          "$selectedCities: []",
          "$selectedCities → *: false",
          "$filterValues: null",
          "$requestData: {city:[],filter:null}",
          "## init complete",
          "fetchCities: void",
          "fetchCities.done: [msk,spb]",
          "$selectedCities: [msk,spb]",
          "$selectedCities → *: true",
          "$filterValues: result",
          "$requestData: {city:[msk,spb],filter:result}",
          "bugHere: {city:[msk,spb],filter:result}",
          "noBugHere: {city:[msk,spb],filter:result}",
        ]
      `)
    })
  })
  describe('with sample', () => {
    test('reference case', async () => {
      const fn = jest.fn()
      const trigger = createEffect(async () => true)

      const $selected = restore(trigger, false)
      const $result = createStore<string | null>(null)
      sample({
        source: $selected,
        greedy: true,
        fn: () => 'result',
        target: $result,
      })

      const $combine = combine({$selected, $result})

      //clockParams have an outdated $combine value
      const withBug = sample({
        source: $selected,
        clock: $combine,
        fn: (_, clockParams) => clockParams,
      })

      const noBug = sample({
        source: $selected,
        clock: sample({clock: $combine}),
        fn: (_, clockParams) => clockParams,
      })

      const bugAgain = sample({
        source: $selected,
        clock: sample({clock: $combine, greedy: true}),
        fn: (_, clockParams) => clockParams,
      })

      watchAll(fn, [
        trigger,
        $combine,
        $selected,
        $result,
        withBug,
        noBug,
        bugAgain,
      ])

      fn(`## init complete`)

      await trigger()

      expect(argumentHistory(fn)).toMatchInlineSnapshot(`
        Array [
          "$combine: {$selected:false,$result:null}",
          "$selected: false",
          "$result: null",
          "withBug: {$selected:false,$result:null}",
          "noBug: {$selected:false,$result:null}",
          "bugAgain: {$selected:false,$result:null}",
          "## init complete",
          "trigger: void",
          "trigger.done: true",
          "$selected: true",
          "$result: result",
          "$combine: {$selected:true,$result:result}",
          "withBug: {$selected:true,$result:result}",
          "noBug: {$selected:true,$result:result}",
          "bugAgain: {$selected:true,$result:result}",
        ]
      `)
    })
    test('sample case', async () => {
      const fn = jest.fn()
      const trigger = createEffect(async () => true)

      const $selected = restore(trigger, false)
      const $result = createStore<string | null>(null)
      sample({
        source: $selected,
        fn: () => 'result',
        target: $result,
      })

      const $combine = combine({$selected, $result})

      //clockParams have an outdated $combine value
      const withBug = sample({
        source: $selected,
        clock: $combine,
        fn: (_, clockParams) => clockParams,
      })

      const noBug = sample({
        source: $selected,
        clock: sample({clock: $combine}),
        fn: (_, clockParams) => clockParams,
      })

      const bugAgain = sample({
        source: $selected,
        clock: sample({clock: $combine, greedy: true}),
        fn: (_, clockParams) => clockParams,
      })
      watchAll(fn, [
        trigger,
        $combine,
        $selected,
        $result,
        withBug,
        noBug,
        bugAgain,
      ])

      fn(`## init complete`)

      await trigger()

      expect(argumentHistory(fn)).toMatchInlineSnapshot(`
        Array [
          "$combine: {$selected:false,$result:null}",
          "$selected: false",
          "$result: null",
          "withBug: {$selected:false,$result:null}",
          "noBug: {$selected:false,$result:null}",
          "bugAgain: {$selected:false,$result:null}",
          "## init complete",
          "trigger: void",
          "trigger.done: true",
          "$selected: true",
          "$result: result",
          "$combine: {$selected:true,$result:result}",
          "withBug: {$selected:true,$result:result}",
          "noBug: {$selected:true,$result:result}",
          "bugAgain: {$selected:true,$result:result}",
        ]
      `)
    })
  })
})

describe('sample phases cases', () => {
  test('phases must work', () => {
    const fn = jest.fn()

    const start = createEvent()

    const $value = createStore(0)

    const refetch = createEvent()
    const fetcher = createEvent<{a: number}>()

    const $params = combine({a: $value})

    sample({
      clock: start,
      target: refetch,
    })

    sample({
      clock: refetch,
      source: $params,
      target: fetcher,
    })

    sample({
      clock: start,
      fn: () => 5,
      target: $value,
    })

    watchAll(fn, [start, $value, $params, refetch, fetcher])

    fn(`## init complete`)

    start()

    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        "$value: 0",
        "$params: {a:0}",
        "## init complete",
        "start: void",
        "refetch: void",
        "$value: 5",
        "$params: {a:5}",
        "fetcher: {a:5}",
      ]
    `)
  })
  test('phases must work with batching', () => {
    const fn = jest.fn()

    const start = createEvent()

    const $value = createStore(0)

    const refetch = createEvent()
    const fetcher = createEvent<{a: number}>()
    const fetcherB = createEvent<{a: number}>()

    const $params = combine({a: $value})

    sample({
      clock: start,
      target: refetch,
    })

    sample({
      clock: [refetch, $value],
      source: $params,
      target: fetcher,
    })

    sample({
      clock: refetch,
      source: $params,
      target: fetcherB,
    })

    sample({
      clock: start,
      fn: () => 5,
      target: $value,
    })

    watchAll(fn, [start, $value, $params, refetch, fetcher, fetcherB])

    fn(`## init complete`)

    start()

    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
          Array [
            "$value: 0",
            "$params: {a:0}",
            "## init complete",
            "start: void",
            "refetch: void",
            "$value: 5",
            "$params: {a:5}",
            "fetcher: {a:5}",
            "fetcherB: {a:5}",
          ]
      `)
  })
  test('phases must work with many layers', () => {
    const fn = jest.fn()

    const start = createEvent<number>()

    const $value = createStore(0)

    const refetch = createEvent()
    const fetcher = createEvent<{a: number}>()
    const fetcherB = createEvent<{a: number}>()
    const nestedLayerA = createEvent<{a: number}>()
    const nestedLayerB = createEvent<{a: number}>()
    const $canNextCycleGo = $value.map(v => v < 3)

    const myFx = createEffect((params: {a: number}) => {
      return params.a
    })

    const $params = combine({a: $value})

    const cycleStarted = start.map(n => `### cycle ${n} started`)

    sample({
      clock: fetcher,
      source: $params,
      target: myFx,
    })

    sample({
      clock: [nestedLayerA, nestedLayerB],
      source: $value,
      fn: s => s + 1,
      target: start,
    })

    sample({
      clock: fetcher,
      source: $params,
      target: nestedLayerA,
    })

    sample({
      clock: fetcherB,
      source: $params,
      target: nestedLayerB,
    })

    sample({
      clock: start,
      filter: $canNextCycleGo,
      target: refetch,
    })

    sample({
      clock: [refetch, $value],
      source: $params,
      target: fetcher,
    })

    sample({
      clock: refetch,
      source: $params,
      target: fetcherB,
    })

    sample({
      clock: start,
      filter: $canNextCycleGo,
      target: $value,
    })

    watchAll(fn, [
      start,
      $value,
      $params,
      refetch,
      fetcher,
      fetcherB,
      nestedLayerB,
      nestedLayerA,
      cycleStarted,
      myFx,
    ])

    fn(`## init complete`)

    start(1)

    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        "$value: 0",
        "$params: {a:0}",
        "## init complete",
        "start: 1",
        "start → *: ### cycle 1 started",
        "refetch: 1",
        "$value: 1",
        "$params: {a:1}",
        "fetcher: {a:1}",
        "fetcherB: {a:1}",
        "myFx: {a:1}",
        "nestedLayerA: {a:1}",
        "nestedLayerB: {a:1}",
        "start: 2",
        "start → *: ### cycle 2 started",
        "refetch: 2",
        "$value: 2",
        "$params: {a:2}",
        "fetcher: {a:2}",
        "fetcherB: {a:2}",
        "myFx: {a:2}",
        "nestedLayerA: {a:2}",
        "nestedLayerB: {a:2}",
        "start: 3",
        "start → *: ### cycle 3 started",
        "refetch: 3",
        "$value: 3",
        "$params: {a:3}",
        "fetcher: {a:3}",
        "fetcherB: {a:3}",
        "myFx: {a:3}",
        "nestedLayerA: {a:3}",
        "nestedLayerB: {a:3}",
        "start: 4",
        "start → *: ### cycle 4 started",
        "myFx.done: 1",
        "myFx.done: 2",
        "myFx.done: 3",
      ]
    `)
  })
  test('sample branches with different layers should still be batched', () => {
    const start = createEvent()
    const a = createEvent()
    const b = createEvent()

    sample({
      clock: start,
      target: [a, b],
    })

    const c = sample({
      clock: sample({clock: sample({clock: sample({clock: b})})}),
    })

    const d = sample({
      clock: [a, c],
    })

    const $count = createStore(0).on(d, s => s + 1)

    const fn = jest.fn()
    watchAll(fn, [start, a, b, c, d, $count])

    fn(`## init complete`)

    start()

    expect($count.getState()).toBe(1)
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        "$count: 0",
        "## init complete",
        "start: void",
        "a: void",
        "b: void",
        "c: void",
        "d: void",
        "$count: 1",
      ]
    `)
  })
})

describe('combine+sample cases', () => {
  test('combine-sample-sample', () => {
    const $a = createStore(0)
    const $b = createStore(0)
    const run = createEvent()

    const $combine = combine([$a, $b])

    sample({
      clock: run,
      source: $a,
      fn: s => s + 1,
      target: $a,
    })

    sample({
      clock: run,
      source: $b,
      fn: s => s + 1,
      target: $b,
    })

    const fn = jest.fn()
    watchAll(fn, [run, $a, $b, $combine])

    fn(`## init complete`)

    run()

    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        "$a: 0",
        "$b: 0",
        "$combine: [0,0]",
        "## init complete",
        "run: void",
        "$a: 1",
        "$b: 1",
        "$combine: [1,1]",
      ]
    `)
  })

  test('sample-sample-combine', () => {
    const $a = createStore(0)
    const $b = createStore(0)
    const run = createEvent()

    sample({
      clock: run,
      source: $a,
      fn: s => s + 1,
      target: $a,
    })

    sample({
      clock: run,
      source: $b,
      fn: s => s + 1,
      target: $b,
    })

    const $combine = combine([$a, $b])

    const fn = jest.fn()
    watchAll(fn, [run, $a, $b, $combine])

    fn(`## init complete`)

    run()

    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        "$a: 0",
        "$b: 0",
        "$combine: [0,0]",
        "## init complete",
        "run: void",
        "$a: 1",
        "$b: 1",
        "$combine: [1,1]",
      ]
    `)
  })

  test('sample-combine-sample', () => {
    const $a = createStore(0)
    const $b = createStore(0)
    const run = createEvent()

    sample({
      clock: run,
      source: $a,
      fn: s => s + 1,
      target: $a,
    })

    const $combine = combine([$a, $b])

    sample({
      clock: run,
      source: $b,
      fn: s => s + 1,
      target: $b,
    })

    const fn = jest.fn()
    watchAll(fn, [run, $a, $b, $combine])

    fn(`## init complete`)

    run()

    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        "$a: 0",
        "$b: 0",
        "$combine: [0,0]",
        "## init complete",
        "run: void",
        "$a: 1",
        "$b: 1",
        "$combine: [1,1]",
      ]
    `)
  })
  test('sample(event)-sample(sync effect)-combine', () => {
    const $a = createStore(0)
    const $b = createStore(0)
    const run = createEvent()
    const event = createEvent()
    const effectFx = createEffect(() => null)

    sample({
      clock: run,
      target: [event, effectFx],
    })

    sample({
      clock: event,
      source: $a,
      fn: s => s + 1,
      target: $a,
    })

    sample({
      clock: effectFx.done,
      source: $b,
      fn: s => s + 1,
      target: $b,
    })

    const $combine = combine([$a, $b])

    const fn = jest.fn()
    watchAll(fn, [run, event, effectFx, $a, $b, $combine])

    fn(`## init complete`)

    run()

    /**
     * Intermediate combine trigger here is ok,
     * because effect can be both sync and async internally,
     * so actual effectFx.done can happen anytime
     *
     * This behavior is consistent with any kind of effect handler
     */
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        "$a: 0",
        "$b: 0",
        "$combine: [0,0]",
        "## init complete",
        "run: void",
        "event: void",
        "effectFx: void",
        "$a: 1",
        "$combine: [1,0]",
        "effectFx.done: null",
        "$b: 1",
        "$combine: [1,1]",
      ]
    `)
  })
  test('sample(event)-sample(event.map)-combine', () => {
    const $a = createStore(0)
    const $b = createStore(0)
    const run = createEvent()
    const event = createEvent()
    const eventB = createEvent()
    const eventMap = eventB.map(() => null)

    sample({
      clock: run,
      target: [event, eventB],
    })

    sample({
      clock: event,
      source: $a,
      fn: s => s + 1,
      target: $a,
    })

    sample({
      clock: eventMap,
      source: $b,
      fn: s => s + 1,
      target: $b,
    })

    const $combine = combine([$a, $b])

    const fn = jest.fn()
    watchAll(fn, [run, event, eventB, eventMap, $a, $b, $combine])

    fn(`## init complete`)

    run()

    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        "$a: 0",
        "$b: 0",
        "$combine: [0,0]",
        "## init complete",
        "run: void",
        "event: void",
        "eventB: void",
        "eventB → *: null",
        "$a: 1",
        "$b: 1",
        "$combine: [1,1]",
      ]
    `)
  })
  test('sample(event)-sample(sample(event))-combine', () => {
    const $a = createStore(0)
    const $b = createStore(0)
    const run = createEvent()
    const event = createEvent()
    const eventB = createEvent()
    const eventMap = createEvent()

    /**
     * Here we have an intermediate "sample layer",
     * which may affet combine batching, but should not
     */
    sample({
      clock: eventB,
      target: eventMap,
    })

    sample({
      clock: run,
      target: [event, eventB],
    })

    sample({
      clock: event,
      source: $a,
      fn: s => s + 1,
      target: $a,
    })

    sample({
      clock: eventMap,
      source: $b,
      fn: s => s + 1,
      target: $b,
    })

    const $combine = combine([$a, $b])

    const fn = jest.fn()
    watchAll(fn, [run, event, eventB, eventMap, $a, $b, $combine])

    fn(`## init complete`)

    run()

    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        "$a: 0",
        "$b: 0",
        "$combine: [0,0]",
        "## init complete",
        "run: void",
        "event: void",
        "eventB: void",
        "eventMap: void",
        "$a: 1",
        "$b: 1",
        "$combine: [1,1]",
      ]
    `)
  })
  test('"sourced" operator edge-case', () => {
    const fn = jest.fn()

    /**
     * This test is not about "sourced" operator itself,
     * but about the way it is implemented - so this version of operator is really shortened
     * to the crucial parts
     */
    function sourced<T>(config: {
      source: Store<T>
      clock: Event<any>
    }): Store<T> {
      const $target = createStore<T>(null as T)

      sample({
        clock: config.clock,
        source: config.source,
        fn: x => x,
        target: $target,
      })

      return $target
    }

    const start = createEvent()
    const $a = createStore(0).on(start, () => 1)
    const $b = createStore(0).on(start, () => 2)
    const $c = createStore(0).on(start, () => 3)

    const resolve = createEvent()

    const $final = createStore<null | {tA: number; tB: number; tC: number}>(
      null,
    )

    sample({
      clock: start,
      target: resolve,
    })

    const $targetA = createStore(0)

    sample({
      clock: sourced({source: $a, clock: resolve}),
      target: $targetA,
    })

    const $targetB = createStore(0)

    sample({
      clock: sourced({source: $b, clock: resolve}),
      target: $targetB,
    })

    const $targetC = createStore(0)

    sample({
      clock: sourced({source: $c, clock: resolve}),
      target: $targetC,
    })

    const $finalParams = combine({
      tA: $targetA,
      tB: $targetB,
      tC: $targetC,
    })

    sample({
      clock: resolve,
      source: $finalParams,
      fn: x => x,
      target: $final,
    })

    watchAll(fn, [
      $a,
      $b,
      $c,
      $final,
      start,
      resolve,
      $targetA,
      $targetB,
      $targetC,
    ])

    fn(`## init complete`)

    start()

    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        "$a: 0",
        "$b: 0",
        "$c: 0",
        "$final: null",
        "$targetA: 0",
        "$targetB: 0",
        "$targetC: 0",
        "## init complete",
        "start: void",
        "$a: 1",
        "$b: 2",
        "$c: 3",
        "resolve: void",
        "$targetA: 1",
        "$targetB: 2",
        "$targetC: 3",
        "$final: {tA:1,tB:2,tC:3}",
      ]
    `)
  })
})

function watchAll(
  fn: jest.Mock<any, any>,
  units: Array<Store<any> | Event<any> | Effect<any, any>>,
) {
  for (const unit of units) {
    const tag = unit.shortName
    unitWatch(`${tag}`, unit, fn)
    if (is.effect(unit)) {
      unitWatch(`${tag}.done`, unit.doneData, fn)
      unitWatch(`${tag}.fail`, unit.failData, fn)
    }
  }
}

function unitWatch<T>(
  tag: string,
  unit: Store<T> | Event<T> | Effect<T, any, any>,
  fn: jest.Mock<any, any>,
  log: boolean = false,
) {
  unit.watch(value => {
    let text: string
    if (typeof value === 'object' && value !== null) {
      text = JSON.stringify(value).replace(/"/gi, '')
    } else if (value === undefined) {
      text = 'void'
    } else {
      text = `${value}`
    }
    fn(`${tag}: ${text}`)
    if (log) {
      console.log(tag, text)
    }
  })
}

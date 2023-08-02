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
        "fetcher: {a:5}",
        "$value: 5",
        "$params: {a:5}",
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
        "$combine: [1,0]",
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
        "$combine: [1,0]",
        "$b: 1",
        "$combine: [1,1]",
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

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
  fork,
  allSettled,
} from 'effector'
import {argumentHistory} from 'effector/fixtures'
import {inspect} from 'effector/inspect'

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

test.only('mapped store leaking old value edge-case', async () => {
  const trigger = createEffect(async () => {
    inited()
  })
  const inited = createEvent()
  const $flag = createStore(false)
  const $params = createStore({a: 'a', b: 'b'})
  const parsed = createEvent<{a: string; b: string}>()
  sample({
    clock: [inited],
    source: $params,
    filter: createStore(true),
    target: parsed,
  })
  const aParsed = createEvent<string>()
  const bParsed = createEvent<string>()
  sample({
    clock: parsed,
    fn: p => p.a,
    target: aParsed,
  })
  sample({
    clock: parsed,
    fn: p => p.b,
    target: bParsed,
  })
  const $b = createStore('')
  sample({
    clock: bParsed,
    fn: x => x,
    target: $b,
  })
  const $a = createStore('')
  sample({
    clock: aParsed,
    filter: () => true,
    fn: x => x,
    target: $a,
  })
  const $isA = combine($a, a => a === 'a')

  const $paramsFinal = combine({isA: $isA, b: $b, flag: $flag})
  const $mapped = $paramsFinal.map(({isA, b, flag}) => {
    return isA && b === 'b' && flag
  })

  // @ts-expect-error
  $mapped.graphite.meta.name = '$mapped'

  const log = jest.fn()
  const scope = fork({
    values: [[$flag, true]],
  })
  inspect({
    scope,
    trace: true,
    fn: m => {
      if (
        [
          $b.graphite.id,
          $isA.graphite.id,
          $paramsFinal.graphite.id,
          $mapped.graphite.id,
        ].includes(m.id)
      ) {
        log(`${m.kind},${m.name},${m.value}`)

        m.trace?.forEach(e => {
          log(`<--${e.kind},${e.name},${e.value}`)
        })
      }
    },
  })
  await allSettled(trigger, {scope})
  expect(scope.getState($mapped)).toBe(true)

  expect(argumentHistory(log)).toMatchInlineSnapshot(`
    Array [
      "store,$b,b",
      "<--sample,undefined,b",
      "<--event,bParsed,b",
      "<--sample,undefined,b",
      "<--event,parsed,[object Object]",
      "<--sample,undefined,[object Object]",
      "<--event,merge(inited),undefined",
      "<--merge,undefined,undefined",
      "<--event,inited,undefined",
      "store,$paramsFinal,[object Object]",
      "<--combine,undefined,[object Object]",
      "<--store,$b,b",
      "<--sample,undefined,b",
      "<--event,bParsed,b",
      "<--sample,undefined,b",
      "<--event,parsed,[object Object]",
      "<--sample,undefined,[object Object]",
      "<--event,merge(inited),undefined",
      "<--merge,undefined,undefined",
      "<--event,inited,undefined",
      "store,$mapped,false",
      "<--map,undefined,false",
      "<--store,$paramsFinal,[object Object]",
      "<--combine,undefined,[object Object]",
      "<--store,$b,b",
      "<--sample,undefined,b",
      "<--event,bParsed,b",
      "<--sample,undefined,b",
      "<--event,parsed,[object Object]",
      "<--sample,undefined,[object Object]",
      "<--event,merge(inited),undefined",
      "<--merge,undefined,undefined",
      "<--event,inited,undefined",
      "store,$isA,true",
      "<--combine,undefined,true",
      "<--store,$a,a",
      "<--sample,undefined,a",
      "<--event,aParsed,a",
      "<--sample,undefined,a",
      "<--event,parsed,[object Object]",
      "<--sample,undefined,[object Object]",
      "<--event,merge(inited),undefined",
      "<--merge,undefined,undefined",
      "<--event,inited,undefined",
      "store,$paramsFinal,[object Object]",
      "<--combine,undefined,[object Object]",
      "<--store,$isA,true",
      "<--combine,undefined,true",
      "<--store,$a,a",
      "<--sample,undefined,a",
      "<--event,aParsed,a",
      "<--sample,undefined,a",
      "<--event,parsed,[object Object]",
      "<--sample,undefined,[object Object]",
      "<--event,merge(inited),undefined",
      "<--merge,undefined,undefined",
      "<--event,inited,undefined",
      "store,$mapped,true",
      "<--map,undefined,true",
      "<--store,$paramsFinal,[object Object]",
      "<--combine,undefined,[object Object]",
      "<--store,$isA,true",
      "<--combine,undefined,true",
      "<--store,$a,a",
      "<--sample,undefined,a",
      "<--event,aParsed,a",
      "<--sample,undefined,a",
      "<--event,parsed,[object Object]",
      "<--sample,undefined,[object Object]",
      "<--event,merge(inited),undefined",
      "<--merge,undefined,undefined",
      "<--event,inited,undefined",
    ]
  `)
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
          "$requestData: {city:[msk,spb],filter:null}",
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
          "$combine: {$selected:true,$result:null}",
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

import {performance, PerformanceObserver} from 'perf_hooks'

import {
  createStore,
  createEvent,
  createEffect,
  combine,
  sample,
  attach,
  //@ts-expect-error
  withFactory,
  fork,
  serialize,
} from 'effector'

test('perf', async () => {
  const stores = [] as any[]
  let factoryACalls = 0
  factoryC()
  const combined = combine(stores)
  await runTestCase({
    name: `factoryA() x${factoryACalls} getState`,
    warmTimes: 5,
    repeatTimes: 50,
    fn: () => {
      const scope = fork()
      scope.getState(combined)
    },
  })
  await runTestCase({
    name: `factoryA() x${factoryACalls} serialize`,
    warmTimes: 5,
    repeatTimes: 50,
    fn: () => {
      const scope = fork()
      serialize(scope)
    },
  })

  function factoryA() {
    factoryACalls += 1
    const a = createStore(0)
    const b = a.map(x => x + 1)
    const c = a.map(x => x.toString())
    const d = combine([a, b, c], lst => lst)
    const fx = createEffect({
      handler: (params: [number, number, string]) => {},
    })
    const attached = attach({source: d, effect: fx})
    const sampled = sample({source: fx, clock: d})
    const ea = createEvent()
    const eb = ea.map(x => x)
    const ec = sample({source: sampled, clock: d, filter: Boolean})
    stores.push(d)
  }

  function factoryB() {
    withFactory({
      sid: 'a',
      fn: () => factoryA(),
    })
    withFactory({
      sid: 'b',
      fn: () => factoryA(),
    })
    withFactory({
      sid: 'c',
      fn: () => factoryA(),
    })
    withFactory({
      sid: 'd',
      fn: () => factoryA(),
    })
    withFactory({
      sid: 'e',
      fn: () => factoryA(),
    })
    withFactory({
      sid: 'f',
      fn: () => factoryA(),
    })
    withFactory({
      sid: 'g',
      fn: () => factoryA(),
    })
    withFactory({
      sid: 'h',
      fn: () => factoryA(),
    })
    withFactory({
      sid: 'i',
      fn: () => factoryA(),
    })
    withFactory({
      sid: 'j',
      fn: () => factoryA(),
    })
  }

  function factoryC() {
    withFactory({
      sid: 'Ca',
      fn: () => factoryB(),
    })
    withFactory({
      sid: 'Cb',
      fn: () => factoryB(),
    })
    withFactory({
      sid: 'Cc',
      fn: () => factoryB(),
    })
    withFactory({
      sid: 'Cd',
      fn: () => factoryB(),
    })
    withFactory({
      sid: 'Ce',
      fn: () => factoryB(),
    })
  }
})

async function runTestCase({
  name,
  fn,
  warmTimes,
  repeatTimes,
}: {
  name: string
  fn(): void
  warmTimes: number
  repeatTimes: number
}) {
  const measuredFn = performance.timerify(fn)
  for (let i = 0; i < warmTimes; i++) {
    fn()
  }
  const results = await measure(() => {
    for (let i = 0; i < repeatTimes; i++) {
      measuredFn()
    }
  })
  const filtered = percentile(results, avg(results), 0.95)
  /** typical is 50-70ms */
  console.log(
    `${name}: avg ${avg(filtered).toFixed(2)} median ${median(filtered).toFixed(
      2,
    )}`,
  )

  function avg(list: number[]) {
    return list.reduce((acc, val) => acc + val, 0) / list.length
  }
  function percentile(list: number[], avg: number, percentile: number) {
    const z = list
      .map((n, i) => [Math.abs(n - avg), i])
      .sort((a, b) => a[0] - b[0])
    const upto = Math.ceil(list.length * percentile)
    return z.slice(0, upto).map(([, i]) => list[i])
  }
  function median(values: number[]) {
    if (values.length === 0) return 0
    const sorted = [...values].sort((a, b) => a - b)

    const half = Math.floor(sorted.length / 2)

    if (sorted.length % 2) return sorted[half]

    return (sorted[half - 1] + sorted[half]) / 2
  }
  function measure(cb: () => void) {
    const results: number[] = []
    let obs: PerformanceObserver
    const req = new Promise<number[]>(rs => {
      obs = new PerformanceObserver(list => {
        const entries = list.getEntries()
        entries.forEach(entry => {
          results.push(entry.duration)
        })
        rs(results)
      })
      //@ts-expect-error probably buffered is browser only feature
      obs.observe({entryTypes: ['function'], buffered: true})
    })
    cb()
    req.finally(() => {
      obs.disconnect()
    })
    return req
  }
}

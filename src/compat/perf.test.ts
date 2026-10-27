import {combine, createEvent, createStore, sample} from 'effector'

declare const initBrowser: () => Promise<void>
declare const browser: any
declare const execFunc: <T>(cb: () => Promise<T> | T) => Promise<T>

type PerfResult = {
  name: string
  totalMs: number
  iterations: number
  msPerIteration: number
  budgetMsPerIteration: number
}

beforeEach(async () => {
  await initBrowser()
}, 10e3)

test('performance budget on real devices', async () => {
  const results = await execFunc(async () => {
    function now() {
      if (typeof performance !== 'undefined' && performance.now) {
        return performance.now()
      }
      return Date.now()
    }

    function round(value: number) {
      return Math.round(value * 1000) / 1000
    }

    function runBenchmark(
      name: string,
      iterations: number,
      budgetMsPerIteration: number,
      fn: (index: number) => void,
    ) {
      for (let index = 0; index < 20; index += 1) {
        fn(index)
      }

      const startedAt = now()
      for (let index = 0; index < iterations; index += 1) {
        fn(index)
      }
      const totalMs = now() - startedAt

      return {
        name,
        totalMs: round(totalMs),
        iterations,
        msPerIteration: round(totalMs / iterations),
        budgetMsPerIteration,
      }
    }

    const update = createEvent<number>()
    const $source = createStore(0).on(update, (_, value) => value)
    const $mapped = $source.map(value => value + 1)
    const $combined = combine({source: $source, mapped: $mapped})
    const sampled = sample({source: $combined, clock: update})

    let observed = 0
    $combined.watch(value => {
      observed += value.mapped
    })
    sampled.watch(value => {
      observed += value.source
    })

    const updateResult = runBenchmark(
      'event-to-store graph update',
      1000,
      10,
      index => {
        update(index)
      },
    )

    const graphResult = runBenchmark('store graph creation', 25, 80, index => {
      const source = createStore(index)
      const next = source.map(value => value + 1)
      const combined = combine([source, next], list => list[0] + list[1])
      combined.watch(() => {})
    })

    return {observed, results: [updateResult, graphResult]}
  })

  expect(results.observed).toBeGreaterThan(0)
  for (const result of results.results) {
    expect(result.totalMs).toBeGreaterThanOrEqual(0)
    expect(result.msPerIteration).toBeLessThanOrEqual(
      result.budgetMsPerIteration,
    )
  }

  console.log(
    `[${browser.capabilities.browserName || browser.capabilities.deviceName}]`,
    results.results,
  )
})

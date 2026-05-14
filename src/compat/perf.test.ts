import {combine, createEvent, createStore, sample, split, guard} from 'effector'

declare const initBrowser: () => Promise<void>
declare const browser: any
declare const execFunc: <T>(cb: () => Promise<T> | T) => Promise<T>

type PerfResult = {
  name: string
  totalMs: number
  iterations: number
  msPerIteration: number
  budgetMsPerIteration: number
  rounds: number[]
}

type DeviceSummary = {
  label: string
  isLegacy: boolean
}

const round = (value: number) => Math.round(value * 1000) / 1000

const getDeviceSummary = (): DeviceSummary => {
  const capabilities = browser.capabilities || {}
  const browserName = String(capabilities.browserName || '').toLowerCase()
  const browserVersion = Number(capabilities.browserVersion || 0)
  const deviceName = String(
    capabilities['bstack:options']?.deviceName || capabilities.deviceName || '',
  ).toLowerCase()
  const isLegacyBrowser =
    browserName === 'ie' ||
    (browserName === 'chrome' && browserVersion > 0 && browserVersion <= 50)
  const isLegacyDevice = deviceName.includes('iphone xs')

  return {
    label:
      capabilities.browserName ||
      capabilities.deviceName ||
      capabilities['bstack:options']?.deviceName ||
      'unknown-device',
    isLegacy: isLegacyBrowser || isLegacyDevice,
  }
}

beforeEach(async () => {
  await initBrowser()
}, 10e3)

test('performance budget on real devices', async () => {
  const device = getDeviceSummary()

  const perfPayload = await execFunc(async () => {
    function now() {
      if (typeof performance !== 'undefined' && performance.now) {
        return performance.now()
      }
      return Date.now()
    }

    function median(values: number[]) {
      const ordered = [...values].sort((a, b) => a - b)
      const middle = Math.floor(ordered.length / 2)
      if (ordered.length % 2 === 0) {
        return (ordered[middle - 1] + ordered[middle]) / 2
      }
      return ordered[middle]
    }

    function runBenchmark(
      name: string,
      iterations: number,
      budgetMsPerIteration: number,
      fn: (index: number) => void,
    ): PerfResult {
      const rounds = [] as number[]

      for (let warmup = 0; warmup < 20; warmup += 1) {
        fn(warmup)
      }

      for (let roundIndex = 0; roundIndex < 5; roundIndex += 1) {
        const startedAt = now()
        for (let iteration = 0; iteration < iterations; iteration += 1) {
          fn(iteration)
        }
        rounds.push(now() - startedAt)
      }

      const stableRounds = rounds.slice(1)
      const totalMs = median(stableRounds)
      return {
        name,
        totalMs: round(totalMs),
        iterations,
        msPerIteration: round(totalMs / iterations),
        budgetMsPerIteration,
        rounds: stableRounds.map(round),
      }
    }

    const update = createEvent<number>()
    const $source = createStore(0).on(update, (_, value) => value)
    const $mapped = $source.map(value => value + 1)
    const $combined = combine({source: $source, mapped: $mapped})
    const sampled = sample({source: $combined, clock: update})

    const trigger = createEvent<{type: 'a' | 'b'; value: number}>()
    const triggerGuard = guard({
      source: trigger,
      filter: ({value}) => value % 2 === 0,
    })
    const caseA = createEvent<{type: 'a' | 'b'; value: number}>()
    const caseB = createEvent<{type: 'a' | 'b'; value: number}>()
    split({
      source: triggerGuard,
      match: event => event.type,
      cases: {
        a: caseA,
        __: caseB,
      },
    })

    let observed = 0
    $combined.watch(value => {
      observed += value.mapped
    })
    sampled.watch(value => {
      observed += value.source
    })
    caseA.watch(({value}) => {
      observed += value
    })
    caseB.watch(({value}) => {
      observed += value
    })

    const updateResult = runBenchmark(
      'event-to-store graph update',
      1000,
      12,
      index => {
        update(index)
      },
    )

    const graphResult = runBenchmark('store graph creation', 25, 90, index => {
      const source = createStore(index)
      const next = source.map(value => value + 1)
      const combined = combine([source, next], list => list[0] + list[1])
      combined.watch(() => {})
    })

    const splitResult = runBenchmark(
      'guard/split event routing',
      600,
      12,
      index => {
        trigger({type: index % 3 === 0 ? 'a' : 'b', value: index})
      },
    )

    return {observed, results: [updateResult, graphResult, splitResult]}
  })

  expect(perfPayload.observed).toBeGreaterThan(0)
  const legacyMultiplier = device.isLegacy ? 1.5 : 1
  for (const result of perfPayload.results) {
    expect(result.totalMs).toBeGreaterThanOrEqual(0)
    expect(result.rounds.length).toBe(4)
    expect(result.msPerIteration).toBeLessThanOrEqual(
      round(result.budgetMsPerIteration * legacyMultiplier),
    )
  }

  console.log(
    `[${device.label}] legacy=${device.isLegacy}`,
    perfPayload.results,
  )
})

import type {Store} from 'effector'
import {combine, createEvent, createStore, guard, sample, split} from 'effector'

declare const initBrowser: () => Promise<void>
declare const browser: any
declare const execFunc: <T>(cb: () => Promise<T> | T) => Promise<T>

type PerfResult = {
  name: string
  iterations: number
  medianMs: number
  p90Ms: number
  msPerIteration: number
  budgetMsPerIteration: number
  rounds: number[]
  observed: number
}

type BrowserProfile = {
  label: string
  budgetMultiplier: number
}

const round = (value: number) => Math.round(value * 1000) / 1000

const getBrowserProfile = (): BrowserProfile => {
  const capabilities = browser.capabilities || {}
  const options = capabilities['bstack:options'] || {}
  const browserName = String(capabilities.browserName || '').toLowerCase()
  const browserVersion = Number(capabilities.browserVersion || 0)
  const deviceName = String(
    options.deviceName || capabilities.deviceName || '',
  ).toLowerCase()
  const label =
    options.deviceName ||
    capabilities.deviceName ||
    capabilities.browserName ||
    capabilities.browserVersion ||
    'browserstack-device'

  const isLegacyBrowser =
    browserName === 'ie' ||
    (browserName === 'chrome' && browserVersion > 0 && browserVersion <= 50)
  const isRealMobile =
    options.realMobile === 'true' ||
    options.realMobile === true ||
    deviceName.includes('iphone') ||
    deviceName.includes('android')

  return {
    label: String(label),
    budgetMultiplier: isLegacyBrowser || isRealMobile ? 2 : 1,
  }
}

beforeEach(async () => {
  await initBrowser()
}, 10e3)

test('performance budget on real devices', async () => {
  const profile = getBrowserProfile()
  const report = await execFunc(async () => {
    function now() {
      if (typeof performance !== 'undefined' && performance.now) {
        return performance.now()
      }
      return Date.now()
    }

    function round(value: number) {
      return Math.round(value * 1000) / 1000
    }

    function sortNumber(values: number[]) {
      return values.slice().sort((left, right) => left - right)
    }

    function percentile(values: number[], percentileIndex: number) {
      const ordered = sortNumber(values)
      const index = Math.min(
        ordered.length - 1,
        Math.floor((ordered.length - 1) * percentileIndex),
      )
      return ordered[index]
    }

    function median(values: number[]) {
      const ordered = sortNumber(values)
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
      fn: (iteration: number) => number,
    ): PerfResult {
      let observed = 0
      const rounds = [] as number[]

      for (let warmup = 0; warmup < Math.min(iterations, 50); warmup += 1) {
        observed += fn(warmup)
      }

      for (let roundIndex = 0; roundIndex < 7; roundIndex += 1) {
        const startedAt = now()
        for (let iteration = 0; iteration < iterations; iteration += 1) {
          observed += fn(iteration)
        }
        rounds.push(now() - startedAt)
      }

      const stableRounds = sortNumber(rounds).slice(1, -1)
      const medianMs = median(stableRounds)
      return {
        name,
        iterations,
        medianMs: round(medianMs),
        p90Ms: round(percentile(rounds, 0.9)),
        msPerIteration: round(medianMs / iterations),
        budgetMsPerIteration,
        rounds: rounds.map(round),
        observed,
      }
    }

    const update = createEvent<number>()
    const $source = createStore(0).on(update, (_, value) => value)
    const fanout = [] as Store<number>[]

    for (let index = 0; index < 16; index += 1) {
      fanout.push($source.map(value => value + index))
    }

    const $combinedFanout = combine(fanout, values =>
      values.reduce((sum, value) => sum + value, 0),
    )
    const fanoutSample = sample({source: $combinedFanout, clock: update})
    let fanoutObserved = 0

    $combinedFanout.watch(value => {
      fanoutObserved += value
    })
    fanoutSample.watch(value => {
      fanoutObserved += value
    })

    const routed = createEvent<{type: 'left' | 'right'; value: number}>()
    const evenRouted = guard({
      source: routed,
      filter: ({value}) => value % 2 === 0,
    })
    const left = createEvent<{type: 'left' | 'right'; value: number}>()
    const right = createEvent<{type: 'left' | 'right'; value: number}>()
    let routedObserved = 0

    split({
      source: evenRouted,
      match: event => event.type,
      cases: {
        left,
        __: right,
      },
    })
    left.watch(({value}) => {
      routedObserved += value
    })
    right.watch(({value}) => {
      routedObserved += value
    })

    const updateResult = runBenchmark(
      'store fanout update',
      1200,
      12,
      iteration => {
        update(iteration)
        return fanoutObserved
      },
    )

    const graphResult = runBenchmark(
      'derived graph creation',
      40,
      100,
      iteration => {
        const graphUpdate = createEvent<number>()
        const $base = createStore(iteration).on(
          graphUpdate,
          (_, value) => value,
        )
        const $next = $base.map(value => value + 1)
        const $sum = combine($base, $next, (base, next) => base + next)
        let value = 0

        $sum.watch(nextValue => {
          value += nextValue
        })
        graphUpdate(iteration + 1)
        return value
      },
    )

    const routingResult = runBenchmark(
      'guard and split routing',
      900,
      12,
      iteration => {
        routed({
          type: iteration % 3 === 0 ? 'left' : 'right',
          value: iteration,
        })
        return routedObserved
      },
    )

    return {
      results: [updateResult, graphResult, routingResult],
    }
  })

  const budgetFailures = [] as Array<{
    name: string
    msPerIteration: number
    budget: number
    medianMs: number
    p90Ms: number
    rounds: number[]
  }>

  for (const result of report.results) {
    const budget = round(result.budgetMsPerIteration * profile.budgetMultiplier)

    expect(result.observed).not.toBe(0)
    expect(result.rounds.length).toBe(7)
    expect(result.medianMs).toBeGreaterThanOrEqual(0)
    expect(result.p90Ms).toBeGreaterThanOrEqual(result.medianMs)

    if (result.msPerIteration > budget) {
      budgetFailures.push({
        name: result.name,
        msPerIteration: result.msPerIteration,
        budget,
        medianMs: result.medianMs,
        p90Ms: result.p90Ms,
        rounds: result.rounds,
      })
    }
  }

  expect(budgetFailures).toEqual([])

  console.log(
    `[${profile.label}] budgetMultiplier=${profile.budgetMultiplier}`,
    report.results,
  )
})

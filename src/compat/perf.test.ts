import type {BrowserObject} from 'webdriverio'

declare const initBrowser: () => Promise<void>
declare const browser: BrowserObject
declare const execFunc: <T>(cb: () => Promise<T> | T) => Promise<T>

const budgetMultiplier = Number(process.env.PERF_BUDGET_MULTIPLIER) || 1
const calibrate = process.env.PERF_CALIBRATE === '1'

const msPerIterationBudgets = {
  storeUpdate: 0.05,
  combineRecompute: 0.1,
  sampleStoreWatch: 0.1,
  graphCreation: 8,
  arrayReplace: 0.05,
}

const observationsMode = calibrate

type PerfResult = {
  name: string
  iterations: number
  medianMs: number
  msPerIteration: number
  budgetMsPerIteration: number
}

type PerfReport = {
  results: PerfResult[]
  failures: PerfResult[]
}

function buildBenchmarkSource(multiplier: number) {
  return `async () => {
  var budgetMultiplier = ${JSON.stringify(multiplier)}
  var budgets = ${JSON.stringify(msPerIterationBudgets)}
  function now() {
    if (typeof performance !== 'undefined' && performance.now) {
      return performance.now()
    }
    return Date.now()
  }
  function round(value) {
    return Math.round(value * 1000) / 1000
  }
  function benchmark(name, iterations, fn) {
    var warmup = iterations < 1000 ? 20 : 40
    for (var i = 0; i < warmup; i++) fn(i)
    var rounds = []
    for (var r = 0; r < 7; r++) {
      var startedAt = now()
      for (var i = 0; i < iterations; i++) fn(i)
      rounds.push(now() - startedAt)
    }
    rounds.sort(function (a, b) {
      return a - b
    })
    var medianMs = rounds[Math.floor(rounds.length / 2)]
    var meanMs = rounds.reduce(function (a, b) {
      return a + b
    }, 0) / rounds.length
    return {
      name: name,
      iterations: iterations,
      medianMs: round(medianMs),
      msPerIteration: round(meanMs / iterations),
      budgetMsPerIteration: round(budgets[name] * budgetMultiplier),
    }
  }
  var results = []
  ;(function () {
    var update = effector.createEvent()
    var store = effector.createStore(0).on(update, function (num, value) {
      return num + value
    })
    results.push(benchmark('storeUpdate', 4000, function (i) {
      return update(1)
    }))
  })()
  ;(function () {
    var first = effector.createStore(1)
    var second = effector.createStore(2)
    var third = effector.createStore(3)
    var combined = effector.combine(first, second, third, function (a, b, c) {
      return (a + b) * c
    })
    var change = effector.createEvent()
    first.on(change, function (num) {
      return num + 1
    })
    results.push(benchmark('combineRecompute', 3000, function (i) {
      return change(1)
    }))
  })()
  ;(function () {
    var source = effector.createEvent()
    var stream = effector.createStore(0).on(source, function (num, value) {
      return num + value
    })
    var target = effector.sample({
      source: source,
      fn: function (num) {
        return num * 2
      },
    })
    target.watch(function () {})
    results.push(benchmark('sampleStoreWatch', 4000, function (i) {
      return source(1)
    }))
  })()
  ;(function () {
    function makeGraph() {
      var event = effector.createEvent()
      var store = effector.createStore(0).on(event, function (num, value) {
        return num + value
      })
      var buffer = effector.createStore([])
      effector.sample({source: event, target: buffer})
      effector.combine(store, buffer, function (num, list) {
        return (num + list.length) * 2
      })
      return event
    }
    results.push(benchmark('graphCreation', 120, function () {
      return makeGraph()
    }))
  })()
  ;(function () {
    var store = effector.createStore([0])
    var replace = effector.createEvent()
    store.on(replace, function (_, payload) {
      return payload
    })
    var payload = []
    for (var i = 0; i < 1000; i++) payload.push(i)
    for (var i = 0; i < 20; i++) store.setState(payload)
    results.push(benchmark('arrayReplace', 1500, function () {
      return replace(payload)
    }))
  })()
  var failures = []
  for (var i = 0; i < results.length; i++) {
    var result = results[i]
    if (result.msPerIteration > result.budgetMsPerIteration) {
      failures.push({
        name: result.name,
        msPerIteration: result.msPerIteration,
        budgetMsPerIteration: result.budgetMsPerIteration,
        medianMs: result.medianMs,
        iterations: result.iterations,
      })
    }
  }
  return {results: results, failures: failures}
}`
}

function deviceName() {
  const capabilities: any = browser.capabilities
  const parts = [
    capabilities.browserName,
    capabilities.browserVersion,
    capabilities.platformName || capabilities.os,
  ].filter(Boolean)
  return parts.join(' ') || 'unknown device'
}

beforeEach(async () => {
  await initBrowser()
}, 10e3)

test(
  observationsMode
    ? 'performance on real devices: calibration run'
    : 'performance budget on real devices',
  async () => {
    const report = await execFunc<PerfReport>(
      buildBenchmarkSource(observationsMode ? 1e12 : budgetMultiplier) as any,
    )
    const device = deviceName()
    for (const result of report.results) {
      console.log(
        `[compat/perf:${device}] ${result.name} ` +
          `median=${result.medianMs}ms ` +
          `msPerIteration=${result.msPerIteration}ms ` +
          `budget=${result.budgetMsPerIteration}ms`,
      )
    }
    if (observationsMode) {
      console.log(
        `[compat/perf:${device}] calibration run: budgets disabled, ` +
          `use the measured msPerIteration values to calibrate budget numbers`,
      )
      return
    }
    expect(report.failures).toEqual([])
  },
)
import type {BrowserObject} from 'webdriverio'

declare const initBrowser: () => Promise<void>
declare const browser: BrowserObject
declare const execFunc: <T>(cb: (() => Promise<T> | T) | string) => Promise<T>

const configuredMultiplier = Number(process.env.PERF_RATIO_MULTIPLIER)
const ratioMultiplier =
  Number.isFinite(configuredMultiplier) && configuredMultiplier > 0
    ? configuredMultiplier
    : 1

const ratioBudgets = {
  eventStore: 80,
  combine: 120,
  arrayReplace: 80,
}

type PerfRow = {
  name: keyof typeof ratioBudgets
  iterations: number
  controlMedianMs: number
  workloadMedianMs: number
  ratio: number
  budget: number
}

type PerfReport = {
  rows: PerfRow[]
  integrity: {
    eventSeq: number
    eventState: number
    eventSeen: number
    eventControlCount: number
    eventControlChecksum: number
    combineSeq: number
    combineState: number
    combineSeen: number
    combineControlCount: number
    combineControlChecksum: number
    arraySeq: number
    arrayState: number
    arraySeen: number
    arrayControlCount: number
    arrayControlChecksum: number
  }
}

function buildBenchmarkSource(multiplier: number) {
  const budgets = {
    eventStore: ratioBudgets.eventStore * multiplier,
    combine: ratioBudgets.combine * multiplier,
    arrayReplace: ratioBudgets.arrayReplace * multiplier,
  }

  return [
    'async () => {',
    '  var budgets = ' + JSON.stringify(budgets),
    '  function now() {',
    "    if (typeof performance !== 'undefined' && performance.now) {",
    '      return performance.now()',
    '    }',
    '    return Date.now()',
    '  }',
    '  function median(values) {',
    '    var copy = values.slice().sort(function (a, b) { return a - b })',
    '    return copy[Math.floor(copy.length / 2)]',
    '  }',
    '  function round(value) {',
    '    return Math.round(value * 1000) / 1000',
    '  }',
    '  function measure(fn, iterations) {',
    '    var startedAt = now()',
    '    for (var i = 0; i < iterations; i++) fn(i)',
    '    return now() - startedAt',
    '  }',
    '  function chooseIterations(control, start, max) {',
    '    var iterations = start',
    '    while (true) {',
    '      var elapsed = measure(control, iterations)',
    '      if (elapsed >= 4 || iterations >= max) return iterations',
    '      iterations = Math.min(iterations * 2, max)',
    '    }',
    '  }',
    '  function pairedBenchmark(name, control, workload, start, max) {',
    '    var iterations = chooseIterations(control, start, max)',
    '    var warmup = Math.min(iterations, 100)',
    '    for (var i = 0; i < warmup; i++) workload(i)',
    '    var controlTimes = []',
    '    var workloadTimes = []',
    '    var ratios = []',
    '    for (var roundIndex = 0; roundIndex < 5; roundIndex++) {',
    '      var controlMs',
    '      var workloadMs',
    '      if (roundIndex % 2 === 0) {',
    '        controlMs = measure(control, iterations)',
    '        workloadMs = measure(workload, iterations)',
    '      } else {',
    '        workloadMs = measure(workload, iterations)',
    '        controlMs = measure(control, iterations)',
    '      }',
    '      controlTimes.push(controlMs)',
    '      workloadTimes.push(workloadMs)',
    '      ratios.push(workloadMs / Math.max(controlMs, 0.1))',
    '    }',
    '    return {',
    '      name: name,',
    '      iterations: iterations,',
    '      controlMedianMs: round(median(controlTimes)),',
    '      workloadMedianMs: round(median(workloadTimes)),',
    '      ratio: round(median(ratios)),',
    '      budget: budgets[name],',
    '    }',
    '  }',
    '',
    '  var eventControlState = 0',
    '  var eventControlChecksum = 0',
    '  var eventSeq = 0',
    '  var eventSeen = 0',
    '  var event = effector.createEvent()',
    '  var eventStore = effector.createStore(-1).on(event, function (_, value) {',
    '    return value',
    '  })',
    '  var eventMapped = eventStore.map(function (value) { return value + 1 })',
    '  eventMapped.watch(function (value) { eventSeen += 1; eventControlChecksum ^= value })',
    '  var eventRow = pairedBenchmark(',
    "    'eventStore',",
    '    function () {',
    '      eventControlState += 1',
    '      eventControlChecksum ^= eventControlState + 1',
    '    },',
    '    function () {',
    '      eventSeq += 1',
    '      event(eventSeq)',
    '    },',
    '    2048,',
    '    131072',
    '  )',
    '',
    '  var combineControlA = 0',
    '  var combineControlB = 1',
    '  var combineControlChecksum = 0',
    '  var combineSeq = 0',
    '  var combineSeen = 0',
    '  var combineTick = effector.createEvent()',
    '  var combineSource = effector.createStore(0).on(combineTick, function (value) {',
    '    return value + 1',
    '  })',
    '  var combineMapped = combineSource.map(function (value) { return value + 1 })',
    '  var combined = effector.combine(combineSource, combineMapped, function (a, b) {',
    '    return a + b',
    '  })',
    '  combined.watch(function (value) { combineSeen += 1; combineControlChecksum ^= value })',
    '  var combineRow = pairedBenchmark(',
    "    'combine',",
    '    function () {',
    '      combineControlA += 1',
    '      combineControlB = combineControlA + 1',
    '      combineControlChecksum ^= combineControlA + combineControlB',
    '    },',
    '    function () {',
    '      combineSeq += 1',
    '      combineTick()',
    '    },',
    '    2048,',
    '    131072',
    '  )',
    '',
    '  var arrayControlSeq = 0',
    '  var arrayControlChecksum = 0',
    '  var arraySeq = 0',
    '  var arraySeen = 0',
    '  var replace = effector.createEvent()',
    '  var arrayStore = effector.createStore([0, 1, 2, 3]).on(',
    '    replace,',
    '    function (_, payload) { return payload },',
    '  )',
    '  arrayStore.watch(function (value) { arraySeen += 1; arrayControlChecksum ^= value[0] })',
    '  var arrayRow = pairedBenchmark(',
    "    'arrayReplace',",
    '    function () {',
    '      arrayControlSeq += 1',
    '      var next = [arrayControlSeq, arrayControlSeq + 1, arrayControlSeq + 2, arrayControlSeq + 3]',
    '      arrayControlChecksum ^= next[0]',
    '    },',
    '    function () {',
    '      arraySeq += 1',
    '      replace([arraySeq, arraySeq + 1, arraySeq + 2, arraySeq + 3])',
    '    },',
    '    1024,',
    '    65536',
    '  )',
    '',
    '  return {',
    '    rows: [eventRow, combineRow, arrayRow],',
    '    integrity: {',
    '      eventSeq: eventSeq,',
    '      eventState: eventStore.getState(),',
    '      eventSeen: eventSeen,',
    '      eventControlCount: eventControlState,',
    '      eventControlChecksum: eventControlChecksum,',
    '      combineSeq: combineSeq,',
    '      combineState: combineSource.getState(),',
    '      combineSeen: combineSeen,',
    '      combineControlCount: combineControlA,',
    '      combineControlChecksum: combineControlChecksum,',
    '      arraySeq: arraySeq,',
    '      arrayState: arrayStore.getState()[0],',
    '      arraySeen: arraySeen,',
    '      arrayControlCount: arrayControlSeq,',
    '      arrayControlChecksum: arrayControlChecksum,',
    '    },',
    '  }',
    '}',
  ].join('\n')
}

function deviceName() {
  const capabilities: any = browser.capabilities
  return (
    [
      capabilities.deviceName,
      capabilities.browserName,
      capabilities.browserVersion,
      capabilities.platformName || capabilities.os,
    ]
      .filter(Boolean)
      .join(' ') || 'unknown device'
  )
}

beforeEach(async () => {
  await initBrowser()
}, 10e3)

test('performance ratios stay within budget on real devices', async () => {
  const report = await execFunc<PerfReport>(
    buildBenchmarkSource(ratioMultiplier),
  )

  expect(report.integrity.eventState).toBe(report.integrity.eventSeq)
  expect(report.integrity.eventSeen).toBe(report.integrity.eventSeq + 1)
  expect(report.integrity.combineState).toBe(report.integrity.combineSeq)
  expect(report.integrity.combineSeen).toBe(report.integrity.combineSeq + 1)
  expect(report.integrity.arrayState).toBe(report.integrity.arraySeq)
  expect(report.integrity.arraySeen).toBe(report.integrity.arraySeq + 1)

  // Control loops are observable in the remote result, so JITs cannot
  // discard their bookkeeping as dead code before measuring the ratios.
  for (const [row, count, checksum] of [
    [report.rows[0], report.integrity.eventControlCount, report.integrity.eventControlChecksum],
    [report.rows[1], report.integrity.combineControlCount, report.integrity.combineControlChecksum],
    [report.rows[2], report.integrity.arrayControlCount, report.integrity.arrayControlChecksum],
  ] as Array<[PerfRow, number, number]>) {
    expect(count).toBeGreaterThanOrEqual(row.iterations * 5)
    expect(Number.isFinite(checksum)).toBe(true)
  }

  const device = deviceName()
  console.log(
    '[compat/perf] ' +
      JSON.stringify({
        device,
        ratioMultiplier,
        rows: report.rows,
      }),
  )

  const failures = report.rows.filter(row => row.ratio > row.budget)
  expect(failures).toEqual([])
})

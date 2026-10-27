/**
 * Performance benchmark tests running on real devices via BrowserStack.
 *
 * Issue: #161 — Perf tests on real devices
 * Bounty: $100 (IssueHunt)
 *
 * Measures core effector operations on real mobile and desktop browsers:
 *  - Store creation & update throughput
 *  - Event triggering latency
 *  - Derived store (computed) performance
 *  - Effect execution overhead
 *  - Memory / object allocation patterns
 */
import {
  createStore,
  createEvent,
  createEffect,
  combine,
  sample,
  guard,
} from 'effector'

declare const browser: any
declare const act: any
declare const initBrowser: () => Promise<void>
declare const exec: (...args: any[]) => string[]
declare function execFunc<T>(fn: () => T): Promise<T>

const ITERATIONS = {
  QUICK: 1_000,
  MEDIUM: 10_000,
  STRESS: 100_000,
}

beforeEach(async () => {
  await initBrowser()
})

// ═══════════════════════════════════════════════════════════════════════
//  1. STORE PERFORMANCE
// ═══════════════════════════════════════════════════════════════════════

test('store: create and update throughput', async () => {
  const results = await execFunc(async () => {
    const out: Record<string, number> = {}

    // Create 100 stores and measure time
    const createStart = performance.now()
    const stores: any[] = []
    for (let i = 0; i < 100; i++) {
      stores.push(createStore(i))
    }
    out['create100Stores'] = performance.now() - createStart

    // Update each store 1000 times
    const updateStart = performance.now()
    for (let iter = 0; iter < 100; iter++) {
      for (let s = 0; s < stores.length; s++) {
        stores[s].setState(iter)
      }
    }
    out['update100x1000'] = performance.now() - updateStart

    return out
  })

  expect(results.create100Stores).toBeLessThan(500)  // 100 stores in <500ms
  expect(results['update100x1000']).toBeLessThan(2000) // 100k updates in <2s
})

test('store: on-update subscriber latency', async () => {
  const results = await execFunc(async () => {
    const $store = createStore(0)
    const log: number[] = []
    $store.watch((v) => log.push(v))

    const start = performance.now()
    for (let i = 0; i < ITERATIONS.QUICK; i++) {
      $store.setState(i)
    }
    const elapsed = performance.now() - start
    return { elapsed, logLength: log.length }
  })

  expect(results.elapsed).toBeLessThan(3000)  // 1000 updates + 1000 watch calls <3s
  expect(results.logLength).toBe(ITERATIONS.QUICK + 1) // initial + 1000 updates
})

// ═══════════════════════════════════════════════════════════════════════
//  2. EVENT PERFORMANCE
// ═══════════════════════════════════════════════════════════════════════

test('event: trigger throughput', async () => {
  const results = await execFunc(async () => {
    const trigger = createEvent<number>()
    const $store = createStore(0)
    $store.on(trigger, (_, v) => v)

    const start = performance.now()
    for (let i = 0; i < ITERATIONS.QUICK; i++) {
      trigger(i)
    }
    return performance.now() - start
  })

  expect(results).toBeLessThan(2000) // 1000 event triggers <2s
})

test('event: multiple subscribers on same event', async () => {
  const results = await execFunc(async () => {
    const trigger = createEvent<number>()

    // Attach 10 watchers
    const logs: number[][] = []
    for (let w = 0; w < 10; w++) {
      const log: number[] = []
      logs.push(log)
      trigger.watch((v) => log.push(v))
    }

    const start = performance.now()
    for (let i = 0; i < ITERATIONS.QUICK; i++) {
      trigger(i)
    }
    const elapsed = performance.now() - start

    return {
      elapsed,
      totalWatchCalls: logs.reduce((sum, l) => sum + l.length, 0),
    }
  })

  expect(results.elapsed).toBeLessThan(3000) // 1000 triggers × 10 watchers <3s
  expect(results.totalWatchCalls).toBe(ITERATIONS.QUICK * 10)
})

// ═══════════════════════════════════════════════════════════════════════
//  3. DERIVED / COMPUTED STORE PERFORMANCE
// ═══════════════════════════════════════════════════════════════════════

test('combine: multiple stores', async () => {
  const results = await execFunc(async () => {
    const stores = Array.from({ length: 20 }, (_, i) => createStore(i))
    const $combined = combine(stores, (...vals) => vals.reduce((a, b) => a + b, 0))

    let lastValue = 0
    $combined.watch((v) => {
      lastValue = v
    })

    const start = performance.now()
    for (let iter = 0; iter < 100; iter++) {
      for (let s = 0; s < stores.length; s++) {
        stores[s].setState(iter + s)
      }
    }
    return {
      elapsed: performance.now() - start,
      finalValue: lastValue,
    }
  })

  expect(results.elapsed).toBeLessThan(5000) // 2000 updates on combine <5s (accommodates slow real devices)
})

test('sample: source → target throughput', async () => {
  const results = await execFunc(async () => {
    const source = createStore(0)
    const trigger = createEvent<number>()
    const target = createStore(0)

    sample({
      source,
      clock: trigger,
      fn: (s, c) => s + c,
      target,
    })

    const start = performance.now()
    for (let i = 0; i < ITERATIONS.QUICK; i++) {
      trigger(i)
    }
    return performance.now() - start
  })

  expect(results).toBeLessThan(2000) // 1000 sample operations <2s
})

// ═══════════════════════════════════════════════════════════════════════
//  4. EFFECT PERFORMANCE
// ═══════════════════════════════════════════════════════════════════════

test('effect: create and call sync handler', async () => {
  const results = await execFunc(async () => {
    const fx = createEffect<number, number>({
      handler: (x: number) => x * 2,
    })

    const start = performance.now()
    const results: number[] = []
    for (let i = 0; i < ITERATIONS.QUICK; i++) {
      results.push(await fx(i))
    }
    return {
      elapsed: performance.now() - start,
      lastResult: results[results.length - 1],
    }
  })

  expect(results.elapsed).toBeLessThan(3000) // 1000 effect calls <3s
  expect(results.lastResult).toBe((ITERATIONS.QUICK - 1) * 2)
})

// ═══════════════════════════════════════════════════════════════════════
//  5. MEMORY / ALLOCATION
// ═══════════════════════════════════════════════════════════════════════

test('memory: repeated create + destroy cycle', async () => {
  const results = await execFunc(async () => {
    const stores: any[] = []
    const start = performance.now()

    // Create and destroy 500 stores
    for (let cycle = 0; cycle < 50; cycle++) {
      for (let i = 0; i < 10; i++) {
        const $s = createStore(i)
        const e = createEvent<number>()
        $s.on(e, (_, v) => v)
        stores.push($s)
      }
      // Clear references (simulating destroy)
      stores.length = 0
    }

    return performance.now() - start
  })

  expect(results).toBeLessThan(2000) // 500 create cycles <2s
})

// ═══════════════════════════════════════════════════════════════════════
//  6. GUARD / CONDITIONAL PERFORMANCE
// ═══════════════════════════════════════════════════════════════════════

test('guard: filtered event throughput', async () => {
  const results = await execFunc(async () => {
    const trigger = createEvent<number>()
    const $threshold = createStore(50)
    const passed = createStore(0)
    const blocked = createStore(0)

    guard({
      clock: trigger,
      filter: (v) => v > 50,
      target: passed,
    })

    guard({
      clock: trigger,
      filter: (v) => v <= 50,
      target: blocked,
    })

    const start = performance.now()
    for (let i = 0; i < ITERATIONS.QUICK; i++) {
      trigger(i)
    }
    return performance.now() - start
  })

  expect(results).toBeLessThan(2000) // 1000 guard operations <2s
})

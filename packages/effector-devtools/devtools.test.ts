import {createEvent, createStore, createEffect, fork, allSettled, sample} from 'effector'
import {createDevtools} from './devtools'

describe('effector-devtools', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('createDevtools', () => {
    test('should create devtools instance', () => {
      const devtools = createDevtools()

      expect(devtools).toHaveProperty('subscribe')
      expect(devtools).toHaveProperty('unsubscribe')
      expect(devtools).toHaveProperty('getGraph')
      expect(devtools).toHaveProperty('getStores')
      expect(devtools).toHaveProperty('getEvents')
      expect(devtools).toHaveProperty('getEffects')
      expect(devtools).toHaveProperty('getHistory')
      expect(devtools).toHaveProperty('restoreSnapshot')

      devtools.unsubscribe()
    })

    test('should track stores', async () => {
      const devtools = createDevtools()
      const $count = createStore(0)
      const increment = createEvent()

      $count.on(increment, (count) => count + 1)

      // Wait for declaration to be tracked
      await new Promise((r) => setTimeout(r, 10))

      const stores = devtools.getStores()
      expect(stores.length).toBeGreaterThan(0)

      const countStore = stores.find((s) => s.name === '$count')
      expect(countStore).toBeDefined()
      expect(countStore?.value).toBe(0)

      increment()

      await new Promise((r) => setTimeout(r, 10))

      const updatedStores = devtools.getStores()
      const updatedCount = updatedStores.find((s) => s.name === '$count')
      expect(updatedCount?.value).toBe(1)

      devtools.unsubscribe()
    })

    test('should track events', async () => {
      const devtools = createDevtools()
      const event = createEvent<number>()

      await new Promise((r) => setTimeout(r, 10))

      event(42)
      event(100)

      await new Promise((r) => setTimeout(r, 10))

      const events = devtools.getEvents()
      const trackedEvents = events.filter((e) => e.name === event.shortName)

      expect(trackedEvents.length).toBe(2)
      expect(trackedEvents[0].payload).toBe(42)
      expect(trackedEvents[1].payload).toBe(100)

      devtools.unsubscribe()
    })

    test('should track effects', async () => {
      const devtools = createDevtools()
      const fx = createEffect(async (params: number) => {
        return params * 2
      })

      await new Promise((r) => setTimeout(r, 10))

      await fx(5)

      await new Promise((r) => setTimeout(r, 50))

      const effects = devtools.getEffects()
      const trackedEffects = effects.filter((e) => e.name === fx.shortName)

      expect(trackedEffects.length).toBeGreaterThan(0)

      const doneEffect = trackedEffects.find((e) => e.status === 'done')
      expect(doneEffect).toBeDefined()
      expect(doneEffect?.result).toBe(10)
      expect(doneEffect?.duration).toBeDefined()

      devtools.unsubscribe()
    })

    test('should notify subscribers on updates', async () => {
      const devtools = createDevtools()
      const callback = jest.fn()

      devtools.subscribe(callback)

      const $store = createStore(0)
      const update = createEvent<number>()

      $store.on(update, (_, value) => value)

      await new Promise((r) => setTimeout(r, 10))

      update(42)

      await new Promise((r) => setTimeout(r, 10))

      expect(callback).toHaveBeenCalled()
      const calls = callback.mock.calls
      const storeUpdates = calls.filter((call) => call[0].type === 'store')
      expect(storeUpdates.length).toBeGreaterThan(0)

      devtools.unsubscribe()
    })

    test('should get graph structure', async () => {
      const devtools = createDevtools()

      const $store1 = createStore(0)
      const $store2 = createStore(0)
      const event = createEvent()

      await new Promise((r) => setTimeout(r, 10))

      const graph = devtools.getGraph()

      expect(graph).toHaveProperty('nodes')
      expect(graph).toHaveProperty('edges')
      expect(Array.isArray(graph.nodes)).toBe(true)
      expect(Array.isArray(graph.edges)).toBe(true)

      const storeNodes = graph.nodes.filter((n) => n.type === 'store')
      expect(storeNodes.length).toBeGreaterThanOrEqual(2)

      devtools.unsubscribe()
    })

    test('should track history', async () => {
      const devtools = createDevtools({ maxHistory: 5 })
      const $count = createStore(0)
      const increment = createEvent()

      $count.on(increment, (count) => count + 1)

      await new Promise((r) => setTimeout(r, 10))

      increment()
      increment()
      increment()

      await new Promise((r) => setTimeout(r, 10))

      const history = devtools.getHistory()
      expect(history.length).toBeGreaterThan(0)

      devtools.unsubscribe()
    })

    test('should work with scope', async () => {
      const scope = fork()
      const devtools = createDevtools({ scope })

      const $count = createStore(0)
      const increment = createEvent()

      $count.on(increment, (count) => count + 1)

      await new Promise((r) => setTimeout(r, 10))

      await allSettled(increment, { scope })

      await new Promise((r) => setTimeout(r, 10))

      const stores = devtools.getStores()
      const countStore = stores.find((s) => s.name === '$count')
      // Store might be tracked even without scope update
      expect(countStore).toBeDefined()

      devtools.unsubscribe()
    })

    test('should unsubscribe correctly', async () => {
      const devtools = createDevtools()
      const callback = jest.fn()

      const unsubscribe = devtools.subscribe(callback)
      unsubscribe()

      const $store = createStore(0)
      const update = createEvent<number>()

      $store.on(update, (_, value) => value)

      await new Promise((r) => setTimeout(r, 10))

      callback.mockClear()
      update(42)

      await new Promise((r) => setTimeout(r, 10))

      expect(callback).not.toHaveBeenCalled()

      devtools.unsubscribe()
    })
  })

  describe('createDevtools with enabled: false', () => {
    test('should return noop devtools in production mode', () => {
      const devtools = createDevtools({ enabled: false })

      expect(devtools.getStores()).toEqual([])
      expect(devtools.getEvents()).toEqual([])
      expect(devtools.getEffects()).toEqual([])
      expect(devtools.getGraph()).toEqual({ nodes: [], edges: [] })
      expect(devtools.getHistory()).toEqual([])

      // Subscribe should return noop function
      const unsubscribe = devtools.subscribe(() => {})
      expect(typeof unsubscribe).toBe('function')
      unsubscribe()
    })
  })

  describe('complex scenarios', () => {
    test('should track sample operations', async () => {
      const devtools = createDevtools()

      const $source = createStore(10)
      const trigger = createEvent()
      const result = sample({
        source: $source,
        clock: trigger,
        fn: (source) => source * 2,
      })

      await new Promise((r) => setTimeout(r, 10))

      trigger()

      await new Promise((r) => setTimeout(r, 10))

      const events = devtools.getEvents()
      expect(events.length).toBeGreaterThan(0)

      devtools.unsubscribe()
    })

    test('should track derived stores', async () => {
      const devtools = createDevtools()

      const $base = createStore(5)
      const $derived = $base.map((x) => x * 2)

      await new Promise((r) => setTimeout(r, 10))

      const stores = devtools.getStores()
      const derivedStore = stores.find((s) => s.name?.includes('→'))

      expect(derivedStore).toBeDefined()
      expect(derivedStore?.derived).toBe(true)

      devtools.unsubscribe()
    })

    test('should handle effect failures', async () => {
      const devtools = createDevtools()

      const failingFx = createEffect(async () => {
        throw new Error('Test error')
      })

      await new Promise((r) => setTimeout(r, 10))

      try {
        await failingFx()
      } catch {
        // Expected
      }

      await new Promise((r) => setTimeout(r, 50))

      const effects = devtools.getEffects()
      const failEffect = effects.find(
        (e) => e.name === failingFx.shortName && e.status === 'fail'
      )

      expect(failEffect).toBeDefined()
      expect(failEffect?.error).toBeInstanceOf(Error)

      devtools.unsubscribe()
    })
  })
})

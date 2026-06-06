declare const initBrowser: () => Promise<void>
declare const execFunc: <T>(cb: () => Promise<T> | T) => Promise<T>
declare const effector: any

type PerfMeasure = {
  name: string
  duration: number
  iterations: number
  msPerIteration: number
}

const eventPropagationBudget = 2
const derivedGraphBudget = 10

beforeEach(async () => {
  await initBrowser()
}, 10e3)

test('event propagation stays within performance budget', async () => {
  const result = await execFunc<PerfMeasure>(() => {
    const {createEvent, createStore} = effector
    const now = () =>
      typeof performance !== 'undefined' && performance.now
        ? performance.now()
        : Date.now()
    const increment = createEvent()
    const $count = createStore(0).on(increment, value => value + 1)
    const warmTimes = 100
    const iterations = 2000
    let updates = 0

    $count.watch(() => {
      updates += 1
    })

    for (let index = 0; index < warmTimes; index += 1) {
      increment()
    }

    updates = 0
    const start = now()

    for (let index = 0; index < iterations; index += 1) {
      increment()
    }

    const duration = now() - start

    if ($count.getState() !== warmTimes + iterations) {
      throw Error('unexpected store state after performance test')
    }
    if (updates !== iterations) {
      throw Error('unexpected update count after performance test')
    }

    return {
      name: 'event propagation',
      duration,
      iterations,
      msPerIteration: duration / iterations,
    }
  })

  expect(result.msPerIteration).toBeLessThanOrEqual(eventPropagationBudget)
})

test('derived graph updates stay within performance budget', async () => {
  const result = await execFunc<PerfMeasure>(() => {
    const {combine, createEvent, createStore} = effector
    const now = () =>
      typeof performance !== 'undefined' && performance.now
        ? performance.now()
        : Date.now()
    const tick = createEvent()
    const $source = createStore(0).on(tick, value => value + 1)
    const stores = [$source]
    const warmTimes = 20
    const iterations = 400
    let updates = 0

    for (let index = 0; index < 64; index += 1) {
      const previous = stores[stores.length - 1]
      stores.push(previous.map(value => value + index))
    }

    const $sum = combine(stores, values => {
      let total = 0
      for (let index = 0; index < values.length; index += 1) {
        total += values[index]
      }
      return total
    })

    $sum.watch(() => {
      updates += 1
    })

    for (let index = 0; index < warmTimes; index += 1) {
      tick()
    }

    updates = 0
    const start = now()

    for (let index = 0; index < iterations; index += 1) {
      tick()
    }

    const duration = now() - start

    if ($source.getState() !== warmTimes + iterations) {
      throw Error('unexpected source state after performance test')
    }
    if (updates !== iterations) {
      throw Error('unexpected derived update count after performance test')
    }

    return {
      name: 'derived graph updates',
      duration,
      iterations,
      msPerIteration: duration / iterations,
    }
  })

  expect(result.msPerIteration).toBeLessThanOrEqual(derivedGraphBudget)
})

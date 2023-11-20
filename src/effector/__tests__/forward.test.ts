import {forward, createEvent, createStore, createNode} from 'effector'

const consoleError = console.error

beforeAll(() => {
  console.error = (message, ...args) => {
    if (String(message).includes('forward')) return
    consoleError(message, ...args)
  }
})

afterAll(() => {
  console.error = consoleError
})

it('should forward data from one event to another', () => {
  const fn = jest.fn()
  const source1 = createEvent<string>()
  const source2 = createEvent<string>()
  const target = createEvent<string>()

  target.watch(e => fn(e))
  const unsubscribe = forward({
    from: source1,
    to: target,
  })
  forward({
    from: source2,
    to: target,
  })
  source1('should been forwarded [1]')
  source2('should been forwarded [2]')
  expect(fn.mock.calls).toEqual([
    ['should been forwarded [1]'],
    ['should been forwarded [2]'],
  ])
})

describe('raw nodes support', () => {
  test('single ones', () => {
    const from = createNode()
    const to = createNode()
    expect(() => {
      //@ts-expect-error
      forward({from, to})
    }).not.toThrow()
  })
  test('arrays', () => {
    const from = createNode()
    const to = createNode()
    expect(() => {
      //@ts-expect-error
      forward({from: [from], to: [to]})
    }).not.toThrow()
  })
})

it('should stop forwarding after unsubscribe', () => {
  const fn = jest.fn()
  const source1 = createEvent<string>()
  const source2 = createEvent<string>()
  const target = createEvent<string>()

  target.watch(e => fn(e))
  const unsubscribe = forward({
    from: source1,
    to: target,
  })
  forward({
    from: source2,
    to: target,
  })
  source1('should been forwarded [1]')
  source2('should been forwarded [2]')
  expect(fn.mock.calls).toEqual([
    ['should been forwarded [1]'],
    ['should been forwarded [2]'],
  ])
  unsubscribe()
  source1('should not been forwarded')
  expect(fn.mock.calls).toEqual([
    ['should been forwarded [1]'],
    ['should been forwarded [2]'],
  ])
})

it('should unsubscribe only from relevant watchers', async () => {
  const dispatch = createEvent<string>()
  const store = createStore<string[]>([])
  store.on(dispatch, (state, text) => [...state, text])
  function subscribe(fn: Function) {
    let first = true
    return store.watch(data => {
      if (first) {
        first = false
        return
      }
      fn(data)
    })
  }
  const listenerA = jest.fn()
  const listenerB = jest.fn()
  const listenerC = jest.fn()

  subscribe(listenerA)
  const unSubB = subscribe((data: any) => {
    listenerB(data)
    unSubB()
  })
  subscribe(listenerC)

  dispatch('item 1')
  dispatch('item 2')

  expect(listenerA.mock.calls.length).toBe(2)
  expect(listenerB.mock.calls.length).toBe(1)
  expect(listenerC.mock.calls.length).toBe(2)
})

describe('array forwarding support', () => {
  it('support forwarding to arrays', () => {
    const fn1 = jest.fn()
    const fn2 = jest.fn()
    const s1 = createEvent()
    const t1 = createEvent()
    const t2 = createEvent()
    t1.watch(fn1)
    t2.watch(fn2)
    forward({
      from: s1,
      to: [t1, t2],
    })
    s1()
    expect(fn1).toBeCalledTimes(1)
    expect(fn2).toBeCalledTimes(1)
  })
  it('support forwarding from arrays', () => {
    const fn = jest.fn()
    const s1 = createEvent()
    const s2 = createEvent()
    const t1 = createEvent()
    t1.watch(fn)
    forward({
      from: [s1, s2],
      to: t1,
    })
    s1()
    s2()
    expect(fn).toBeCalledTimes(2)
  })
  it('support forwarding from arrays to arrays', () => {
    const fn1 = jest.fn()
    const fn2 = jest.fn()
    const s1 = createEvent()
    const s2 = createEvent()
    const t1 = createEvent()
    const t2 = createEvent()
    t1.watch(fn1)
    t2.watch(fn2)
    forward({
      from: [s1, s2],
      to: [t1, t2],
    })
    s1()
    s2()
    expect(fn1).toBeCalledTimes(2)
    expect(fn2).toBeCalledTimes(2)
  })
})
it('should validate arguments', () => {
  expect(() => {
    //@ts-expect-error
    forward({})
  }).toThrowErrorMatchingInlineSnapshot(
    `"[forward] (/src/effector/__tests__/forward.test.ts:173:4): expect \\"from\\" to be a unit (store, event or effect) or array of units"`,
  )
  expect(() => {
    //@ts-expect-error
    forward({from: createStore(null)})
  }).toThrowErrorMatchingInlineSnapshot(
    `"[forward] (/src/effector/__tests__/forward.test.ts:179:4): expect \\"to\\" to be a unit (store, event or effect) or array of units"`,
  )
  expect(() => {
    //@ts-expect-error
    forward({to: createStore(null)})
  }).toThrowErrorMatchingInlineSnapshot(
    `"[forward] (/src/effector/__tests__/forward.test.ts:185:4): expect \\"from\\" to be a unit (store, event or effect) or array of units"`,
  )
})

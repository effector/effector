import {from} from 'most'

import {
  createStore,
  Store,
  combine,
  createEvent,
  createEffect,
  Event,
} from 'effector'
import {show} from 'effector/fixtures/showstep'
import {argumentHistory} from 'effector/fixtures'

test('graphite', () => {
  const fn = jest.fn()
  const fn1 = jest.fn()
  const foo: Event<number> = createEvent('foo')
  const bar = foo.map(x => (fn(x), x + 1))
  const store1: Store<string> = createStore('foo').on(bar, (state, bar) =>
    [state, bar].join(' | '),
  )
  const store2 = store1.map(e => e.length)
  const unsub1 = bar.watch(fn1)
  foo(0)
  foo(10)
  expect(fn).toHaveBeenCalledTimes(2)
  expect(store1.getState()).toBe('foo | 1 | 11')
  //@ts-ignore
  const showBar = show(bar.graphite)

  expect(showBar).toMatchSnapshot('show bar')
  unsub1()
  //@ts-ignore
  const showBar2 = show(bar.graphite)
  expect(showBar2).toMatchSnapshot('show bar')
  foo(100)
  expect(fn1).toHaveBeenCalledTimes(2)
  //@ts-ignore
  const showFoo = show(foo.graphite)
  //@ts-ignore
  const showStore = show(store1.graphite)
  //@ts-ignore
  const showStore2 = show(store2.graphite)
  expect(showFoo).toMatchSnapshot('show foo')
  expect(showStore).toMatchSnapshot('show store1')
  expect(showStore2).toMatchSnapshot('show store2')
})

test('showcase', () => {
  const fn = jest.fn()
  const foo = createEvent('foo')
  const bar = createEvent('bar')

  const a = createStore(1)
  const b = createStore(2)
  const bigStore = combine({a, b})
  const mapped = bigStore.map(s => s.a)

  a.on(foo, n => n + 1)
  b.on(bar, n => n + 1)

  mapped.watch(fn)

  foo()
  foo()

  bar()
  bar()
  bar()
  bar()

  //@ts-ignore
  expect(show(a.graphite)).toMatchSnapshot('store a')
  //@ts-ignore
  expect(show(foo.graphite)).toMatchSnapshot('event foo')
  //@ts-ignore
  expect(show(mapped.graphite)).toMatchSnapshot('mapped')
  expect(fn).toHaveBeenCalledTimes(3)
  const first = createStore('s')
  const second = createStore('h')
  const third = createStore('i')
  const status = combine(first, second, third, (a, b, c) => [a, b, c].join(''))
  expect(status.getState()).toBe('shi')
})

describe('symbol-observable support', () => {
  test('from(store)', async () => {
    const fn = jest.fn()
    expect(() => {
      //@ts-ignore
      from(createStore(0))
    }).not.toThrow()
    const store1 = createStore(-1)
    const ev1 = createEvent()
    const ev2 = createEvent()
    //@ts-ignore
    const store1$ = from(store1)
    store1$.observe(fn)
    store1.on(ev1, state => state + 1)
    ev1('foo')
    ev1('bar')
    ev1('baz')
    ev2('should ignore')

    expect(argumentHistory(fn)).toEqual([-1, 0, 1, 2])
    expect(fn).toHaveBeenCalledTimes(4)
    expect(store1.getState()).toBe(2)
  })
  describe('from(effect)', () => {
    test('without implementation', async () => {
      const fn = jest.fn()
      expect(() => {
        from(createEffect())
      }).not.toThrow()
      const ev1 = createEffect({handler() {}})
      const ev2 = createEffect({handler() {}})
      const ev1$ = from(ev1)
      ev1$.observe(fn)
      ev1(0)
      ev1(1)
      ev1(2)
      ev2('should ignore')
      expect(fn).toHaveBeenCalledTimes(3)

      expect(argumentHistory(fn)).toEqual([0, 1, 2])
    })

    test('with implementation', async () => {
      const fn = jest.fn()
      expect(() => {
        async function impl() {}
        const eff1 = createEffect()
        eff1.use(impl)
        from(eff1)
      }).not.toThrow()
      const ev1 = createEffect({handler() {}})
      const ev2 = createEffect({handler() {}})
      async function impl() {}
      ev1.use(impl)
      const ev1$ = from(ev1)
      ev1$.observe(fn)
      ev1(0)
      ev1(1)
      ev1(2)
      ev2('should ignore')
      expect(fn).toHaveBeenCalledTimes(3)

      expect(argumentHistory(fn)).toEqual([0, 1, 2])
    })
  })
})

test('attt', () => {
  const state = createStore({
    foo: 1,
    bar: [0],
  })
  const e1 = createEvent()
  expect(state.getState()).toMatchObject({
    foo: 1,
    bar: [0],
  })
  state.on(e1, (state, payload) => ({
    foo: parseInt(payload, 36),
    bar: [...state.bar, parseInt(payload, 36)],
  }))
  e1('10')
  expect(state.getState()).toMatchObject({
    foo: 36,
    bar: [0, 36],
  })
  e1('11')
  expect(state.getState()).toMatchObject({
    foo: 37,
    bar: [0, 36, 37],
  })
})

test('createStore', () => {
  const counter = createStore(0)
  const text = createStore('')
  const store = combine({counter, text, foo: 'bar'})
  expect(store.getState()).toMatchObject({counter: 0, text: '', foo: 'bar'})
})

describe('store.on', () => {
  test('store.on(event)', () => {
    const counter = createStore(0)
    const text = createStore('')
    const store = combine({counter, text, foo: 'bar'})

    const e1 = createEvent()
    store.on(e1, (state, payload) => ({
      ...state,
      foo: payload,
    }))

    expect(store.getState()).toMatchObject({counter: 0, text: '', foo: 'bar'})
    e1('baz')
    expect(store.getState()).toMatchObject({counter: 0, text: '', foo: 'baz'})
  })
  test('store.on(effect)', async () => {
    const counter = createStore(0)
    const text = createStore('')
    const store = combine({counter, text, foo: 0})
    const e1 = createEffect()
    store.on(e1.done, (state, {result}) => ({
      ...state,
      foo: result,
    }))
    e1.use(n => new Promise(_ => setTimeout(_, n, n)))

    expect(store.getState()).toMatchObject({counter: 0, text: '', foo: 0})
    const result = await e1(500)
    expect(result).toBe(500)
    expect(store.getState()).toMatchObject({counter: 0, text: '', foo: 500})
  })
})

test('store.watch', () => {
  const click = createEvent()
  const store1 = createStore(-1)
  const fn1 = jest.fn()
  const fn2 = jest.fn()
  store1.watch(fn1)
  store1.on(click, (state, e) => (fn2(state, e), state))
  click()
  click('a')
  click('b')
  expect(store1.getState()).toBe(-1)

  expect(fn1).not.toHaveBeenCalledTimes(2)
  expect(fn2).toHaveBeenCalledTimes(3)

  expect(fn1).toHaveBeenCalledTimes(1)
  expect(fn2.mock.calls).toEqual([
    [-1, undefined],
    [-1, 'a'],
    [-1, 'b'],
  ])
  expect(argumentHistory(fn1)).toEqual([-1])
})

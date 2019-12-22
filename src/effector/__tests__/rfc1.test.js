//@flow
import * as React from 'react'
import {from} from 'most'

import {
  createStore,
  createStoreObject,
  createEvent,
  type Event,
  createEffect,
} from 'effector'
import {useStore} from 'effector-react'

import {spy, delay, getSpyCalls} from 'effector/fixtures'
import {render, act, renderHTML} from 'effector/fixtures/react'

describe('symbol-observable support', () => {
  test('from(store)', async() => {
    expect(() => {
      //$todo
      from(createStore(0))
    }).not.toThrow()
    const store1 = createStore(-1)
    const ev1 = createEvent('ev1')
    const ev2 = createEvent('ev2')
    //$todo
    const store1$ = from(store1)
    store1$.observe(spy)
    store1.on(ev1, state => state + 1)
    ev1('foo')
    ev1('bar')
    ev1('baz')
    ev2('should ignore')

    expect(getSpyCalls()).toEqual([[-1], [0], [1], [2]])
    expect(spy).toHaveBeenCalledTimes(4)
    expect(store1.getState()).toBe(2)
  })
  describe('from(effect)', () => {
    test('without implementation', async() => {
      expect(() => {
        from(createEffect('ev1'))
      }).not.toThrow()
      const ev1 = createEffect({handler(n) {}})
      const ev2 = createEffect({handler(n) {}})
      const ev1$ = from(ev1)
      ev1$.observe(spy)
      ev1(0)
      ev1(1)
      ev1(2)
      ev2('should ignore')
      expect(spy).toHaveBeenCalledTimes(3)

      expect(getSpyCalls()).toEqual([[0], [1], [2]])
    })

    test('with implementation', async() => {
      expect(() => {
        async function impl() {}
        const eff1 = createEffect('ev1')
        eff1.use(impl)
        from(eff1)
      }).not.toThrow()
      const ev1 = createEffect({handler(n) {}})
      const ev2 = createEffect({handler(n) {}})
      async function impl() {}
      ev1.use(impl)
      const ev1$ = from(ev1)
      ev1$.observe(spy)
      ev1(0)
      ev1(1)
      ev1(2)
      ev2('should ignore')
      expect(spy).toHaveBeenCalledTimes(3)

      expect(getSpyCalls()).toEqual([[0], [1], [2]])
    })
  })
})

test('attt', () => {
  const state = createStore({
    foo: 1,
    bar: [0],
  })
  const e1 = createEvent('nu ok')
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
  const store = createStoreObject({counter, text, foo: 'bar'})
  expect(store.getState()).toMatchObject({counter: 0, text: '', foo: 'bar'})
})

describe('store.on', () => {
  test('store.on(event)', () => {
    const counter = createStore(0)
    const text = createStore('')
    const store = createStoreObject({counter, text, foo: 'bar'})

    const e1 = createEvent('e1')
    store.on(e1, (state, payload) => ({
      ...state,
      foo: payload,
    }))

    expect(store.getState()).toMatchObject({counter: 0, text: '', foo: 'bar'})
    e1('baz')
    expect(store.getState()).toMatchObject({counter: 0, text: '', foo: 'baz'})
  })
  test('store.on(effect)', async() => {
    const counter = createStore(0)
    const text = createStore('')
    const store = createStoreObject({counter, text, foo: 0})
    const e1 = createEffect('e1')
    store.on(e1.done, (state, {result}) => {
      spy(state, result)
      return {
        ...state,
        foo: result,
      }
    })
    e1.use(n => new Promise(_ => setTimeout(_, n, n)))

    expect(store.getState()).toMatchObject({counter: 0, text: '', foo: 0})
    const result = await e1(500)
    expect(result).toBe(500)
    expect(store.getState()).toMatchObject({counter: 0, text: '', foo: 500})
  })
})

test('store.watch', () => {
  const click = createEvent('click')
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
  expect(fn2.mock.calls).toEqual([[-1, undefined], [-1, 'a'], [-1, 'b']])
  expect(fn1.mock.calls).toEqual([[-1]])
})

test('rfc1 example implementation', async() => {
  const fnWait = jest.fn()
  const fnClick = jest.fn()
  const clickEpicFn = jest.fn()

  const inputText = createEvent()
  const click = createEvent()
  const resetForm = createEvent()
  const increment = createEvent()

  const counter = createStore(0)
  const text = createStore('')
  const store = createStoreObject({counter, text})

  const waitIncrement = createEffect({
    async handler() {
      await new Promise(rs => {
        const unsub = increment.watch(() => {
          unsub()
          rs()
        })
      })
    },
  })
  click.watch(() => waitIncrement())
  waitIncrement.done.watch(fnWait)
  counter.reset(resetForm)
  text.reset(resetForm)
  const trimmedInput = inputText.map(text => text.trim())

  text.on(trimmedInput, (_, text) => text)

  counter.watch(() => {})
  counter.on(increment, state => state + 1)
  click.watch(() => {})
  const click$ = from(click).tap(clickEpicFn)

  click$.observe(() => {})
  click$.observe(async() => {
    await delay(500)
    fnClick()
    increment()
  })
  store.watch(() => {})

  const messageStore = store.map(({counter}) => `Clicked: ${counter} times`)
  const ClickedTimes = () => {
    const state = useStore(messageStore)
    expect(state).not.toBe(text)
    expect(typeof state).toBe('string')
    return <span>{state}</span>
  }
  const CurrentText = ({prefix}) => {
    const {text} = useStore(store)
    return (
      <p>
        {prefix} {text}
      </p>
    )
  }

  const App = () => (
    <>
      <ClickedTimes />
      <CurrentText prefix="Current text: " />
    </>
  )
  await expect(
    (async() => {
      await render(<ClickedTimes />)
      await render(<CurrentText prefix="Current text: " />)
      await render(<App />)
    })(),
  ).resolves.not.toThrow()
  expect(await renderHTML(<ClickedTimes />)).toMatchInlineSnapshot(`
    <span>
      Clicked: 0 times
    </span>
  `)
  expect(await renderHTML(<CurrentText prefix="Current text: " />))
    .toMatchInlineSnapshot(`
    <p>
      Current text: 
       
      
    </p>
  `)
  expect(await renderHTML(<App />)).toMatchInlineSnapshot(`
    <span>
      Clicked: 0 times
    </span>
  `)
  expect(fnWait).not.toHaveBeenCalled()
  expect(fnClick).not.toHaveBeenCalled()
  await act(async() => {
    click()
    click()
    expect(fnWait).not.toHaveBeenCalled()
    await new Promise(_ => setTimeout(_, 2200))
  })
  expect(counter.getState()).toBe(2)
  expect(fnWait).toHaveBeenCalledTimes(2)
  expect(fnClick).toHaveBeenCalledTimes(2)
  expect(store.getState()).toMatchObject({
    counter: 2,
    text: '',
  })
  expect(await renderHTML(<App />)).toMatchInlineSnapshot(`
    <span>
      Clicked: 2 times
    </span>
  `)
})

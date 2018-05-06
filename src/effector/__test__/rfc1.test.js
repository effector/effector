//@flow
import * as React from 'react'
import TestRenderer from 'react-test-renderer'
import invariant from 'invariant'
import {from} from 'most'
import {
 createEvent,
 createEffect,
 createStore,
 createStoreObject,
 type Event,
 type Effect,
 type Store,
} from '..'

describe('symbol-observable support', () => {
 test('from(event)', async() => {
  expect(() => {
   const event$ = from(createEvent('ev1'))
  }).not.toThrow()
  const ev1 = createEvent('ev1')
  const ev2 = createEvent('ev2')
  const ev1$ = from(ev1)
  const fn1 = jest.fn()
  ev1$.observe(fn1)
  ev1(0)
  ev1(1)
  ev1(2)
  ev2('should ignore')
  expect(fn1).toHaveBeenCalledTimes(3)

  expect(fn1.mock.calls).toEqual([[0], [1], [2]])
 })

 test('from(store)', async() => {
  expect(() => {
   const store$ = from(createStore(0))
  }).not.toThrow()
  const store1 = createStore(-1)
  const ev1 = createEvent('ev1')
  const ev2 = createEvent('ev2')
  const store1$ = from(store1)
  const fn1 = jest.fn()
  store1$.observe(fn1)
  store1.on(ev1, (state, payload) => state + 1)
  ev1('foo')
  ev1('bar')
  ev1('baz')
  ev2('should ignore')

  expect(fn1.mock.calls).toEqual([[-1], [0], [1], [2]])
  expect(fn1).toHaveBeenCalledTimes(4)
  expect(store1.getState()).toBe(2)
 })
 describe('from(effect)', () => {
  test('without implementation', async() => {
   expect(() => {
    const event$ = from(createEffect('ev1'))
   }).not.toThrow()
   const ev1 = createEffect('ev1')
   const ev2 = createEffect('ev2')
   const ev1$ = from(ev1)
   const fn1 = jest.fn()
   ev1$.observe(fn1)
   ev1(0)
   ev1(1)
   ev1(2)
   ev2('should ignore')
   expect(fn1).toHaveBeenCalledTimes(3)

   expect(fn1.mock.calls).toEqual([[0], [1], [2]])
  })

  test('with implementation', async() => {
   expect(() => {
    async function impl(_) {}
    const eff1 = createEffect('ev1')
    eff1.use(impl)
    const event$ = from(eff1)
   }).not.toThrow()
   const ev1 = createEffect('ev1')
   const ev2 = createEffect('ev2')
   async function impl(_) {}
   ev1.use(impl)
   const ev1$ = from(ev1)
   const fn1 = jest.fn()
   ev1$.observe(fn1)
   ev1(0)
   ev1(1)
   ev1(2)
   ev2('should ignore')
   expect(fn1).toHaveBeenCalledTimes(3)

   expect(fn1.mock.calls).toEqual([[0], [1], [2]])
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

test('event.to', () => {
 const counter = createStore(0)
 const text = createStore('')
 const store = createStoreObject({counter, text, foo: 'bar'})

 const e1: Event<string> = createEvent('e1')
 e1.to(store, (state, payload) => ({
  ...state,
  foo: payload,
 }))

 expect(store.getState()).toMatchObject({counter: 0, text: '', foo: 'bar'})
 e1('baz')
 expect(store.getState()).toMatchObject({counter: 0, text: '', foo: 'baz'})
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
  const fn = jest.fn()
  const e1 = createEffect('e1')
  store.on(e1.done, (state, {params, result}) => {
   fn(state, result)
   return {
    ...state,
    foo: result,
   }
  })
  e1.use(n => new Promise(_ => setTimeout(_, n, n)))

  expect(store.getState()).toMatchObject({counter: 0, text: '', foo: 0})
  const result = await e1(500).done()
  expect(result).toMatchObject({params: 500, result: 500})
  expect(store.getState()).toMatchObject({counter: 0, text: '', foo: 500})
 })
})

test('event.watch', () => {
 const click = createEvent('click')
 const clickEpicFn = jest.fn(e => console.log(`clickEpicFn`, e))
 click.watch(clickEpicFn)
 click()
 click(1)
 click(2)
 expect(clickEpicFn).not.toHaveBeenCalledTimes(2)
 expect(clickEpicFn).toHaveBeenCalledTimes(3)
})

test('store.watch', () => {
 const click = createEvent('click')
 const store1 = createStore(-1)
 const fn1 = jest.fn()
 const fn2 = jest.fn()
 store1.watch(fn1)
 click.to(store1, (state, e, type) => (fn2(state, e, type), state))
 click()
 click('a')
 click('b')
 expect(store1.getState()).toBe(-1)

 expect(fn1).not.toHaveBeenCalledTimes(2)
 expect(fn2).toHaveBeenCalledTimes(3)

 expect(fn1).toHaveBeenCalledTimes(1)
 expect(fn2.mock.calls).toEqual([
  [-1, undefined, undefined],
  [-1, 'a', undefined],
  [-1, 'b', undefined],
 ])
 expect(fn1.mock.calls).toEqual([[-1]])
 //expect(fn1.mock.calls).toEqual([[-1, undefined], [-1, 'a'], [-1, 'b']])
})

test('rfc1 example implementation', async() => {
 const inputText = createEvent('input text')
 const click = createEvent('click')
 const resetForm = createEvent('reset')
 const increment = createEvent('increment')

 //  const fetchSavedText: Effect<string, any, any, any> = createEffect(
 //   'fetch saved text',
 //  )

 //  fetchSavedText.use(() => Promise.resolve('~~ mock for saved text ~~'))

 const counter = createStore(0)
 const text = createStore('')
 const store = createStoreObject({counter, text})

 const fnWait = jest.fn()
 const waitIncrement = createEffect('wait increment')
 waitIncrement.use(
  () =>
   new Promise(_ => {
    console.count('wait')
    const unsub = increment.watch(() => {
     console.count('wait done')
     _()
    })
   }),
 )
 click.watch(() => waitIncrement())
 waitIncrement.done.watch(fnWait)
 //  increment.watch(fnWait)
 counter.reset(resetForm)
 text.reset(resetForm)

 inputText
  .map(text => text.trim())
  .epic(text$ => text$.tap(e => console.log(`inputText tap`, e)))
  .to(text)
 counter.watch(e => console.log('watch counter', e))
 counter.on(
  increment,
  state =>
   // throw new Error('to')
   state + 1,
 )
 const fnClick = jest.fn()
 click.watch(() => console.count(`click__watch fast`))
 //  click.watch(waitIncrement)
 const clickEpicFn = jest.fn()
 const click$ = click.epic(click$ =>
  click$.tap(e => console.log(`tap`, e)).tap(clickEpicFn),
 )
 click$.watch(_ => console.count(`click$.watch`))
 click$.watch(async() => {
  console.log(`tap -> watch`)
  await new Promise(_ => setTimeout(_, 500))
  console.log(`tap -> watch -> fnClick & increment`)
  fnClick()
  increment()
 })

 //  fetchSavedText.done.map(({result}) => result).to(inputText)
 store.watch(state => console.warn('new state', state))
 const ClickedTimes = store
  .map(({counter, text}) => `Clicked: ${counter} times`)
  .withProps(state => {
   console.log(state)
   expect(state).not.toBe(text)
   expect(typeof state).toBe('string')
   return <span>{state}</span>
  })

 const CurrentText = store.withProps(({counter, text}, props) => (
  <p>
   {props.prefix} {text}
  </p>
 ))

 const App = () => (
  <React.Fragment>
   <ClickedTimes />
   <CurrentText prefix="Current text: " />
  </React.Fragment>
 )
 expect(ClickedTimes).toBeDefined()
 expect(<ClickedTimes />).toBeDefined()
 expect(App).toBeDefined()
 expect(() => {
  TestRenderer.create(<ClickedTimes />).toJSON()
  TestRenderer.create(<CurrentText prefix="Current text: " />).toJSON()
  TestRenderer.create(<App />).toJSON()
 }).not.toThrow()
 expect(TestRenderer.create(<ClickedTimes />).toJSON()).toMatchSnapshot()
 expect(
  TestRenderer.create(<CurrentText prefix="Current text: " />).toJSON(),
 ).toMatchSnapshot()
 expect(TestRenderer.create(<App />).toJSON()).toMatchSnapshot()
 expect(fnWait).not.toHaveBeenCalled()
 expect(fnClick).not.toHaveBeenCalled()
 click()
 click()
 console.log(store)
 expect(fnWait).not.toHaveBeenCalled()
 await new Promise(_ => setTimeout(_, 2200))
 expect(clickEpicFn).toHaveBeenCalledTimes(2)
 expect(counter.getState()).toBe(2)
 expect(fnWait).toHaveBeenCalledTimes(2) //TODO why not?
 expect(fnClick).toHaveBeenCalledTimes(2)
 expect(store.getState()).toMatchObject({
  counter: 2,
  text: '',
 })
 expect(TestRenderer.create(<App />).toJSON()).toMatchSnapshot()
})

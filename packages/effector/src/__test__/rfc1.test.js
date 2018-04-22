//@flow
import * as React from 'react'
import TestRenderer from 'react-test-renderer'

import {
 createEvent,
 createEffect,
 createStore,
 type Event,
 type Effect,
 type Store,
} from '..'

test('createStore', () => {
 const counter = createStore(0)
 const text = createStore('')
 const store = createStore({counter, text, foo: 'bar'})
 expect(store.getState()).toMatchObject({counter: 0, text: '', foo: 'bar'})
})

test('event.to', () => {
 const counter = createStore(0)
 const text = createStore('')
 const store = createStore({counter, text, foo: 'bar'})

 const e1: Event<string, any> = createEvent('e1')
 e1.to(store, (state, payload) => ({
  ...state,
  foo: payload,
 }))

 expect(store.getState()).toMatchObject({counter: 0, text: '', foo: 'bar'})
 e1('baz')
 expect(store.getState()).toMatchObject({counter: 0, text: '', foo: 'baz'})
})

test('event lock', () => {
 const store = createStore({foo: ['_']})
 const fn1 = jest.fn()
 const fn2 = jest.fn()
 const e1: Event<string, *> = createEvent('e1')
 store.on(e1, ({foo}, payload) => ({
  foo: [...foo, payload],
 }))

 const unsub1 = e1.watch(data => {
  fn1(data)
  switch (data) {
   case 'a':
    return e1('b')
   case 'b':
    return e1('c')
  }
 })
 expect(store.getState()).toMatchObject({foo: ['_']})
 e1('a')
 expect(store.getState()).toMatchObject({foo: ['_', 'a', 'b', 'c']})

 unsub1()

 e1.watch(data => {
  fn2(data)
  switch (data) {
   case 'a':
    return e1('b')
   case 'b':
    return e1('c')
   case 'c':
    return e1('c')
  }
 })
 expect(() => {
  e1('a')
 }).toThrowErrorMatchingSnapshot()
 expect(fn1).toHaveBeenCalledTimes(3)
 expect(fn2).toHaveBeenCalledTimes(3)
 expect(store.getState()).toMatchObject({
  foo: ['_', 'a', 'b', 'c', 'a', 'b', 'c'],
 })
})

test('store.on', () => {
 const counter = createStore(0)
 const text = createStore('')
 const store = createStore({counter, text, foo: 'bar'})

 const e1 = createEvent('e1')
 store.on(e1, (state, payload) => ({
  ...state,
  foo: payload,
 }))

 expect(store.getState()).toMatchObject({counter: 0, text: '', foo: 'bar'})
 e1('baz')
 expect(store.getState()).toMatchObject({counter: 0, text: '', foo: 'baz'})
})

test('rfc1 example implementation', async() => {
 const inputText: Event<string, *> = createEvent('input text')
 const click: Event<void, *> = createEvent('click')
 const resetForm: Event<void, *> = createEvent('reset')
 const increment: Event<void, *> = createEvent('increment')

 const fetchSavedText: Effect<string, any, any, any> = createEffect(
  'fetch saved text',
 )
 fetchSavedText.use(() => Promise.resolve('~~ mock for saved text ~~'))

 const counter = createStore(0)
 const text = createStore('')
 const store = createStore({counter, text})

 counter.reset(resetForm)
 text.reset(resetForm)

 inputText
  .map(text => text.trim())
  .epic(text$ => text$.debounce(500))
  .to(text)

 increment.to(counter, state => state + 1)

 click.epic(click$ => click$.throttle(500)).watch(async() => {
  await new Promise(_ => setTimeout(_, 500))
  increment()
 })

 //  fetchSavedText.done.map(({result}) => result).to(inputText)

 const ClickedTimes = store
  .map(({counter, text}) => 'Clicked: ' + counter + ' times')
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
 expect(TestRenderer.create(<ClickedTimes />).toJSON()).toMatchSnapshot()
 expect(
  TestRenderer.create(<CurrentText prefix="Current text: " />).toJSON(),
 ).toMatchSnapshot()
 expect(TestRenderer.create(<App />).toJSON()).toMatchSnapshot()
})

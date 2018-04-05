// @flow
/* eslint-disable no-unused-vars */
import {
 createReducer,
 createRootDomain,
 type Domain,
 type Event,
 type Reducer,
 combine,
 effectorMiddleware,
 collect,
} from '..'

import {periodic} from 'most'
import {createStore, applyMiddleware, type Store, combineReducers} from 'redux'

type State = {foo: 'bar'}

test('reducer', () => {
 const domain = createRootDomain()
 const event1: Event<'ev', State> = domain.event('event1')
 const event2: Event<'ev2', State> = domain.event('event2')
 const reset: Event<void, State> = domain.event('reset')

 const reducer: Reducer<{
  actions: string[],
 }> = createReducer({actions: ['bar']})
  .on([event1, event2], (state, payload) => ({
   actions: [...state.actions, payload],
  }))
  .reset(reset)
 const none: any = undefined
 const state1 = reducer(none, event1('ev').raw())
 expect(state1).toMatchSnapshot()
 const state2 = reducer(state1, event2('ev2').raw())
 expect(state2).toMatchSnapshot()
 const state3 = reducer(state1, reset().raw())
 expect(state3).toMatchSnapshot()
})

test('combine', async() => {
 const domain = createRootDomain()
 const event1: Event<'ev', State> = domain.event('event1')
 const event2: Event<'ev2', State> = domain.event('event2')
 const event3: Event<'ev3', State> = domain.event('event3')
 const reset: Event<mixed, State> = domain.event('reset')

 const reducerA: Reducer<{
  actions: string[],
 }> = createReducer({actions: ['bar']})
  .on([event1, event2, event3], (state, payload) => ({
   actions: [...state.actions, payload],
  }))
  .reset(reset)
 const reducerB: Reducer<{
  resets: number,
 }> = createReducer({resets: 0}).on(reset, (state, p) => ({
  resets: state.resets + 1,
 }))
 const union = combine(
  (value1, {resets}) => ({
   value1,
   resets,
  }),
  reducerA,
  reducerB,
 )
  .on(event3, (state, p) => ({
   ...state,
   resets: state.resets + 10,
  }))
  .on(event2, (e, event) => e)
 const none: any = undefined
 const state1 = union(none, event1('ev').raw())
 expect(state1).toMatchSnapshot()
 const state2 = union(state1, reset('').raw())
 expect(state2).toMatchSnapshot()
 const state3 = union(state2, event2('ev2').raw())
 expect(state3).toMatchObject({
  resets: 1,
  value1: {
   actions: ['bar', 'ev2'],
  },
 })
 const state4 = union(state3, event3('ev3').raw())
 expect(state4).toMatchObject({
  resets: 1,
  value1: {
   actions: ['bar', 'ev2', 'ev3'],
  },
 })
})

test('collect', async() => {
 const domain = createRootDomain()
 const event1: Event<'ev', State> = domain.event('event1')
 const event2: Event<'ev2', State> = domain.event('event2')
 const event3: Event<'ev3', State> = domain.event('event3')
 const reset: Event<mixed, State> = domain.event('reset')

 const reducerA: Reducer<{
  actions: string[],
 }> = createReducer({actions: ['bar']})
  .on([event1, event2, event3], (state, payload) => ({
   actions: [...state.actions, payload],
  }))
  .reset(reset)
 const reducerB: Reducer<{
  resets: number,
 }> = createReducer({resets: 0}).on(reset, (state, p) => ({
  resets: state.resets + 1,
 }))

 const union = collect() // Mill
  .and(reducerA) // Mill<A>
  .and(reducerB) // Mill<A, B>
  .combine((value1, {resets}) => ({
   value1,
   resets,
  })) // Reducer<{value1: A, resets: number}>
  .on(event3, (state, p) => ({
   ...state,
   resets: state.resets + 10,
  }))
  .on(event2, (e, event) => e)

 const none: any = undefined
 const state1 = union(none, event1('ev').raw())
 expect(state1).toMatchSnapshot()
 const state2 = union(state1, reset('').raw())
 expect(state2).toMatchSnapshot()
 const state3 = union(state2, event2('ev2').raw())
 expect(state3).toMatchObject({
  resets: 1,
  value1: {
   actions: ['bar', 'ev2'],
  },
 })
 const state4 = union(state3, event3('ev3').raw())
 expect(state4).toMatchObject({
  resets: 1,
  value1: {
   actions: ['bar', 'ev2', 'ev3'],
  },
 })
 const emptyUnion = collect().combine(() => 'default')
 const state5 = emptyUnion(state4, event3('ev3').raw())
 expect(state5).toBe('default')
})

test('falsey values should been handled correctly', async() => {
 const fn = jest.fn()

 const domain: Domain<{loading: boolean}> = createRootDomain()
 const timeout = domain.effect('timeout')
 domain.port(
  periodic(300)
   .take(5)
   .map(() => timeout()),
 )
 const loading = createReducer(false)
  .on(timeout, () => true)
  .on(timeout.done, () => false)

 const stateShape = combineReducers({
  loading,
 })

 const store: Store<{loading: boolean}> = createStore((state, act) => {
  const result = stateShape(state, act)
  if (act.type === timeout.getType()) {
   fn(state, result)
   expect(result).toHaveProperty('loading', true)
  } else expect(result).toHaveProperty('loading', false)
  return result
 }, applyMiddleware(effectorMiddleware))
 domain.register(store)
 await delay(2e3)
 expect(fn).toHaveBeenCalledTimes(5)
})

function delay(time: number) {
 return new Promise(rs => setTimeout(rs, time))
}

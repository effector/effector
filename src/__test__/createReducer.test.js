// @flow

import {
  createReducer,
  createDomain, 
  type Domain, 
  type Event, 
  type Reducer,
  rootDomain, 
  effectorMiddleware
} from '..'

type State = {foo: 'bar'}

test('reducer', () => {
  const domain = rootDomain()
  const event1: Event<'ev', State> = domain.event('event1')
  const event2: Event<'ev2', State> = domain.event('event2')
  const reset: Event<void, State> = domain.event('reset')

  const reducer: Reducer<{
    actions: string[]
  }> = createReducer({actions: ['bar']})
    .on([event1, event2], (state, payload) => ({
      actions: [...state.actions, payload]
    }))
    .reset(reset)
  
  const state1 = reducer(undefined, event1('ev').raw())
  expect(state1).toMatchSnapshot()
  const state2 = reducer(state1, event2('ev2').raw())
  expect(state2).toMatchSnapshot()
  const state3 = reducer(state1, reset().raw())
  expect(state3).toMatchSnapshot()
})
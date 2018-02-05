//@flow

import type {Stream} from 'most'
import {createStore, applyMiddleware, combineReducers, type Middleware, type Store, type Reducer} from 'redux'

import {actionFabric, type Action} from '../action'

import {getStore} from '..'

test('example', () => {
  type PayloadA = {
    result: 'foo',
    value: string[],
  }
  type PayloadB = {
    result: string,
    value: 'action B',
  }

  type State = {
    fieldA: {
      label: 'A',
      value: string[],
    },
    fieldB: {
      label: string,
      value: 'foo',
    },
  }

  function epic(
    data$: Stream<PayloadA>,
    state$: Stream<State>
  ) {
    return data$.combine(
      (data, state) => ({
        data, state
      }),
      state$
    )
  }

  expect(epic).toBeDefined()
})

test('action should be thennable', async() => {
  //$off
  const actionType: any = actionFabric('type1', 1)
  const action: Action<'foo'> = actionType('foo')
  setTimeout(
    () => action.channel.next(),
    1e3
  )
  const result: 'foo' = await action.push()
  expect(result).toBe('foo')
})

test('create store', () => {
  const store = getStore('ok', (state, pl) => state)
  expect(store).toBeDefined()
  const event1 = store.event('event1')
  expect(event1).toBeDefined()
  const act = event1({foo: 'bar'})
})

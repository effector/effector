//@flow

import {createStore, applyMiddleware, combineReducers, type Middleware, type Store, type Reducer} from 'redux'
import {
  Domain,
  type Message,
  getRoot,
  createReducer,
  effectorMiddleware,
  type ReduxReducer,
} from '..'

test('smoke', () => {
  expect(getRoot()).toBeDefined()
})

test('~/ - /~', () => {
  const rootDomain = getRoot()
  const subdomain = rootDomain.subdomain('sub')
  const fooMessage: Message<'foo'> = subdomain.message('foo-message')
  console.log(fooMessage('foo'))
  console.log(fooMessage)
  console.log(subdomain)
  expect(rootDomain).toBeDefined()
})

test('real case', () => {
  const rootDomain = getRoot()
  const subdomain = rootDomain.subdomain('a')
  const fooFn = jest.fn()
  const barFn = jest.fn()
  const fooMessage: Message<'foo' | number> = subdomain.message('foo-message')
  const barMessage: Message<{result: string}> = subdomain.message('bar')
  console.log(subdomain)
  const reducerFoo: ReduxReducer<'foo' | number> = createReducer(-1)
    .on(fooMessage, (state, data) => {
      fooFn(data)
      return data
    })
  const reducerBar = createReducer({result: 'none'})
    .on(barMessage, (state, data) => {
      barFn(data)
      return data
    })

  const fullReducer = combineReducers({
    foo: reducerFoo,
    bar: reducerBar,
  })

  const state = createStore(
    fullReducer,
    applyMiddleware(
      effectorMiddleware([rootDomain])
    )
  )
  barMessage({result: 'first call'})
  const fooAct = fooMessage('foo')
  console.log(state.getState())
  expect(state.getState()).toHaveProperty('foo', 'foo')
  expect(state.getState()).toHaveProperty('bar.result', 'first call')
  expect(fooFn).toHaveBeenLastCalledWith('foo')
  console.log(fooMessage)
  console.log(fooAct)

})

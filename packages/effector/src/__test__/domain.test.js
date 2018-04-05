//@flow

import {
  createStore,
  applyMiddleware,
  type Reducer,
  type Middleware,
  type Dispatch,
} from 'redux'
import {from, periodic} from 'most'
import {
  createDomain,
  type Store,
  type Event,
  type Domain,
  createRootDomain,
  effectorMiddleware,
} from '..'

test('default domain', async() => {

})

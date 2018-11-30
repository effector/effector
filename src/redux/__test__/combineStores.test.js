//@flow

import {combineStores} from '../combineStores'

import {createStore, type Store} from 'redux'
import {createDomain, type Store as EffStore} from 'effector'

test('combineStores', () => {
  const domain = createDomain()
  const reduxStore: Store<{test: boolean}> = createStore(
    (state: {test: boolean}) => state,
  )
  const effectorStore: EffStore<{test2: number}> = domain.store({test2: 1})

  const store = combineStores(reduxStore, effectorStore, (a, b) => ({
    ...a,
    ...b,
  }))

  store.watch(state => {})
})

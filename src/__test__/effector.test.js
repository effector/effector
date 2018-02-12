//@flow

import {
  createStore,
  type Store,
  type Reducer,
  type Middleware,
  type Dispatch,
} from 'redux'
import {createDomain, type Domain} from '..'

test('smoke', async() => {
  const store: Store<{foo: 'bar'}> = createStore(
    x => x
  )
  const domain = createDomain(store)

  const effect = domain.effect('eff')
  console.log(effect)
  expect(effect).toBeDefined()
  await effect('foo').send()
})

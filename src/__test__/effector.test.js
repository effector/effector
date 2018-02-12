//@flow

import {
  createStore,
  applyMiddleware,
  type Store,
  type Reducer,
  type Middleware,
  type Dispatch,
} from 'redux'
import {createDomain, type Domain, effectorMiddleware} from '..'

test('smoke', async() => {
  const fn = jest.fn()
  const used = jest.fn(x => Promise.resolve(x))
  const usedDone = jest.fn(x => Promise.resolve(x))
  const store: Store<{foo: 'bar'}> = createStore(
    (s, x) => (fn(x), console.log(x), s),
    applyMiddleware(
      effectorMiddleware
    )
  )
  const domain = createDomain(store)

  const effect = domain.effect('eff')
  effect.use(used)
  effect.done.watch(usedDone)
  const event = domain.event('event1')
  console.log(effect)
  console.log(event)
  expect(effect).toBeDefined()
  expect(event).toBeDefined()
  await event('bar').send()
  await effect('foo').done()
  expect(used).toHaveBeenCalledTimes(1)
  expect(usedDone).toHaveBeenCalledTimes(1)
})

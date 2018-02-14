//@flow

import {
  createStore,
  applyMiddleware,
  type Store,
  type Reducer,
  type Middleware,
  type Dispatch,
} from 'redux'
import {createDomain, type Domain, type Event, rootDomain, effectorMiddleware} from '..'

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

test('epic', async() => {
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
  const event: Event<'ev', {foo: 'bar'}> = domain.event('event1')
  event.epic(
    data$ => data$.map(
      effect
    )
  )
  await event('ev').send()
  expect(used).toHaveBeenCalledTimes(1)
  expect(usedDone).toHaveBeenCalledTimes(1)
})

test('both return and send', async() => {
  const fn = jest.fn()
  const used = jest.fn(x => Promise.resolve(x))
  const usedDone = jest.fn(x => Promise.resolve(x))
  const store: Store<{foo: 'bar'}> = createStore(
    (s, x) => (fn(x), console.log(x), s),
    applyMiddleware(
      effectorMiddleware
    )
  )
  const domain = rootDomain()


  const effect = domain.effect('eff')
  effect.use(used)
  effect.done.watch(usedDone)
  const event: Event<'ev', {foo: 'bar'}> = domain.event('event1')
  event.epic(
    data$ => data$.map(
      e => effect(e).send()
    )
  )
  domain.register(store)
  await event('ev').send()
  expect(used).toHaveBeenCalledTimes(1)
  expect(usedDone).toHaveBeenCalledTimes(1)
})

test('typeConstant', async() => {
  const fn = jest.fn()
  const used = jest.fn(x => console.log(x))
  const store: Store<{foo: 'bar'}> = createStore(
    (s, x) => (fn(x), console.log(x), s),
    applyMiddleware(
      effectorMiddleware
    )
  )
  const domain = createDomain(store, 'with-prefix')

  const event = domain.typeConstant('TYPE_CONST')
  expect(event.getType()).toBe('TYPE_CONST')
  event.epic(data$ => data$.map(e => { used(e) }))

  console.log(event)
  store.dispatch({type: 'TYPE_CONST', payload: 'bar'})
  expect(event('bar')).toMatchObject({type: 'TYPE_CONST', payload: 'bar'})
  expect(event).toBeDefined()
  await event('bar').send()
  expect(used).toHaveBeenCalledTimes(2)
})

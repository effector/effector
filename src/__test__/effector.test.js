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
  rootDomain,
  effectorMiddleware,
} from '..'

test('smoke', async() => {
  const fn = jest.fn()
  const used = jest.fn(x => Promise.resolve(x))
  const usedDone = jest.fn(x => Promise.resolve(x))
  const store: Store<{foo: 'bar'}> = createStore(
    (s, x) => (fn(x), console.log(x), s),
    applyMiddleware(effectorMiddleware),
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
    applyMiddleware(effectorMiddleware),
  )
  const domain = createDomain(store)

  const effect = domain.effect('eff')
  effect.use(used)
  effect.done.watch(usedDone)
  const event: Event<'ev', {foo: 'bar'}> = domain.event('event1')
  event.epic(data$ => data$.map(effect))
  await event('ev').send()
  expect(used).toHaveBeenCalledTimes(1)
  expect(usedDone).toHaveBeenCalledTimes(1)
})

test('port', async() => {
  const fn = jest.fn()
  const used = jest.fn((state, x) => console.log(x, state))
  const usedEff = jest.fn((state, x) => console.log(x, state))
  const store: Store<{foo: 'bar'}> = createStore(
    (s, x) => (fn(x), console.log(x), s),
    applyMiddleware(effectorMiddleware),
  )
  const domain: Domain<{ foo: 'bar' }> = createDomain(store)
  const event = domain.event('port-event')
  const eff = domain.event('port-effect')
  event.watch(used)
  eff.watch(usedEff)
  const str$ = periodic(100)
    .scan((a, b) => a + b, 0)
    .take(10)
    // .map(event)

  domain.port(str$.map(event))
  await new Promise(rs => setTimeout(rs, 1500))
  expect(used).toHaveBeenCalledTimes(10)

  domain.port(str$.map(eff))
  await new Promise(rs => setTimeout(rs, 1500))
  expect(usedEff).toHaveBeenCalledTimes(10)
})

test('both return and send', async() => {
  const fn = jest.fn()
  const used = jest.fn(x => Promise.resolve(x))
  const usedDone = jest.fn(x => Promise.resolve(x))
  const store: Store<{foo: 'bar'}> = createStore(
    (s, x) => (fn(x), console.log(x), s),
    applyMiddleware(effectorMiddleware),
  )
  const domain = rootDomain()

  const effect = domain.effect('eff')
  effect.use(used)
  effect.done.watch(usedDone)
  const event: Event<'ev', {foo: 'bar'}> = domain.event('event1')
  event.epic(data$ => data$.map(e => effect(e).send()))
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
    applyMiddleware(effectorMiddleware),
  )
  const domain = createDomain(store, 'with-prefix')

  const event = domain.typeConstant('TYPE_CONST')
  expect(event.getType()).toBe('TYPE_CONST')
  event.epic(data$ =>
    data$.map(e => {
      used(e)
    }),
  )

  console.log(event)
  store.dispatch({type: 'TYPE_CONST', payload: 'bar'})
  expect(event('bar')).toMatchObject({type: 'TYPE_CONST', payload: 'bar'})
  expect(event).toBeDefined()
  await event('bar').send()
  expect(used).toHaveBeenCalledTimes(2)
})

test('subscription', async() => {
  const fn = jest.fn()
  const used = jest.fn(x => console.log(x))
  const store: Store<{foo: 'bar'}> = createStore(
    (s, x) => s,
    applyMiddleware(effectorMiddleware),
  )
  const domain = createDomain(store)

  const eff = domain.effect('TYPE_CONST')
  expect(() => {
    from(eff).observe(fn)
  }).not.toThrow()
  const event = domain.event('ev')
  expect(() => {
    from(event).observe(fn)
  }).not.toThrow()
  await event('').send()
  await eff('').send()
  expect(fn).toHaveBeenCalledTimes(2)
})

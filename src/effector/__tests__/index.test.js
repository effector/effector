//@flow

import {createEvent, type Event} from 'effector/event'
import {combine} from '../combine'

import {createStoreObject, createStore, type Store} from 'effector/store'
import {show} from 'effector/fixtures/showstep'

import {spy} from 'effector/fixtures'

test('graphite', () => {
  const fn = jest.fn()
  const fn1 = jest.fn()
  const foo: Event<number> = createEvent('foo')
  const bar = foo.map(x => (fn(x), x + 1))
  const store1: Store<string> = createStore('foo').on(bar, (state, bar) =>
    [state, bar].join(' | '),
  )
  const store2 = store1.map(e => e.length)
  const unsub1 = bar.watch(fn1)
  foo(0)
  foo(10)
  expect(fn).toHaveBeenCalledTimes(2)
  expect(store1.getState()).toBe('foo | 1 | 11')
  // expect(foo.graphite.seq).toMatchSnapshot('foo seq')
  // expect(bar.graphite.seq).toMatchSnapshot('bar seq')
  const showBar = show(bar.graphite)
  console.log(showBar)

  expect(showBar).toMatchSnapshot('show bar')
  unsub1()
  const showBar2 = show(bar.graphite)
  console.log(showBar2)
  expect(showBar2).toMatchSnapshot('show bar')
  // expect(bar.graphite.seq).toMatchSnapshot('bar seq')
  foo(100)
  expect(fn1).toHaveBeenCalledTimes(2)
  // expect(store1.graphite.seq).toMatchSnapshot('store1 seq')
  // expect(store2.graphite.seq).toMatchSnapshot('store2 seq')
  const showFoo = show(foo.graphite)
  const showStore = show(store1.graphite)
  const showStore2 = show(store2.graphite)
  console.log(showFoo)
  console.log(showStore)
  console.log(showStore2)
  expect(showFoo).toMatchSnapshot('show foo')
  expect(showStore).toMatchSnapshot('show store1')
  expect(showStore2).toMatchSnapshot('show store2')
})

test('showcase', () => {
  const foo = createEvent('foo')
  const bar = createEvent('bar')

  const a = createStore(1)
  const b = createStore(2)
  const bigStore = createStoreObject({a, b})
  const mapped = bigStore.map(s => s.a)

  a.on(foo, n => n + 1)
  b.on(bar, n => n + 1)

  mapped.watch(spy)

  foo()
  foo()

  bar()
  bar()
  bar()
  bar()

  expect(show(a.graphite)).toMatchSnapshot('store a')
  expect(show(foo.graphite)).toMatchSnapshot('event foo')
  expect(show(mapped.graphite)).toMatchSnapshot('mapped')
  expect(spy).toHaveBeenCalledTimes(3)
  const first = createStore('s')
  const second = createStore('h')
  const third = createStore('i')
  const status = combine(first, second, third, (a, b, c) => [a, b, c].join(''))
  expect(status.getState()).toBe('shi')
})

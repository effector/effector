//@flow

import * as Api from '../api'
import {createEvent} from '../api'
import {combine} from '../combine'
import * as Type from '../index.h'
import {createStore} from '../../store/createStore'
import {createStoreObject} from '../../store/createStoreObject'
import {show} from '../datatype/step/show'

test('graphite', () => {
 const fn = jest.fn()
 const fn1 = jest.fn()
 const foo: Type.Event<number> = Api.createEvent('foo')
 const bar = foo.map(x => (fn(x), x + 1))
 const store1: Type.Store<string> = createStore('foo').on(bar, (state, bar) =>
  [state, bar].join(' | '),
 )
 const store2 = store1.map(e => e.length)
 const unsub1 = bar.watch(fn1)
 foo(0)
 foo(10)
 expect(fn).toHaveBeenCalledTimes(2)
 expect(store1.getState()).toBe('foo | 1 | 11')
 expect(foo.graphite.seq).toMatchSnapshot('foo seq')
 expect(bar.graphite.seq).toMatchSnapshot('bar seq')
 const showBar = show(bar.graphite.seq)
 console.log(showBar)

 expect(showBar).toMatchSnapshot('show bar')
 unsub1()
 const showBar2 = show(bar.graphite.seq)
 console.log(showBar2)
 expect(showBar2).toMatchSnapshot('show bar')
 expect(bar.graphite.seq).toMatchSnapshot('bar seq')
 foo(100)
 expect(fn1).toHaveBeenCalledTimes(2)
 expect(store1.graphite.seq).toMatchSnapshot('store1 seq')
 expect(store2.graphite.seq).toMatchSnapshot('store2 seq')
 const showFoo = show(foo.graphite.seq)
 const showStore = show(store1.graphite.seq)
 const showStore2 = show(store2.graphite.seq)
 console.log(showFoo)
 console.log(showStore)
 console.log(showStore2)
 expect(showFoo).toMatchSnapshot('show foo')
 expect(showStore).toMatchSnapshot('show store1')
 expect(showStore2).toMatchSnapshot('show store2')
})

test('showcase', () => {
 const fn = jest.fn()
 const foo = createEvent('foo')
 const bar = createEvent('bar')

 const a = createStore(1)
 const b = createStore(2)
 const bigStore = createStoreObject({a, b})
 const mapped = bigStore.map(s => s.a)

 a.on(foo, n => n + 1)
 b.on(bar, n => n + 1)

 mapped.watch(fn)

 foo()
 foo()

 bar()
 bar()
 bar()
 bar()

 expect(show(a.graphite.seq)).toMatchSnapshot('store a')
 expect(show(foo.graphite.seq)).toMatchSnapshot('event foo')
 expect(show(mapped.graphite.seq)).toMatchSnapshot('mapped')
 expect(fn).toHaveBeenCalledTimes(3)
 const first = createStore('s')
 const second = createStore('h')
 const third = createStore('i')
 const status = combine(first, second, third, (a, b, c) => [a, b, c].join(''))
 expect(status.getState()).toBe('shi')
})

//@flow
window.__DEV__ = false
const expect = window.suite.expect
const jest = window.suite.jest
const {createStore, createEvent, createStoreObject, combine} = window.effector
const TIMES = 400
function test(_, fn) {
  for (let i = 0; i < TIMES; i++) {
    fn()
  }
}

console.profile('no dull updates')
test('no dull updates', () => {
  const fn1 = (...args) => {} // jest.fn()
  const fn2 = (...args) => {} // jest.fn()
  const fn3 = (...args) => {} // jest.fn()
  const store = createStore(false)
  const e1 = createEvent('e1')
  const e2 = createEvent('e2')
  store.watch(fn1)
  store.on(e1, (_, payload) => payload)
  store.on(e2, (_, p) => _ === p)
  const nextStore = store.map(x => (fn2(x), x))
  nextStore.watch(fn3)
  const results = []
  store.watch(e => results.push('store', e))
  // nextStore.watch(e => console.log('next store', e))
  e1(false)
  e1(true)
  e1(false)
  e2(false)
  e2(false)
  // expect(fn1.mock.calls).toMatchSnapshot()
  // expect(fn2.mock.calls).toMatchSnapshot()
  // expect(fn3.mock.calls).toMatchSnapshot()
  // expect(fn1).toHaveBeenCalledTimes(5)
  // expect(fn2).toHaveBeenCalledTimes(5)
  // expect(fn3).toHaveBeenCalledTimes(5)
  {
    const foo = createEvent('foo')
    const bar = createEvent('bar')

    const a = createStore(1)
    const b = createStore(2)
    const bigStore = createStoreObject({a, b})
    const mapped = bigStore.map(s => s.a)

    a.on(foo, n => n + 1)
    b.on(bar, n => n + 1)
    let spyC = 0
    mapped.watch(arg => {
      spyC += 1
    })

    foo()
    foo()

    bar()
    bar()
    bar()
    bar()

    // expect(show(a.graphite.seq)).toMatchSnapshot('store a')
    // expect(show(foo.graphite.seq)).toMatchSnapshot('event foo')
    // expect(show(mapped.graphite.seq)).toMatchSnapshot('mapped')
    // expect(spy).toHaveBeenCalledTimes(3)

    const first = createStore('s')
    const second = createStore('h')
    const third = createStore('i')
    const status = combine(first, second, third, (a, b, c) =>
      [a, b, c].join(''),
    )
  }
})

console.profileEnd()

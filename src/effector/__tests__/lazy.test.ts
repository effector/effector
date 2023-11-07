import {
  createStore,
  createEvent,
  combine,
  Store,
  Event,
  Effect,
  Node,
} from 'effector'

function getNode(unit: Store<any> | Event<any> | Effect<any, any, any>): Node {
  return (unit as any).graphite
}

function getLazy(store: Store<any>) {
  return getNode(store).lazy!
}

test('combine basic case', () => {
  const upd = createEvent()
  const $foo = createStore(0)
  const $bar = combine($foo, n => n)
  const $baz = combine($bar, n => n)
  $foo.on(upd, n => n + 1)

  expect(getLazy($bar).active).toBe(false)

  const unwatch = $baz.watch(() => {})
  expect(getLazy($bar).active).toBe(true)
  unwatch()
  expect(getLazy($bar).active).toBe(false)
})

//@flow

import {createEvent, type Event} from '..'

test('event.create single argument', () => {
  const foo = createEvent<number>('foo')
  const oldCreate = foo.create
  foo.create = jest.fn((payload, fullName, args) =>
    oldCreate(payload, fullName, args),
  )
  const baz = jest.fn()
  foo.watch(baz)
  foo(100)
  foo(200)
  foo(300)
  expect(baz.mock.calls).toMatchSnapshot()
  expect(foo.create.mock.calls).toMatchSnapshot()
})

type FnEvent<Fn> = Fn & Event<any>

test('event.create multiple arguments', () => {
  const bar: FnEvent<(number, string) => number> = createEvent<number>('bar')
  const oldCreate = bar.create
  bar.create = jest.fn((payload, fullName, args) =>
    oldCreate([payload, ...args], fullName, []),
  )
  const baz = jest.fn(payload => {})
  bar.watch(baz)
  bar(-2, 'foo')
  bar(-3, 'bar')
  bar(-2, 'baz')
  expect(baz.mock.calls).toMatchSnapshot()
  expect(bar.create.mock.calls).toMatchSnapshot()
})

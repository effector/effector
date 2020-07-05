import {merge, createEvent} from 'effector'
import {argumentHistory} from 'effector/fixtures'

test('merge', () => {
  const fn = jest.fn()
  const foo = createEvent<number>()
  const bar = createEvent<number>()

  const baz = merge([foo, bar])

  baz.watch(v => fn(v))

  foo(1)
  bar(2)

  expect(argumentHistory(fn)).toMatchInlineSnapshot(`
    Array [
      1,
      2,
    ]
  `)
})

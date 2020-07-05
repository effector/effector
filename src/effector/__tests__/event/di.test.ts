import {createEvent} from 'effector'
import {argumentHistory} from 'effector/fixtures'

test('event.create single argument', () => {
  const foo = createEvent<number>() as any
  const oldCreate = foo.create
  foo.create = jest.fn((payload, args) => oldCreate(payload, args))
  const baz = jest.fn()
  foo.watch(baz)
  foo(100)
  foo(200)
  foo(300)
  expect(argumentHistory(baz)).toMatchInlineSnapshot(`
    Array [
      100,
      200,
      300,
    ]
  `)
  expect(foo.create.mock.calls).toMatchInlineSnapshot(`
    Array [
      Array [
        100,
        Array [],
        Array [],
      ],
      Array [
        200,
        Array [],
        Array [],
      ],
      Array [
        300,
        Array [],
        Array [],
      ],
    ]
  `)
})

test('event.create multiple arguments', () => {
  const baz = jest.fn()
  const bar = createEvent() as any
  const oldCreate = bar.create
  bar.create = jest.fn((payload, args) => oldCreate([payload, ...args], []))
  bar.watch(baz)
  bar(-2, 'foo')
  bar(-3, 'bar')
  bar(-2, 'baz')
  expect(argumentHistory(baz)).toMatchInlineSnapshot(`
    Array [
      Array [
        -2,
        "foo",
      ],
      Array [
        -3,
        "bar",
      ],
      Array [
        -2,
        "baz",
      ],
    ]
  `)
  expect(bar.create.mock.calls).toMatchInlineSnapshot(`
    Array [
      Array [
        -2,
        Array [
          "foo",
        ],
        Array [
          "foo",
        ],
      ],
      Array [
        -3,
        Array [
          "bar",
        ],
        Array [
          "bar",
        ],
      ],
      Array [
        -2,
        Array [
          "baz",
        ],
        Array [
          "baz",
        ],
      ],
    ]
  `)
})

//@flow

import {argumentHistory} from 'effector/fixtures'
import {createEvent, createStore} from 'effector'

it('supports stores', () => {
  const fn = jest.fn()
  const newWord = createEvent<string>()
  const a = createStore('word').on(newWord, (_, word) => word)

  const b = createStore(['word'])

  b.on(a, (b, a) => {
    fn({b, a})
    return [...b, a]
  })

  newWord('lol')
  expect(fn).toHaveBeenCalledTimes(1)

  newWord('')
  expect(fn).toHaveBeenCalledTimes(2)
  newWord(' ')
  expect(fn).toHaveBeenCalledTimes(3)

  newWord('long word')
  expect(fn).toHaveBeenCalledTimes(4)
  expect(argumentHistory(fn)).toMatchInlineSnapshot(`
    Array [
      Object {
        "a": "lol",
        "b": Array [
          "word",
        ],
      },
      Object {
        "a": "",
        "b": Array [
          "word",
          "lol",
        ],
      },
      Object {
        "a": " ",
        "b": Array [
          "word",
          "lol",
          "",
        ],
      },
      Object {
        "a": "long word",
        "b": Array [
          "word",
          "lol",
          "",
          " ",
        ],
      },
    ]
  `)
})
it('supports events', () => {
  const fn = jest.fn()
  const trigger = createEvent()

  const b = createStore(0)

  b.on(trigger, (b, trigger) => {
    fn({b, trigger})
    return b + 1
  })

  trigger('lol')
  expect(fn).toHaveBeenCalledTimes(1)

  trigger('')
  expect(fn).toHaveBeenCalledTimes(2)
  trigger(' ')
  expect(fn).toHaveBeenCalledTimes(3)

  trigger('long word')
  expect(fn).toHaveBeenCalledTimes(4)
  expect(argumentHistory(fn)).toMatchInlineSnapshot(`
    Array [
      Object {
        "b": 0,
        "trigger": "lol",
      },
      Object {
        "b": 1,
        "trigger": "",
      },
      Object {
        "b": 2,
        "trigger": " ",
      },
      Object {
        "b": 3,
        "trigger": "long word",
      },
    ]
  `)
})
it('replace old links', () => {
  const event = createEvent()

  const store = createStore('')
    .on(event, () => 'a')
    .on(event, () => 'b')

  event()

  expect(store.getState()).toBe('b')

  store.off(event)

  store.setState('x')

  event()

  expect(store.getState()).toBe('x')
})

it('supports array of events', () => {
  const fn = jest.fn()
  const triggerA = createEvent()
  const triggerB = createEvent()

  const b = createStore(0)

  b.on([triggerA, triggerB], (b, payload) => {
    fn({b, payload})
    return b + 1
  })

  triggerA('lol')
  expect(fn).toHaveBeenCalledTimes(1)

  triggerB('')
  expect(fn).toHaveBeenCalledTimes(2)
  triggerA(' ')
  expect(fn).toHaveBeenCalledTimes(3)

  triggerB('long word')
  expect(fn).toHaveBeenCalledTimes(4)
  expect(argumentHistory(fn)).toMatchInlineSnapshot(`
    Array [
      Object {
        "b": 0,
        "payload": "lol",
      },
      Object {
        "b": 1,
        "payload": "",
      },
      Object {
        "b": 2,
        "payload": " ",
      },
      Object {
        "b": 3,
        "payload": "long word",
      },
    ]
  `)
})
it('supports array of stores', () => {
  const fn = jest.fn()
  const hello = createEvent<string>()
  const world = createEvent<string>()
  const $clockA = createStore('hello').on(hello, (_, word) => word)
  const $clockB = createStore('world').on(world, (_, word) => word)

  const $source = createStore(['word'])

  $source.on([$clockA, $clockB], (state, payload) => {
    fn({state, payload})
    return [...state, payload]
  })

  hello('lol')
  expect(fn).toHaveBeenCalledTimes(1)

  world('')
  expect(fn).toHaveBeenCalledTimes(2)
  hello(' ')
  expect(fn).toHaveBeenCalledTimes(3)

  world('long word')
  expect(fn).toHaveBeenCalledTimes(4)
  expect(argumentHistory(fn)).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": "lol",
        "state": Array [
          "word",
        ],
      },
      Object {
        "payload": "",
        "state": Array [
          "word",
          "lol",
        ],
      },
      Object {
        "payload": " ",
        "state": Array [
          "word",
          "lol",
          "",
        ],
      },
      Object {
        "payload": "long word",
        "state": Array [
          "word",
          "lol",
          "",
          " ",
        ],
      },
    ]
  `)
})

it('supports array of stores and events', () => {
  const fn = jest.fn()
  const hello = createEvent<string>()
  const world = createEvent<string>()
  const $clockA = createStore('hello').on(hello, (_, word) => word)

  const $source = createStore(['word'])

  $source.on([$clockA, world], (state, payload) => {
    fn({state, payload})
    return [...state, payload]
  })

  hello('lol')
  expect(fn).toHaveBeenCalledTimes(1)

  world('')
  expect(fn).toHaveBeenCalledTimes(2)
  hello(' ')
  expect(fn).toHaveBeenCalledTimes(3)

  world('long word')
  expect(fn).toHaveBeenCalledTimes(4)
  expect(argumentHistory(fn)).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": "lol",
        "state": Array [
          "word",
        ],
      },
      Object {
        "payload": "",
        "state": Array [
          "word",
          "lol",
        ],
      },
      Object {
        "payload": " ",
        "state": Array [
          "word",
          "lol",
          "",
        ],
      },
      Object {
        "payload": "long word",
        "state": Array [
          "word",
          "lol",
          "",
          " ",
        ],
      },
    ]
  `)
})

import {createStore, createEvent, createEffect} from 'effector'
import {argumentHistory} from 'effector/fixtures'

test('createStore throw on undefined', () => {
  expect(() => createStore(undefined)).toThrowErrorMatchingInlineSnapshot(
    `"current state can't be undefined, use null instead"`,
  )
})

describe('.map', () => {
  it('supports basic mapping', () => {
    const fn = jest.fn()
    const newWord = createEvent/*:: <string> */()
    const a = createStore('word').on(newWord, (_, word) => word)

    const b = a.map(word => word.length)

    const sum = b.map((ln, prevLn) => ln + prevLn, 0)

    sum.watch(fn)

    expect(a.getState()).toBe('word')
    expect(b.getState()).toBe(4)
    expect(sum.getState()).toBe(4)

    newWord('lol')

    expect(a.getState()).toBe('lol')
    expect(b.getState()).toBe(3)
    expect(sum.getState()).toBe(7)

    newWord('long word')

    expect(a.getState()).toBe('long word')
    expect(b.getState()).toBe(9)
    expect(sum.getState()).toBe(16)

    expect(fn).toHaveBeenCalledTimes(3)

    newWord('')

    expect(fn).toHaveBeenCalledTimes(3)
  })
  it('calls given handler with current state as second argument', () => {
    const fn = jest.fn()
    const inc = createEvent()
    const store = createStore(0).on(inc, x => x + 1)
    const computed = store.map((x, state) => `(${x}, ${state})`)
    computed.watch(fn)
    inc()
    inc()
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        "(0, undefined)",
        "(1, (0, undefined))",
        "(2, (1, (0, undefined)))",
      ]
    `)
  })
  it('accepts initial state as second argument', () => {
    const fn = jest.fn()
    const inc = createEvent()
    const store = createStore(0).on(inc, x => x + 1)
    const computed = store.map((x, state) => `(${x}, ${state})`, 'initial')
    computed.watch(fn)
    inc()
    inc()
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        "(0, initial)",
        "(1, (0, initial))",
        "(2, (1, (0, initial)))",
      ]
    `)
  })

  it('supports nested mapping with updates skipping', () => {
    const a = createStore(null)
    const f = jest.fn(a => {
      if (a) return a.id
    })
    const g = jest.fn(a => a.nice)
    const b = a.map(f)
    const c = b.map(g)

    expect(c.getState()).toBe(undefined)
    expect(g).toHaveBeenCalledTimes(0)
  })
})

describe('.watch', () => {
  it('supports functions', () => {
    const fn = jest.fn()
    const newWord = createEvent/*:: <string> */()
    const a = createStore('word').on(newWord, (_, word) => word)

    const b = a.map(word => word.length)

    const sum = b.map((ln, prevLn) => ln + prevLn, 0)

    sum.watch(fn)

    newWord('lol')

    newWord('long word')

    expect(fn).toHaveBeenCalledTimes(3)

    newWord('')

    expect(fn).toHaveBeenCalledTimes(3)
  })
  it('returns unsubscribe function', () => {
    const fn = jest.fn()
    const newWord = createEvent/*:: <string> */()
    const a = createStore('word').on(newWord, (_, word) => word)

    const b = a.map(word => word.length)

    const sum = b.map((ln, prevLn) => ln + prevLn, 0)

    const unsub = sum.watch(sum => {
      fn(sum)
    })

    newWord('lol')

    newWord('long word [1]')
    expect(fn).toHaveBeenCalledTimes(3)

    unsub()

    newWord('long word _ [2]')
    expect(fn).toHaveBeenCalledTimes(3)
  })
  it('supports events', () => {
    const fn = jest.fn()
    const newWord = createEvent/*:: <string> */('new word')
    const spyEvent = createEvent()
    const a = createStore('word').on(newWord, (_, word) => word)

    const b = a.map(word => word.length)

    const sum = b.map((ln, prevLn) => ln + prevLn, 0)

    sum.watch(spyEvent, (store, event) => fn({store, event}))

    newWord('lol')
    expect(fn).toHaveBeenCalledTimes(0)
    spyEvent(1)
    spyEvent(2)
    expect(fn).toHaveBeenCalledTimes(2)

    newWord('')
    expect(fn).toHaveBeenCalledTimes(2)
    newWord(' ')
    expect(fn).toHaveBeenCalledTimes(2)

    spyEvent(3)
    newWord('long word')
    expect(fn).toHaveBeenCalledTimes(3)
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
Array [
  Object {
    "event": 1,
    "store": 7,
  },
  Object {
    "event": 2,
    "store": 7,
  },
  Object {
    "event": 3,
    "store": 8,
  },
]
`)
  })
  it('supports effects', () => {
    const fn = jest.fn()
    const newWord = createEvent/*:: <string> */('new word')
    const spyEvent = createEffect()
    spyEvent.use(args => args)
    const a = createStore('word').on(newWord, (_, word) => word)

    const b = a.map(word => word.length)

    const sum = b.map((ln, prevLn) => ln + prevLn, 0)

    sum.watch(spyEvent, (store, event) => fn({store, event}))

    newWord('lol')
    expect(fn).toHaveBeenCalledTimes(0)
    spyEvent(1)
    spyEvent(2)
    expect(fn).toHaveBeenCalledTimes(2)

    newWord('')
    expect(fn).toHaveBeenCalledTimes(2)
    newWord(' ')
    expect(fn).toHaveBeenCalledTimes(2)

    spyEvent(3)
    newWord('long word')
    expect(fn).toHaveBeenCalledTimes(3)
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
Array [
  Object {
    "event": 1,
    "store": 7,
  },
  Object {
    "event": 2,
    "store": 7,
  },
  Object {
    "event": 3,
    "store": 8,
  },
]
`)
  })
})

describe('.off', () => {
  it('allows to unsubscribe store from event', () => {
    const fn = jest.fn()
    const newWord = createEvent/*:: <string> */()
    const a = createStore('word').on(newWord, (_, word) => word)

    const b = a.map(word => word.length)

    const sum = b.map((ln, prevLn) => ln + prevLn, 0)

    sum.watch(fn)

    expect(a.getState()).toBe('word')
    expect(b.getState()).toBe(4)
    expect(sum.getState()).toBe(4)

    newWord('lol')

    expect(a.getState()).toBe('lol')
    expect(b.getState()).toBe(3)
    expect(sum.getState()).toBe(7)

    a.off(newWord)

    newWord('long word')

    expect(a.getState()).toBe('lol')
    expect(b.getState()).toBe(3)
    expect(sum.getState()).toBe(7)

    expect(fn).toHaveBeenCalledTimes(2)

    newWord('')

    expect(fn).toHaveBeenCalledTimes(2)
  })
  it('returns store itself', () => {
    const newWord = createEvent()
    const a = createStore('word').on(newWord, (_, word) => word)
    expect(a.off(newWord)).toBe(a)
  })
})

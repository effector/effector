import {isEqual} from '../lib/isEqual'

jest.mock('vue', () => require('vue-next'))

test('primitives', () => {
  expect(isEqual(1, 1)).toBe(true)
  expect(isEqual('a', 'a')).toBe(true)
  expect(isEqual(NaN, NaN)).toBe(true)
  expect(isEqual(null, null)).toBe(true)
  expect(isEqual(1, '1')).toBe(false)
  expect(isEqual(null, {})).toBe(false)
  expect(isEqual(undefined, null)).toBe(false)
})

test('plain objects', () => {
  expect(isEqual({a: {b: 1}}, {a: {b: 1}})).toBe(true)
  expect(isEqual({a: {b: 1}}, {a: {b: 2}})).toBe(false)
  expect(isEqual({a: 1}, {a: 1, b: 2})).toBe(false)
  expect(isEqual({a: undefined}, {b: undefined})).toBe(false)
  /** An object with no prototype holds plain data too. */
  expect(isEqual(Object.create(null), {})).toBe(true)
})

test('arrays', () => {
  expect(isEqual([1, [2]], [1, [2]])).toBe(true)
  expect(isEqual([1, 2], [2, 1])).toBe(false)
  expect(isEqual([1], [1, 2])).toBe(false)
  expect(isEqual([1], {0: 1})).toBe(false)
})

test('dates', () => {
  expect(isEqual(new Date(0), new Date(0))).toBe(true)
  expect(isEqual(new Date(0), new Date(1))).toBe(false)
  expect(isEqual(new Date(NaN), new Date(NaN))).toBe(true)
})

test('regexps', () => {
  expect(isEqual(/a/g, /a/g)).toBe(true)
  expect(isEqual(/a/g, /a/i)).toBe(false)
  expect(isEqual(/a/, /b/)).toBe(false)
})

test('maps', () => {
  expect(isEqual(new Map([['a', 1]]), new Map([['a', 1]]))).toBe(true)
  expect(isEqual(new Map([['a', 1]]), new Map([['a', 2]]))).toBe(false)
  expect(isEqual(new Map([['a', 1]]), new Map([['b', 1]]))).toBe(false)
  expect(isEqual(new Map(), new Map([['a', 1]]))).toBe(false)
  /** A copy has its own keys, so an object key is matched by content. */
  expect(
    isEqual(new Map([[{id: 1}, {n: 1}]]), new Map([[{id: 1}, {n: 1}]])),
  ).toBe(true)
  expect(
    isEqual(new Map([[{id: 1}, {n: 1}]]), new Map([[{id: 1}, {n: 2}]])),
  ).toBe(false)
})

test('sets', () => {
  expect(isEqual(new Set([1, 2]), new Set([1, 2]))).toBe(true)
  expect(isEqual(new Set([1, 2]), new Set([2, 1]))).toBe(true)
  expect(isEqual(new Set([1]), new Set([1, 2]))).toBe(false)
  expect(isEqual(new Set([{id: 1}]), new Set([{id: 1}]))).toBe(true)
  expect(isEqual(new Set([{id: 1}]), new Set([{id: 2}]))).toBe(false)
})

test('array buffers and their views', () => {
  expect(isEqual(new Uint8Array([1, 2]), new Uint8Array([1, 2]))).toBe(true)
  expect(isEqual(new Uint8Array([1, 2]), new Uint8Array([1, 3]))).toBe(false)
  expect(isEqual(new Uint8Array([1]), new Uint8Array([1, 2]))).toBe(false)
  /** The kind of the view is a part of the value. */
  expect(isEqual(new Uint8Array([1, 0]), new Uint16Array([1]))).toBe(false)
  expect(isEqual(new Float64Array([1.5]), new Float64Array([1.5]))).toBe(true)
  expect(
    isEqual(new Uint8Array([1, 2]).buffer, new Uint8Array([1, 2]).buffer),
  ).toBe(true)
  expect(
    isEqual(new Uint8Array([1, 2]).buffer, new Uint8Array([1, 3]).buffer),
  ).toBe(false)
})

test('instances of other classes are compared by reference', () => {
  class Point {
    constructor(public x: number) {}
  }

  const point = new Point(1)

  expect(isEqual(point, point)).toBe(true)
  expect(isEqual(new Point(1), new Point(1))).toBe(false)
  /** A copy has lost the prototype, and its content is what is compared. */
  expect(isEqual({x: 1}, new Point(1))).toBe(true)
})

test('a value that refers to itself', () => {
  const build = () => {
    const value: any = {name: 'John'}
    value.self = value
    return value
  }

  expect(isEqual(build(), build())).toBe(true)

  const other = build()
  other.name = 'Alan'

  expect(isEqual(build(), other)).toBe(false)
})

test('a value that refers to itself through a set', () => {
  const build = () => {
    const value: any = {items: new Set()}
    value.items.add({parent: value})
    return value
  }

  expect(isEqual(build(), build())).toBe(true)
})

test('nested dates, sets and maps', () => {
  const build = () => ({
    list: [new Date(0), new Set([1])],
    meta: new Map<string, unknown>([['at', new Date(0)]]),
  })

  expect(isEqual(build(), build())).toBe(true)

  const other = build()
  other.meta.set('at', new Date(1))

  expect(isEqual(build(), other)).toBe(false)
})

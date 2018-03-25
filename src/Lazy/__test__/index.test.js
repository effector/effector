//@flow strict

import {ap, map, tap, join, chain, fromThunk, fromValue} from '..'

test('engine smoke', async() => {
  const val1 = fromValue(0)
  const fn1 = fromValue((x: number) => x + 1)
  expect(val1.read()).toBe(0)
  const val2 = ap(fn1, val1)

  console.log(val2)
  console.log(val2.read())

  expect(val2).toBeDefined()
})

test('should throw on self-references', () => {
  const val1 = fromThunk(() => val1.read())
  expect(() => val1.read()).toThrowErrorMatchingSnapshot()
})

describe('map', () => {
  describe("re-read don't change map of ...", () => {
    test('...value', () => {
      const val1 = fromValue(0)
      const fn1 = (x: number) => x + 1

      expect(val1.read()).toBe(0)
      const val2 = map(fn1, val1)
      expect(val2.read()).toBe(1)
      expect(val2.read()).toBe(1)
    })
    test('...thunk', () => {
      const val1 = fromThunk(() => 0)
      const fn1 = (x: number) => x + 1

      expect(val1.read()).toBe(0)
      const val2 = map(fn1, val1)
      expect(val2.read()).toBe(1)
      expect(val2.read()).toBe(1)
    })
  })
  test('apply value to function more than once', () => {
    const val1 = fromValue(0)
    const fn1 = (x: number) => x + 1

    expect(val1.read()).toBe(0)
    const val2 = map(fn1, val1)
    const val3 = map(fn1, val2)
    expect(val3.read()).toBe(2)
    expect(val3.read()).toBe(2)
  })
  test('re-read returns exactly the same object', () => {
    const val1 = fromValue([0])
    const fn1 = (x: number[]) => [...x, x.length]

    const val2 = map(fn1, val1)
    expect(val2.read()).toBe(val2.read())
  })
  test(`re-read of map(fn, val) should not be the same
      as re-read of map(fn, map(fn, val))`, () => {
    const val1 = fromValue([0])
    const fn1 = (x: number[]) => [...x, x.length]

    const val2 = map(fn1, val1)
    const val3 = map(fn1, val2)
    expect(val2.read()).not.toBe(val3.read())
    expect(val3.read()).toEqual([0, 1, 2])
    expect(val3.read()).toBe(val3.read())
  })
})

describe('tap', () => {
  test("re-read don't change value", () => {
    const val1 = fromValue(0)
    const fn1 = jest.fn()

    expect(val1.read()).toBe(0)
    const val2 = tap(fn1, val1)
    expect(val2.read()).toBe(0)
    expect(val2.read()).toBe(0)
    expect(fn1).toHaveBeenCalledTimes(1)
  })
  test('apply value to function more than once', () => {
    const val1 = fromValue(0)
    const fn1 = jest.fn()

    expect(val1.read()).toBe(0)
    const val2 = tap(fn1, val1)
    const val3 = tap(fn1, val2)
    expect(val3.read()).toBe(0)
    expect(val3.read()).toBe(0)
    expect(fn1).toHaveBeenCalledTimes(2)
  })
  test('re-read returns exactly the same object', () => {
    const val1 = fromValue([0])
    const fn1 = (x: number[]) => [...x, x.length]

    const val2 = tap(fn1, val1)
    expect(val2.read()).toBe(val2.read())
  })
  test(`re-read of tap(fn, val) should be the same
      as re-read of tap(fn, tap(fn, val))`, () => {
    const val1 = fromValue([0])
    const fn1 = (x: number[]) => [...x, x.length]

    const val2 = tap(fn1, val1)
    const val3 = tap(fn1, val2)
    expect(val2.read()).toBe(val3.read())
    expect(val3.read()).toEqual([0])
    expect(val3.read()).toBe(val3.read())
  })
})
describe('join', () => {
  test('static value', () => {
    let data = 0
    const value1 = fromThunk(() => data)
    const value2 = fromValue(value1)

    const joined = join(value2)
    expect(joined.read()).toBe(0)
    data = 1
    expect(joined.read()).toBe(1)
  })

  test('thunk value', () => {
    let data = 0
    const value2 = fromThunk(() => fromThunk(() => data))

    const joined = join(value2)
    expect(joined.read()).toBe(0)
    data = 1
    expect(joined.read()).toBe(1)
  })
})

describe('chain', () => {
  test("re-read don't change value", () => {
    const val1 = fromValue(0)
    const fn1 = (x: number) => fromValue(x + 1)

    expect(val1.read()).toBe(0)
    const val2 = chain(fn1, val1)
    expect(val2.read()).toBe(1)
    expect(val2.read()).toBe(1)
  })
  test('apply value to function more than once', () => {
    const val1 = fromValue(0)
    const fn1 = (x: number) => fromValue(x + 1)

    expect(val1.read()).toBe(0)
    const val2 = chain(fn1, val1)
    const val3 = chain(fn1, val2)
    expect(val3.read()).toBe(2)
    expect(val3.read()).toBe(2)
  })
  test('re-read returns exactly the same object', () => {
    const val1 = fromValue([0])
    const fn1 = (x: number[]) => fromValue([...x, x.length])

    const val2 = chain(fn1, val1)
    expect(val2.read()).toBe(val2.read())
  })
  test(`re-read of chain(fn, val) should not be the same
      as re-read of chain(fn, chain(fn, val))`, () => {
    const val1 = fromValue([0])
    const fn1 = (x: number[]) => fromValue([...x, x.length])

    const val2 = chain(fn1, val1)
    const val3 = chain(fn1, val2)
    expect(val2.read()).not.toBe(val3.read())
    expect(val3.read()).toEqual([0, 1, 2])
    expect(val3.read()).toBe(val3.read())
  })
})

// test(`fn1.set(newFunc) should change derived value`, () => {
//   const val1 = fromValue([0])
//   const fn1 = fromValue((x: number[]) => [...x, x.length])

//   const val2 = ap(fn1, val1)
//   const val3 = ap(fn1, val2)
//   expect(val3.read()).toEqual([0, 1, 2])
//   fn1
//   expect(val3.read()).toBe(val3.read())
// })

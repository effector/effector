//@flow strict

import {combine, fromThunk, fromValue} from '..'

test("re-read don't change value", () => {
  const val1 = fromValue(0)
  const fn1 = fromValue((x: number) => x + 1)

  expect(val1.read()).toBe(0)
  const val2 = combine(fn1, val1, (fn, val) => fn(val))
  expect(val2.read()).toBe(1)
  expect(val2.read()).toBe(1)
})
test('apply value to function more than once', () => {
  const val1 = fromValue(0)
  const fn1 = fromValue((x: number) => x + 1)

  expect(val1.read()).toBe(0)
  const val2 = combine(fn1, val1, (fn, val) => fn(val))
  const val3 = combine(fn1, val2, (fn, val) => fn(val))
  expect(val3.read()).toBe(2)
  expect(val3.read()).toBe(2)
})
test('re-read returns exactly the same object', () => {
  const val1 = fromValue([0])
  const fn1 = fromValue((x: number[]) => [...x, x.length])

  const val2 = combine(fn1, val1, (fn, val) => fn(val))
  expect(val2.read()).toBe(val2.read())
})
test(`re-read of combine(fn, val) should not be the same
    as re-read of combine(fn, combine(fn, val))`, () => {
  const val1 = fromValue([0])
  const fn1 = fromValue((x: number[]) => [...x, x.length])

  const val2 = combine(fn1, val1, (fn, val) => fn(val))
  const val3 = combine(fn1, val2, (fn, val) => fn(val))
  expect(val2.read()).not.toBe(val3.read())
  expect(val3.read()).toEqual([0, 1, 2])
  expect(val3.read()).toBe(val3.read())
})
describe(`combine N args`, () => {
  test(`combine(fn)`, () => {
    const data = ['none']
    const val = combine(() => data)
    expect(val.read()).toEqual(['none'])
    expect(val.read()).toBe(val.read())
  })
  test(`combine(a, fn)`, () => {
    const val1 = fromValue([0])
    const val2 = combine(val1, ([x]) => [x, x])

    expect(val2.read()).toEqual([0, 0])
    expect(val2.read()).toBe(val2.read())
  })
  test(`combine(a, b, fn)`, () => {
    const val1 = fromValue([0])
    const fn1 = fromValue((x: number[]) => [...x, x.length])

    const val2 = combine(fn1, val1, (fn1, val) => fn1(val))
    expect(val2.read()).toEqual([0, 1])
    expect(val2.read()).toBe(val2.read())
  })
  test(`combine(a, b, c, fn)`, () => {
    const val1 = fromValue([0])
    const fn1 = fromValue((x: number[]) => [...x, x.length])

    const val2 = combine(fn1, fn1, val1, (fn1, fn2, val) => fn1(fn2(val)))
    expect(val2.read()).toEqual([0, 1, 2])
    expect(val2.read()).toBe(val2.read())
  })
})
test('change of fn should change value', () => {
  const val1 = fromValue(0)
  const inc = (x: number) => x + 1
  const dec = (x: number) => x - 1
  let isInc = true
  const fn1 = fromThunk(() => (isInc ? inc : dec))

  expect(fn1.read()).toBe(inc)

  const val2 = combine(fn1, val1, (fn, val) => fn(val))
  expect(val2.read()).toBe(1)
  isInc = false
  expect(fn1.read()).toBe(dec)
  expect(val2.read()).toBe(-1)
})

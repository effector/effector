//@flow strict

import {ap, fromThunk, fromValue, combineWeak} from '..'

test("re-read don't change value", () => {
 const val1 = fromValue(0)
 const fn1 = fromValue((x: number) => x + 1)

 expect(val1.read()).toBe(0)
 const val2 = ap(fn1, val1)
 expect(val2.read()).toBe(1)
 expect(val2.read()).toBe(1)
})
test('apply value to function more than once', () => {
 const val1 = fromValue(0)
 const fn1 = fromValue((x: number) => x + 1)

 expect(val1.read()).toBe(0)
 const val2 = ap(fn1, val1)
 const val3 = ap(fn1, val2)
 expect(val3.read()).toBe(2)
 expect(val3.read()).toBe(2)
})
test('re-read returns exactly the same object', () => {
 const val1 = fromValue([0])
 const fn1 = fromValue((x: number[]) => [...x, x.length])

 const val2 = ap(fn1, val1)
 expect(val2.read()).toBe(val2.read())
})
test(`re-read of ap(fn, val) should not be the same
      as re-read of ap(fn, ap(fn, val))`, () => {
 const val1 = fromValue([0])
 const fn1 = fromValue((x: number[]) => [...x, x.length])

 const val2 = ap(fn1, val1)
 const val3 = ap(fn1, val2)
 expect(val2.read()).not.toBe(val3.read())
 expect(val3.read()).toEqual([0, 1, 2])
 expect(val3.read()).toBe(val3.read())
})
test('change of fn should change value', () => {
 const val1 = fromValue(0)
 const inc = (x: number) => x + 1
 const dec = (x: number) => x - 1
 let isInc = true
 const fn1 = fromThunk(() => (isInc ? inc : dec))

 expect(fn1.read()).toBe(inc)

 const val2 = ap(fn1, val1)
 expect(val2.read()).toBe(1)
 isInc = false
 expect(fn1.read()).toBe(dec)
 expect(val2.read()).toBe(-1)
})

test('[ap weak] change of fn should not change value', () => {
 const val1 = fromValue(0)
 const inc = (x: number) => x + 1
 const dec = (x: number) => x - 1
 let isInc = true
 const fn1 = fromThunk(() => (isInc ? inc : dec))

 expect(fn1.read()).toBe(inc)

 const val2 = combineWeak(val1, fn1, (val1, fn1) => fn1(val1))
 expect(val2.read()).toBe(1)
 isInc = false
 expect(fn1.read()).toBe(dec)
 expect(val2.read()).toBe(1)
})

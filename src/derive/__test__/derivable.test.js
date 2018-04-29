//@flow

import * as derivable from '..'
import {is, maybeDerive, orDefault} from '..'

test('derive derivable value with function', () => {
 const a = derivable.atom(1)
 const q = derivable.atom(10)
 const b = a.map(d => d + q.get())
 const c = b.map(d => d * q.get())
 expect([b.get(), c.get()]).toEqual([11, 110])

 q.set(20)
 expect([b.get(), c.get()]).toEqual([21, 420])

 a.set(null)
 expect([b.get(), c.get()]).toEqual([20, 400])

 expect(() => {
  //$off
  a.map()
 }).toThrow()

 expect(() => {
  //$off
  a.map(new Date())
 }).toThrow()
})

test('maybe derive derivable (non-null) value with function', () => {
 const a = derivable.atom(1)
 const q = derivable.atom(10)
 const b = maybeDerive(a, d => d + q.get())
 const c = maybeDerive(b, d => d * q.get())
 expect([b.get(), c.get()]).toEqual([11, 110])

 q.set(20)
 expect([b.get(), c.get()]).toEqual([21, 420])

 a.set(null)
 expect([b.get(), c.get()]).toEqual([null, null])

 expect(() => {
  //$off
  maybeDerive(a)
 }).toThrow()
})

test('is method', () => {
 const a = derivable.atom(1)
 const b = derivable.atom(1)
 const fst = is(a, b)
 const snd = is(b, a)
 expect(fst.get()).toBeTruthy()
 expect(snd.get()).toBeTruthy()

 a.set({equals: () => true})
 b.set({equals: () => false})
 expect(fst.get()).toBeTruthy()
 expect(snd.get()).toBeFalsy()
})

test('maybe default prefers passed value or derivable over null or undefined', () => {
 const a = derivable.atom(null)
 const r = orDefault(a, 2)
 expect(r.get()).toBe(2)

 a.set(1)
 expect(r.get()).toBe(1)

 expect(() => {
  //$off expect error
  orDefault(a, null)
 }).toThrow()
})

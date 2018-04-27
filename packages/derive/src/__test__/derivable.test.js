//@flow

import * as derivable from '..'

test('derive derivable value with function', () => {
 const a = derivable.atom(1)
 const q = derivable.atom(10)
 const b = a.derive(d => d + q.get())
 const c = b.derive(d => d * q.get())
 expect([b.get(), c.get()]).toEqual([11, 110])

 q.set(20)
 expect([b.get(), c.get()]).toEqual([21, 420])

 a.set(null)
 expect([b.get(), c.get()]).toEqual([20, 400])

 expect(() => {
  //$off
  a.derive()
 }).toThrow()

 expect(() => {
  //$off
  a.derive(new Date())
 }).toThrow()
})

test('maybe derive derivable (non-null) value with function', () => {
 const a = derivable.atom(1)
 const q = derivable.atom(10)
 const b = a.maybeDerive(d => d + q.get())
 const c = b.maybeDerive(d => d * q.get())
 expect([b.get(), c.get()]).toEqual([11, 110])

 q.set(20)
 expect([b.get(), c.get()]).toEqual([21, 420])

 a.set(null)
 expect([b.get(), c.get()]).toEqual([null, null])

 expect(() => {
  //$off
  a.maybeDerive()
 }).toThrow()
})

test('is method', () => {
 const a = derivable.atom(1)
 const b = derivable.atom(1)
 const fst = a.is(b)
 const snd = b.is(a)
 expect(fst.get()).toBeTruthy()
 expect(snd.get()).toBeTruthy()

 a.set({equals: () => true})
 b.set({equals: () => false})
 expect(fst.get()).toBeTruthy()
 expect(snd.get()).toBeFalsy()
})

test('maybe default prefers passed value or derivable over null or undefined', () => {
 const a = derivable.atom(null)
 const r = a.orDefault(2)
 expect(r.get()).toBe(2)

 a.set(1)
 expect(r.get()).toBe(1)

 expect(() => {
  a.orDefault(null)
 }).toThrow()
})

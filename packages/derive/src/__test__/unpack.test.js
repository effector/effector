//@flow

import * as derivable from '..'

test('unpack extracts value from derivable', () => {
 const a = derivable.atom(1)
 const b = a.derive(d => d + 2)
 expect(derivable.unpack(a)).toEqual(1)
 expect(derivable.unpack(b)).toEqual(3)
})

test('unpack returns non derivable value without change', () => {
 expect(derivable.unpack(1)).toEqual(1)
})

test('struct expects a plain object or a plain array', () => {
 expect(() => {
  derivable.struct()
 }).toThrow()
 expect(() => {
  derivable.struct(53)
 }).toThrow()
 expect(() => {
  derivable.struct(new Date())
 }).toThrow()
 expect(() => {
  derivable.struct(derivable.atom(4))
 }).toThrow()
 derivable.struct({})
 derivable.struct([])
 expect(() => {
  derivable.struct(derivable.struct({}))
 }).toThrow()
})

test('struct turns an array of derivables into a derivable', () => {
 const fib1 = derivable.atom(0)
 const fib2 = derivable.atom(1)
 const fib = derivable.derive(() => fib1.get() + fib2.get())

 const grouped = derivable.struct([fib1, fib2, fib])
 expect([0, 1, 1]).toEqual(grouped.get())

 fib1.set(1)
 expect([1, 1, 2]).toEqual(grouped.get())
})

test('struct turns a map of derivables into a derivable', () => {
 const name = derivable.atom('wilbur')
 const telephone = derivable.atom('0987654321')

 const grouped = derivable.struct({name, telephone})

 expect({name: 'wilbur', telephone: '0987654321'}).toEqual(grouped.get())

 name.set('Jemimah')
 telephone.set('n/a')

 expect({name: 'Jemimah', telephone: 'n/a'}).toEqual(grouped.get())
})

test(`struct actually turns any arbitrarily
        nested structure of maybe-derivables into a derivable`, () => {
 const name = derivable.atom('wilbur')
 const telephone = derivable.atom('0987654321')
 const friend1Name = derivable.atom('Sylvester')
 const friend1Telephone = derivable.atom('blub')

 const grouped = derivable.struct({
  name,
  telephone,
  blood_type: 'AB Negative',
  age: 75,
  friends: [{name: friend1Name, telephone: friend1Telephone}, 'others'],
 })

 expect({
  name: 'wilbur',
  telephone: '0987654321',
  blood_type: 'AB Negative',
  age: 75,
  friends: [{name: 'Sylvester', telephone: 'blub'}, 'others'],
 }).toEqual(grouped.get())

 friend1Name.set('Brittany')

 expect({
  name: 'wilbur',
  telephone: '0987654321',
  blood_type: 'AB Negative',
  age: 75,
  friends: [{name: 'Brittany', telephone: 'blub'}, 'others'],
 }).toEqual(grouped.get())
})

test('struct only accepts plain objects or arrays', () => {
 expect(() => {
  derivable.struct(3)
 }).toThrow()
 expect(() => {
  derivable.struct('blah')
 }).toThrow()
 expect(() => {
  derivable.struct(new Error())
 }).toThrow()
 function A() {}
 expect(() => {
  derivable.struct(new A())
 }).toThrow()
 expect(() => {
  derivable.struct(/\d+/)
 }).toThrow()
})

//@flow

import {atom, unpack, struct, derive} from '..'
import {createStore} from '../..'

test('unpack extracts value from derivable', () => {
 const a = atom(1)
 const b = a.map(d => d + 2)
 expect(unpack(a)).toEqual(1)
 expect(unpack(b)).toEqual(3)
})

test('unpack returns non derivable value without change', () => {
 expect(unpack(1)).toEqual(1)
})

test('struct expects a plain object or a plain array', () => {
 expect(() => {
  //$off expect error
  struct()
 }).not.toThrow()
 expect(() => {
  //$off expect error
  struct(53)
 }).not.toThrow()
 expect(() => {
  //$off expect error
  struct(new Date())
 }).not.toThrow()
 expect(() => {
  //$off expect error
  struct(atom(4))
 }).not.toThrow()
 struct({})
 struct([])
 expect(() => {
  //$off expect error
  struct(struct({}))
 }).not.toThrow()
})

test('struct turns an array of derivables into a derivable', () => {
 const fib1 = atom(0)
 const fib2 = atom(1)
 const fib = derive(() => fib1.get() + fib2.get())

 const grouped = struct([fib1, fib2, fib])
 expect([0, 1, 1]).toEqual(grouped.get())

 fib1.set(1)
 expect([1, 1, 2]).toEqual(grouped.get())
})

test('struct turns a map of derivables into a derivable', () => {
 const name = atom('wilbur')
 const telephone = atom('0987654321')

 const grouped = struct({name, telephone})

 expect({name: 'wilbur', telephone: '0987654321'}).toEqual(grouped.get())

 name.set('Jemimah')
 telephone.set('n/a')

 expect({name: 'Jemimah', telephone: 'n/a'}).toEqual(grouped.get())
})

test(`struct actually turns any arbitrarily
        nested structure of maybe-derivables into a derivable`, () => {
 const name = atom('wilbur')
 const telephone = atom('0987654321')
 const friend1Name = atom('Sylvester')
 const friend1Telephone = atom('blub')

 const grouped = struct({
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
  //$off expect error
  struct(3)
 }).not.toThrow()
 expect(() => {
  //$off expect error
  struct('blah')
 }).not.toThrow()
 expect(() => {
  //$off expect error
  struct(new Error())
 }).not.toThrow()
 function A() {}
 expect(() => {
  //$off expect error
  struct(new A())
 }).not.toThrow()
 expect(() => {
  //$off expect error
  struct(/\d+/)
 }).not.toThrow()
})

test.skip('struct can works with Store, public wrapper object', () => {
 const store1 = createStore(0)
 const struct1 = struct({
  foo: 'bar',
 })
 const struct2 = struct({
  struct1,
  store1,
 })
 expect(struct2.get()).toMatchObject({
  struct1: {foo: 'bar'},
  store1: 0,
 })
 //$todo
 store1.setState(1)
 expect(struct2.get()).toMatchObject({
  struct1: {foo: 'bar'},
  store1: 1,
 })
})

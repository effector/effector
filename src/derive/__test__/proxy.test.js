//@flow

import {atom, lens, withEquality} from '..'

test('can be re-instantiated with custom equality-checking', () => {
 const a = atom(5)
 const amod2map = lens({
  get: () => ({a: a.get() % 2}),
  set: d => a.set(d.a),
 })

 let numReactions = 0
 amod2map.react(() => {
  numReactions++
 })

 expect(numReactions).toBe(1)
 a.set(7)
 expect(numReactions).toBe(2)
 a.set(9)
 expect(numReactions).toBe(3)
 a.set(11)
 expect(numReactions).toBe(4)

 amod2map.set({a: 1})
 expect(numReactions).toBe(5)

 const amod2map2 = withEquality(amod2map, (_ref, _ref2) => _ref.a === _ref2.a)

 let numReactions2 = 0
 amod2map2.react(() => {
  numReactions2++
 })

 expect(numReactions2).toBe(1)
 a.set(7)
 expect(numReactions2).toBe(1)
 a.set(9)
 expect(numReactions2).toBe(1)
 a.set(11)
 expect(numReactions2).toBe(1)

 amod2map2.set({a: 1})
 expect(numReactions2).toBe(1)
})

test('allow multiple atoms to be proxied over', () => {
 const $FirstName = atom('John')
 const $LastName = atom('Steinbeck')
 const $Name = lens({
  get: () => `${$FirstName.get()} ${$LastName.get()}`,
  set(val) {
   const _val$split = val.split(' ')

   const first = _val$split[0]
   const last = _val$split[1]

   $FirstName.set(first)
   $LastName.set(last)
  },
 })

 expect($Name.get()).toBe('John Steinbeck')

 $Name.set('James Joyce')
 expect($Name.get()).toBe('James Joyce')
 expect($FirstName.get()).toBe('James')
 expect($LastName.get()).toBe('Joyce')
})

test('runs `set` opeartions atomically', () => {
 const a = atom('a')
 const b = atom('b')

 let numReactions = 0
 a.react(() => {
  numReactions++
 })
 b.react(() => {
  numReactions++
 })

 lens({
  get() {},
  set() {
   a.set('A')
   expect(numReactions).toBe(2)
   b.set('B')
   expect(numReactions).toBe(2)
  },
 }).set()
 expect(numReactions).toBe(4)
})

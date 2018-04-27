//@flow

import {atom, transact} from '..'

test('can be dereferenced via .get to obtain its current state', () => {
 expect(atom(0).get()).toBe(0)
})

test('can be .set to change its current state', () => {
 const n = atom(0)
 n.set(1)
 expect(n.get()).toBe(1)
})

test('can .update (a la swap in clojure)', () => {
 const n = atom(0)
 n.set(1)
 const double = x => x * 2
 n.update(double)
 expect(n.get()).toBe(2)
 n.update(double)
 expect(n.get()).toBe(4)

 expect(() => {
  //$off expect error
  n.update()
 }).toThrow()
})

test('update with arguments', () => {
 const n = atom(0)
 const sum = (value, ...args) => args.reduce((acc, d) => acc + d, value)
 n.update(sum, 1)
 expect(n.get()).toBe(1)
 n.update(sum, 1, 2)
 expect(n.get()).toBe(4)
 n.update(sum, 1, 2, 3)
 expect(n.get()).toBe(10)
 n.update(sum, 1, 2, 3, 4)
 expect(n.get()).toBe(20)
 expect(() => {
  //$off expect error
  n.update(sum, 1, 2, 3, 4, 5)
 }).toThrow()
})

test('can take on temporary values inside a transaction', () => {
 const a = atom('a')
 transact(abort1 => {
  a.set('b')
  expect(a.get()).toBe('b')
  transact(abort2 => {
   a.set('c')
   expect(a.get()).toBe('c')
   abort2()
  })
  expect(a.get()).toBe('b')
  abort1()
 })
 expect(a.get()).toBe('a')
})

test('should be able to go back to its original value with no ill effects', () => {
 const a = atom('a')
 let reacted = false
 a.react(
  () => {
   reacted = true
  },
  {skipFirst: true},
 )

 // no reaction to begin with
 expect(reacted).toBe(false)

 transact(() => {
  a.set('b')
  a.set('a')
 })

 // no reaction should take place
 expect(reacted).toBe(false)
})

test("can keep transaction values if they are't aborted", () => {
 const a = atom('a')
 transact(() => {
  a.set('b')
  transact(() => {
   a.set('c')
  })
  expect(a.get()).toBe('c')
 })
 expect(a.get()).toBe('c')
})

test('can include an equality-checking function', () => {
 const a = atom(0)
 const b = a.withEquality(() => false)
 // creates a brand new atom
 expect(a).not.toBe(b)

 let numReactions = 0
 a.react(
  () => {
   numReactions++
  },
  {skipFirst: true},
 )
 b.react(
  () => {
   numReactions++
  },
  {skipFirst: true},
 )

 expect(numReactions).toBe(0)
 a.set(0)
 expect(numReactions).toBe(0)
 a.set(0)
 expect(numReactions).toBe(0)

 b.set(0)
 expect(numReactions).toBe(1)
 b.set(0)
 expect(numReactions).toBe(2)
})

test('only likes functions or falsey things for equality functions', () => {
 atom(4).withEquality('')
 expect(() => {
  //$off
  atom(4).withEquality('yo')
 }).toThrow()
 atom(4).withEquality(0)
 expect(() => {
  //$off
  atom(4).withEquality(7)
 }).toThrow()
 atom(4).withEquality(null)
 atom(4).withEquality(void 0)
})

test('the concurrent modification of _reactors bug doesnt happen any more', () => {
 const $A = atom(false)
 const $B = atom(false)

 let A_success = false
 let C_success = false

 $A.react(
  () => {
   A_success = true
  },
  {from: $A},
 )

 const $C = $A.derive(a => a && $B.get())

 $C.react(
  () => {
   C_success = true
  },
  {from: $C},
 )

 expect(A_success).toBe(false)
 expect(C_success).toBe(false)
 // used to be that this would cause the 'from' controller on C to be ignored
 // during the ._maybeReact iteration in .set
 $A.set(true)
 expect(A_success).toBe(true)
 expect(C_success).toBe(false)
 $B.set(true)

 expect(C_success).toBe(true)
})

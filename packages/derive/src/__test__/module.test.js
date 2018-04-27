//@flow

import {
 atom,
 derive,
 lens,
 isAtom,
 isDerivation,
 isLens,
 isDerivable,
 struct,
 transact,
 atomically,
 atomic,
 transaction,
} from '..'

describe('the `is*` fns', () => {
 it("just work, don't worry about it", () => {
  const a = atom(0)
  const d = derive(() => a.get() * 2)
  const p = lens({get: () => a.get() * 2, set: x => a.set(x / 2)})

  expect(isAtom(a)).toBeTruthy()
  expect(isAtom(d)).toBeFalsy()
  expect(isAtom(p)).toBeTruthy()

  expect(isDerivation(a)).toBeFalsy()
  expect(isDerivation(d)).toBeTruthy()
  expect(isDerivation(p)).toBeTruthy()

  expect(isLens(a)).toBeFalsy()
  expect(isLens(p)).toBeTruthy()
  expect(isLens(d)).toBeFalsy()

  expect(isDerivable(a)).toBeTruthy()
  expect(isDerivable(d)).toBeTruthy()
  expect(isDerivable(p)).toBeTruthy()
 })
})

describe('the `transact` function', () => {
 it('executes a function in the context of a transaction', () => {
  const a = atom('a')
  const b = atom('b')

  let timesChanged = 0

  struct({a, b}).react(
   () => {
    timesChanged++
   },
   {skipFirst: true},
  )

  expect(timesChanged).toBe(0)

  const setAAndB = (a_val, b_val) => {
   a.set(a_val)
   b.set(b_val)
  }

  setAAndB('aye', 'bee')

  expect(timesChanged).toBe(2)
  expect(a.get()).toBe('aye')
  expect(b.get()).toBe('bee')

  transact(() => {
   setAAndB('a', 'b')
  })

  expect(timesChanged).toBe(3)
  expect(a.get()).toBe('a')
  expect(b.get()).toBe('b')

  transact(() => {
   setAAndB(5, 6)
  })

  expect(timesChanged).toBe(4)
  expect(a.get()).toBe(5)
  expect(b.get()).toBe(6)
 })
})

describe('the `transaction` function', () => {
 it('wraps a function such that its body is executed in a txn', () => {
  const a = atom('a')
  const b = atom('b')

  let timesChanged = 0

  struct({a, b}).react(
   () => {
    timesChanged++
   },
   {skipFirst: true},
  )

  expect(timesChanged).toBe(0)

  const setAAndB = (a_val, b_val) => {
   a.set(a_val)
   b.set(b_val)
   return a_val + b_val
  }

  expect(setAAndB('aye', 'bee')).toBe('ayebee')

  expect(timesChanged).toBe(2)
  expect(a.get()).toBe('aye')
  expect(b.get()).toBe('bee')

  const tSetAAndB = transaction(setAAndB)

  expect(tSetAAndB('a', 'b')).toBe('ab')

  expect(timesChanged).toBe(3)
  expect(a.get()).toBe('a')
  expect(b.get()).toBe('b')

  expect(tSetAAndB(2, 3)).toBe(5)

  expect(timesChanged).toBe(4)
  expect(a.get()).toBe(2)
  expect(b.get()).toBe(3)
 })
})

describe('the atomically function', () => {
 it('creates a transaction if not already in a transaction', () => {
  const $A = atom('a')
  let numReactions = 0
  $A.react(
   () => {
    numReactions++
   },
   {skipFirst: true},
  )
  expect(numReactions).toBe(0)

  atomically(() => {
   $A.set('b')
   expect(numReactions).toBe(0)
  })
  expect(numReactions).toBe(1)
 })

 it("doesn't create new transactions if already in a transaction", () => {
  const $A = atom('a')

  transact(() => {
   try {
    atomically(() => {
     $A.set('b')
     expect($A.get()).toBe('b')
     throw new Error()
    })
   } catch (ignored) {}
   // no transaction created so change to $A persists
   expect($A.get()).toBe('b')
  })
  expect($A.get()).toBe('b')
 })
})

describe('the atomic function', () => {
 it('creates a transaction if not already in a transaction', () => {
  const $A = atom('a')
  let numReactions = 0
  $A.react(
   () => {
    numReactions++
   },
   {skipFirst: true},
  )
  expect(numReactions).toBe(0)

  const res = atomic(() => {
   $A.set('b')
   expect(numReactions).toBe(0)
   return 3
  })()

  expect(numReactions).toBe(1)

  expect(res).toBe(3)
 })

 it("doesn't create new transactions if already in a transaction", () => {
  const $A = atom('a')

  transact(() => {
   try {
    atomic(() => {
     $A.set('b')
     expect($A.get()).toBe('b')
     throw new Error()
    })()
   } catch (ignored) {}
   // no transaction created so change to $A persists
   expect($A.get()).toBe('b')
  })
  expect($A.get()).toBe('b')
 })
})

//@flow

import {
 atom,
 derive,
 lens,
//  isAtom,
//  isDerivable,
 atomically,
 atomic,
} from '..'


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
})

//@flow

import {atom, derive, is, withEquality, maybeDerive, type Lifecycle} from '..'

describe('a derivation', () => {
 const oneGigabyte = 1024 * 1024 * 1024

 function orderUp(n, ...args) {
  const order = args.length === 0 || args[0] === undefined ? 1 : args[0]
  return order > 0 ? orderUp(n / 1024, order - 1) : n
 }
 const bytes = atom(oneGigabyte)
 const kiloBytes = bytes.map(orderUp)
 const megaBytes = derive(() => orderUp(kiloBytes.get()))

 it('can be created via the derive function in the derivable package', () => {
  expect(megaBytes.get()).toBe(1024)

  expect(() => {
   //$off expect error
   derive()
  }).toThrow()
 })

 it('can derive from more than one atom', () => {
  const order = atom(0)
  const orderName = order.map(
   d => ['bytes', 'kilobytes', 'megabytes', 'gigabytes'][d],
  )
  const size = bytes.map(d => orderUp(d, order.get()))
  const sizeString = derive(() => `${size.get()} ${orderName.get()}`)

  // size is in bytes when order is 0
  expect(size.get()).toBe(bytes.get())
  expect(sizeString.get()).toBe(`${bytes.get()} bytes`)
  order.set(1)
  // size is in kbs when order is 1
  expect(size.get()).toBe(kiloBytes.get())
  expect(sizeString.get()).toBe(`${kiloBytes.get()} kilobytes`)
  order.set(2)
  // size is in mbs when order is 2
  expect(size.get()).toBe(megaBytes.get())
  expect(sizeString.get()).toBe(`${megaBytes.get()} megabytes`)
  order.set(3)
  // size is in gbs when order is 2
  expect(size.get()).toBe(1)
  expect(sizeString.get()).toBe('1 gigabytes')
 })

 it('can be re-instantiated with custom equality-checking', () => {
  const a = atom(5)
  const amod2map = a.map(d => ({a: d % 2}))

  let numReactions = 0
  amod2map.react(
   () => {
    numReactions++
   },
   {skipFirst: true},
  )

  expect(numReactions).toBe(0)
  a.set(7)
  expect(numReactions).toBe(1)
  a.set(9)
  expect(numReactions).toBe(2)
  a.set(11)
  expect(numReactions).toBe(3)

  const amod2map2 = a
   .map(d => ({a: d % 2}))
   .thru(withEquality, (_ref, _ref2) => _ref.a === _ref2.a)

  let numReactions2 = 0
  amod2map2.react(
   () => {
    numReactions2++
   },
   {skipFirst: true},
  )

  expect(numReactions2).toBe(0)
  a.set(7)
  expect(numReactions2).toBe(0)
  a.set(9)
  expect(numReactions2).toBe(0)
  a.set(11)
  expect(numReactions2).toBe(0)
 })
})

describe('nested derivables', () => {
 it('should work in the appropriate fashion', () => {
  const $$A = atom(null)
  const $a = maybeDerive($$A, d => d.get())

  expect($a.get() == null).toBeTruthy()

  const $B = atom(5)

  $$A.set($B)

  expect($a.get()).toBe(5)

  let reaction_b = null
  $a.react(
   b => {
    reaction_b = b
   },
   {skipFirst: true},
  )

  expect(reaction_b).toBe(null)

  $B.set(10)
  expect(reaction_b).toBe(10)

  $B.set(4)
  expect(reaction_b).toBe(4)

  const $C = atom(9)
  $$A.set($C)
  expect(reaction_b).toBe(9)
 })

 it('should let reactors adapt to changes in atoms', () => {
  const $$A = atom(null)
  const $a = maybeDerive($$A, d => d.get())

  const $B = atom('junk')

  const $isJunk = is($B, 'junk')

  let isJunk = null

  $a.react(a => {
   isJunk = a
  })

  expect(isJunk == null).toBeTruthy()

  $$A.set($isJunk)

  expect(isJunk).toBe(true)

  $B.set('not junk')
  expect(isJunk).toBe(false)
 })

 it('should not interfere with lifecycle control', () => {
  const $$A = atom(null)
  const $a = maybeDerive($$A, d => d.get()).map(b => !!b)

  const $B = atom('junk')

  const $isJunk = is($B, 'junk')

  let isJunk = null

  $a.react(
   a => {
    isJunk = a
   },
   {when: $a},
  )

  expect(isJunk == null).toBeTruthy()

  $$A.set($isJunk)

  expect(isJunk).toBe(true)

  $B.set('not junk')
  // still junk
  expect(isJunk).toBe(true)
 })

 it('should not interfere with boolean casting?!', () => {
  const $$Running = atom(null)
  const $running = maybeDerive($$Running, d => d.get())

  let running = null
  $running.map(x => Boolean(x)).react(r => {
   running = r
  })

  expect(!running).toBeTruthy()

  const $Running = atom(false)

  $$Running.set($Running)

  expect(!running).toBeTruthy()

  $Running.set(true)

  expect(running).toBeTruthy()
 })
})

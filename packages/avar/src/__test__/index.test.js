//@flow

import {makeVar} from '..'

test('smoke', async() => {
 const v1 = makeVar('foo')
 expect(v1).toBeDefined()
})

describe('tryRead', () => {
 test('full', async() => {
  const v1 = makeVar('foo')
  const val1 = v1.tryRead()
  const val2 = v1.tryRead()

  expect(val1).toBe('foo')
  expect(val2).toBe('foo')
 })

 test('empty', async() => {
  const v1 = makeVar()
  const val1 = v1.tryRead()
  const val2 = v1.tryRead()

  expect(val1).toBe(null)
  expect(val2).toBe(null)
 })
})

describe('tryPut', () => {
 test('full', async() => {
  const v1 = makeVar('foo')
  const result = v1.tryPut('bar')

  expect(result).toBe(false)

  const val1 = v1.tryRead()
  expect(val1).toBe('foo')
 })

 test('empty', async() => {
  const v1 = makeVar()
  const result = v1.tryPut('foo')
  const val1 = v1.tryRead()

  expect(result).toBe(true)
  expect(val1).toBe('foo')
 })
})

describe('tryTake', () => {
 test('full', async() => {
  const v1 = makeVar('foo')
  const val1 = v1.tryTake()
  const val2 = v1.tryTake()

  expect(val1).toBe('foo')
  expect(val2).toBe(null)
 })

 test('empty', async() => {
  const v1 = makeVar()
  const val1 = v1.tryTake()
  const result = v1.tryPut('foo')
  const val2 = v1.tryTake()

  expect(val1).toBe(null)
  expect(result).toBe(true)
  expect(val2).toBe('foo')
 })
})

test('kill', async() => {
 const v1 = makeVar('foo')
 const val1 = v1.tryRead()
 expect(val1).toBe('foo')
 await new Promise(_ => setTimeout(_, 300))
 v1.kill(new Error('killed'))
 const val2 = v1.tryRead()
 expect(val2).toBe(null)
})

test('status', () => {
 const v1 = makeVar()
 expect(v1.status()).toMatchObject({
  empty: true,
  filled: false,
  killed: false,
 })
 v1.tryPut('foo')
 expect(v1.status()).toMatchObject({
  empty: false,
  filled: true,
  killed: false,
 })
 v1.tryTake()
 expect(v1.status()).toMatchObject({
  empty: true,
  filled: false,
  killed: false,
 })
 v1.tryPut('bar')
 v1.kill(new Error('killed'))
 expect(v1.status()).toMatchObject({
  empty: true,
  filled: false,
  killed: true,
 })
})

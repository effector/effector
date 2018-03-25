//@flow strict

import {fromThunk, fromValue} from '../..'
import {combine} from '../combine'

test('combine(const, const, fn)', () => {
  const a = fromValue('a')
  const b = fromValue('b')
  const value = combine(a, b, (a, b) => ({a, b}))
  expect(value.read()).toMatchObject({a: 'a', b: 'b'})
  expect(value.read()).toBe(value.read())
})

test('combine(lazy, const, fn)', () => {
  let valA = 'a'
  const a = fromThunk(() => valA)
  const b = fromValue('b')
  const value = combine(a, b, (a, b) => ({a, b}))
  expect(value.read()).toMatchObject({a: 'a', b: 'b'})
  expect(value.read()).toBe(value.read())
  valA = 'a updated'
  expect(value.read()).toMatchObject({a: 'a updated', b: 'b'})
  expect(value.read()).toBe(value.read())
})

test('combine(const, lazy, fn)', () => {
  let valB = 'b'
  const a = fromValue('a')
  const b = fromThunk(() => valB)
  const value = combine(a, b, (a, b) => ({a, b}))
  expect(value.read()).toMatchObject({a: 'a', b: 'b'})
  expect(value.read()).toBe(value.read())
  valB = 'b updated'
  expect(value.read()).toMatchObject({a: 'a', b: 'b updated'})
  expect(value.read()).toBe(value.read())
})

describe('combine(lazy, lazy, fn)', () => {
  test('update a', () => {
    let valA = 'a'
    const valB = 'b'
    const a = fromThunk(() => valA)
    const b = fromThunk(() => valB)
    const value = combine(a, b, (a, b) => ({a, b}))
    expect(value.read()).toMatchObject({a: 'a', b: 'b'})
    expect(value.read()).toBe(value.read())
    valA = 'a updated'
    expect(value.read()).toMatchObject({a: 'a updated', b: 'b'})
    expect(value.read()).toBe(value.read())
  })
  test('update b', () => {
    const valA = 'a'
    let valB = 'b'
    const a = fromThunk(() => valA)
    const b = fromThunk(() => valB)
    const value = combine(a, b, (a, b) => ({a, b}))
    expect(value.read()).toMatchObject({a: 'a', b: 'b'})
    expect(value.read()).toBe(value.read())
    valB = 'b updated'
    expect(value.read()).toMatchObject({a: 'a', b: 'b updated'})
    expect(value.read()).toBe(value.read())
  })
  test('update both', () => {
    let valA = 'a'
    let valB = 'b'
    const a = fromThunk(() => valA)
    const b = fromThunk(() => valB)
    const value = combine(a, b, (a, b) => ({a, b}))
    expect(value.read()).toMatchObject({a: 'a', b: 'b'})
    expect(value.read()).toBe(value.read())
    valA = 'a updated'
    valB = 'b updated'
    expect(value.read()).toMatchObject({a: 'a updated', b: 'b updated'})
    expect(value.read()).toBe(value.read())
  })
})

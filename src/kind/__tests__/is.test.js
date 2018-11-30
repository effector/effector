//@flow

import {
  createStore,
  createEffect,
  createEvent,
  // type Store,
  // type Event,
  // type Domain,
} from '../..'

import * as is from '../is'

describe('isStore', () => {
  test('✅ (positive check)', () => {
    expect(is.isStore(createStore(0))).toBe(true)
  })
  test('🅾️ (negative check)', () => {
    expect(is.isStore(createEvent('foo'))).toBe(false)
    expect(is.isStore(createEffect('foo'))).toBe(false)
  })
})
describe('isEvent', () => {
  test('✅ (positive check)', () => {
    expect(is.isEvent(createEvent('foo'))).toBe(true)
  })

  test('🅾️ (negative check)', () => {
    expect(is.isEvent(createStore(0))).toBe(false)
    expect(is.isEvent(createEffect('foo'))).toBe(false)
  })
})
describe('isEffect', () => {
  test('✅ (positive check)', () => {
    expect(is.isEffect(createEffect('foo'))).toBe(true)
  })
  test('🅾️ (negative check)', () => {
    expect(is.isEffect(createStore(0))).toBe(false)
    expect(is.isEffect(createEvent('foo'))).toBe(false)
  })
})
describe('isNone', () => {
  test('✅ (positive check)', () => {
    expect(is.isNone()).toBe(true)
    expect(is.isNone(null)).toBe(true)
    expect(is.isNone('foo')).toBe(true)
  })

  test('🅾️ (negative check)', () => {
    expect(is.isNone(createStore(0))).toBe(false)
    expect(is.isNone(createEvent('foo'))).toBe(false)
    expect(is.isNone(createEffect('foo'))).toBe(false)
  })
})

//@flow

import {
 createStore,
 createEffect,
 createEvent,
 // type Store,
 // type Event,
 // type Domain,
} from '../..'

import {readKind} from '../readKind'
import * as Case from '../case'

describe('Case.Store', () => {
 test('🅾️ (negative check)', () => {
  expect(readKind(createEvent('foo'))).not.toBe(Case.STORE)
  expect(readKind(createEffect('foo'))).not.toBe(Case.STORE)
 })
 test('✅ (positive check)', () => {
  expect(readKind(createStore(0))).toBe(Case.STORE)
 })
})

describe('Case.Event', () => {
 test('🅾️ (negative check)', () => {
  expect(readKind(createStore(0))).not.toBe(Case.EVENT)
  expect(readKind(createEffect('foo'))).not.toBe(Case.EVENT)
 })
 test('✅ (positive check)', () => {
  expect(readKind(createEvent('foo'))).toBe(Case.EVENT)
 })
})

describe('Case.Effect', () => {
 test('🅾️ (negative check)', () => {
  expect(readKind(createStore(0))).not.toBe(Case.EFFECT)
  expect(readKind(createEvent('foo'))).not.toBe(Case.EFFECT)
 })
 test('✅ (positive check)', () => {
  expect(readKind(createEffect('foo'))).toBe(Case.EFFECT)
 })
})

describe('Case.None', () => {
 test('🅾️ (negative check)', () => {
  expect(readKind(createStore(0))).not.toBe(Case.NONE)
  expect(readKind(createEvent('foo'))).not.toBe(Case.NONE)
  expect(readKind(createEffect('foo'))).not.toBe(Case.NONE)
 })
 test('✅ (positive check)', () => {
  expect(readKind()).toBe(Case.NONE)
  expect(readKind(null)).toBe(Case.NONE)
  expect(readKind('foo')).toBe(Case.NONE)
 })
})

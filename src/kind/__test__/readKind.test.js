//@flow

import {
 createStore,
 createEffect,
 createEvent,
 // type Store,
 // type Event,
 // type Domain,
} from '../..'

import {atom, lens} from '../../derive'
import {readKind} from '../readKind'
import * as Case from '../case'

describe('Case.Store', () => {
 test('🅾️ (negative check)', () => {
  expect(readKind(createEvent('foo'))).not.toBe(Case.STORE)
  expect(readKind(createEffect('foo'))).not.toBe(Case.STORE)
  expect(readKind(atom('foo'))).not.toBe(Case.STORE)
  expect(readKind(lens({get() {}, set(_) {}}))).not.toBe(Case.STORE)
 })
 test('✅ (positive check)', () => {
  expect(readKind(createStore(0))).toBe(Case.STORE)
 })
})

describe('Case.Event', () => {
 test('🅾️ (negative check)', () => {
  expect(readKind(createStore(0))).not.toBe(Case.EVENT)
  expect(readKind(createEffect('foo'))).not.toBe(Case.EVENT)
  expect(readKind(atom('foo'))).not.toBe(Case.EVENT)
  expect(readKind(lens({get() {}, set(_) {}}))).not.toBe(Case.EVENT)
 })
 test('✅ (positive check)', () => {
  expect(readKind(createEvent('foo'))).toBe(Case.EVENT)
 })
})

describe('Case.Effect', () => {
 test('🅾️ (negative check)', () => {
  expect(readKind(createStore(0))).not.toBe(Case.EFFECT)
  expect(readKind(createEvent('foo'))).not.toBe(Case.EFFECT)
  expect(readKind(atom('foo'))).not.toBe(Case.EFFECT)
  expect(readKind(lens({get() {}, set(_) {}}))).not.toBe(Case.EFFECT)
 })
 test('✅ (positive check)', () => {
  expect(readKind(createEffect('foo'))).toBe(Case.EFFECT)
 })
})

describe('Case.Atom', () => {
 test('🅾️ (negative check)', () => {
  expect(readKind(createStore(0))).not.toBe(Case.ATOM)
  expect(readKind(createEvent('foo'))).not.toBe(Case.ATOM)
  expect(readKind(createEffect('foo'))).not.toBe(Case.ATOM)
  expect(readKind(lens({get() {}, set(_) {}}))).not.toBe(Case.ATOM)
 })
 test('✅ (positive check)', () => {
  expect(readKind(atom('foo'))).toBe(Case.ATOM)
 })
})

describe('Case.Lens', () => {
 test('🅾️ (negative check)', () => {
  expect(readKind(createStore(0))).not.toBe(Case.LENS)
  expect(readKind(createEvent('foo'))).not.toBe(Case.LENS)
  expect(readKind(createEffect('foo'))).not.toBe(Case.LENS)
  expect(readKind(atom('foo'))).not.toBe(Case.LENS)
 })
 test('✅ (positive check)', () => {
  expect(readKind(lens({get() {}, set(_) {}}))).toBe(Case.LENS)
 })
})

describe('Case.None', () => {
 test('🅾️ (negative check)', () => {
  expect(readKind(createStore(0))).not.toBe(Case.NONE)
  expect(readKind(createEvent('foo'))).not.toBe(Case.NONE)
  expect(readKind(createEffect('foo'))).not.toBe(Case.NONE)
  expect(readKind(atom('foo'))).not.toBe(Case.NONE)
  expect(readKind(lens({get() {}, set(_) {}}))).not.toBe(Case.NONE)
 })
 test('✅ (positive check)', () => {
  expect(readKind()).toBe(Case.NONE)
  expect(readKind(null)).toBe(Case.NONE)
  expect(readKind('foo')).toBe(Case.NONE)
 })
})

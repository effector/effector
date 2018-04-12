//@flow

import {Scope, EventRef, Emission, EventSet, EventWatcher, dispatch} from '..'
import {createKey} from '../key'

let scope = new Scope()
let event = new Emission()
let event1 = new Emission()
let instance = new Emission()

beforeEach(() => {
 scope = new Scope()
 event = new Emission()
 event1 = new Emission()
 instance = new Emission()
})

test('smoke scope new', () => {
 expect().not.toBeDefined()
})

test('dispatch', () => {
 const fn = jest.fn()
 event.dispatch('dispatch1', scope)
 const off = instance.watch(event, fn, scope)
 expect(typeof off).toBe('function')
 event.dispatch('dispatch2', scope)
 off()
 event.dispatch('dispatch3', scope)
 expect(fn).toHaveBeenCalledTimes(1)
 expect(fn).toHaveBeenLastCalledWith('dispatch2')
})

describe('remove', () => {
 test('remove last subscriber', () => {
  const fn = jest.fn()
  event.dispatch('dispatch1', scope)
  const off = instance.watch(event, fn, scope)
  event.dispatch('dispatch2', scope)
  off()
  event.dispatch('dispatch3', scope)
  expect(fn).toHaveBeenCalledTimes(1)
  expect(fn).toHaveBeenLastCalledWith('dispatch2')
  expect(EventSet.size(scope.dispatchSet, instance.key, event.key)).toBe(0)
 })
 test('remove not last subscriber', () => {
  const fn = jest.fn()
  const fn1 = jest.fn()
  dispatch(scope, event.key, 'dispatch1')
  event.dispatch('dispatch1', scope)
  const off = instance.watch(event, fn, scope)
  instance.watch(event, fn1, scope)
  event.dispatch('dispatch2', scope)
  off()
  event.dispatch('dispatch3', scope)
  expect(fn).toHaveBeenCalledTimes(1)
  expect(fn).toHaveBeenLastCalledWith('dispatch2')
  expect(fn1).toHaveBeenCalledTimes(2)
  expect(fn1).toHaveBeenLastCalledWith('dispatch3')
  expect(EventSet.size(scope.dispatchSet, instance.key, event.key)).toBe(1)
 })
})

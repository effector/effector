//@flow

import {createDomain} from '..'
import {createEvent} from 'effector/event'
import {createEffect} from 'effector/effect'
import {createStore} from 'effector/store'
import {spy} from 'effector/fixtures'

test('domain.onCreateEvent(fn)', () => {
  const dom = createDomain()
  const e1 = dom.event()
  const unsub = dom.onCreateEvent(e => spy(e))
  expect(spy).toHaveBeenCalled()
  const e2 = dom.event()
  expect(spy).toHaveBeenLastCalledWith(e2)
  const e3 = createEvent()
  expect(spy).toHaveBeenCalledTimes(2)
  const e4 = dom.event()
  expect(spy).toHaveBeenLastCalledWith(e4)
  expect(spy).toHaveBeenCalledTimes(3)
  expect(() => {
    unsub()
  }).not.toThrow()
  const e5 = dom.event()
  expect(spy).toHaveBeenCalledTimes(3)
})

test('domain.onCreateEffect(fn)', () => {
  const dom = createDomain()
  const e1 = dom.effect()
  const unsub = dom.onCreateEffect(e => spy(e))
  expect(spy).toHaveBeenCalled()
  const e2 = dom.effect()
  expect(spy).toHaveBeenLastCalledWith(e2)
  const e3 = createEffect()
  expect(spy).toHaveBeenCalledTimes(2)
  const e4 = dom.effect()
  expect(spy).toHaveBeenLastCalledWith(e4)
  expect(spy).toHaveBeenCalledTimes(3)
  expect(() => {
    unsub()
  }).not.toThrow()
  const e5 = dom.effect()
  expect(spy).toHaveBeenCalledTimes(3)
})

test('nested domains', () => {
  const spyDom = jest.fn()
  const spySub = jest.fn()
  const dom = createDomain()
  const subdom = dom.domain()
  const unsubDom = dom.onCreateEvent(e => spyDom(e))
  const unsubSub = subdom.onCreateEvent(e => spySub(e))
  const e1 = dom.event()
  expect(spyDom).toHaveBeenLastCalledWith(e1)
  expect(spySub).not.toHaveBeenCalled()
  const e2 = subdom.event()
  expect(spyDom).toHaveBeenLastCalledWith(e2)
  expect(spySub).toHaveBeenLastCalledWith(e2)
})

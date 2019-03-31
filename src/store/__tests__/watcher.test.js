//@flow

import {createStore} from 'effector/store'
import {createEvent} from 'effector/event'

it('support watchers for event', () => {
  const fn = jest.fn()
  const event = createEvent('trigger')
  const watcher = event.watch(e => {
    console.log('e', e)
    fn(e)
  })

  event(3)
  event()
  event(1)

  console.log('fn.mock.calls', ...fn.mock.calls)
  expect(fn.mock.calls).toEqual([[3], [undefined], [1]])

  watcher()

  event(4)
  expect(fn.mock.calls).toEqual([[3], [undefined], [1]])
})

it('support watchers for storages', () => {
  const fn = jest.fn()
  const event = createEvent('trigger')
  const store = createStore('none').on(event, (_, e) => e.toString())
  const watcher = store.watch(e => {
    console.log('store', e)
    fn(e)
  })

  event(3)
  event(1)

  console.log('fn.mock.calls', ...fn.mock.calls)
  expect(fn.mock.calls).toEqual([['none'], ['3'], ['1']])

  watcher()

  event(4)
  expect(fn.mock.calls).toEqual([['none'], ['3'], ['1']])
})

it('support watchers for mapped storages', () => {
  const addMetaTag = (tag, unit: any) => {
    unit.graphite.val.tag = tag
  }
  const fn = jest.fn()
  const event = createEvent('trigger')
  const storeFirst = createStore('none').on(event, (_, e) => e.toString())
  const store = storeFirst.map(e => `/${e}`)

  addMetaTag('event', event)
  addMetaTag('storeFirst', storeFirst)
  addMetaTag('store', store)

  const watcher = store.watch(e => {
    console.log('store', e)
    fn(e)
  })

  console.log('event(3)')
  event(3)

  console.log('fn.mock.calls', ...fn.mock.calls)
  expect(fn.mock.calls).toEqual([['/none'], ['/3']])

  watcher()

  console.log('event(4)')
  event(4)
  expect(fn.mock.calls).toEqual([['/none'], ['/3']])
})

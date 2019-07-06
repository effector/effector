//@flow

import {clearNode, createEvent, forward, createStore} from 'effector'

it('will deactivate event', () => {
  const fn = jest.fn()
  const event = createEvent()
  event.watch(x => fn(x))
  clearNode(event)
  event(1)
  expect(fn).toBeCalledTimes(0)
})

it('will deactivate store', () => {
  const fn = jest.fn()
  const store = createStore(0)
  store.watch(x => fn(x))
  expect(fn).toBeCalledTimes(1)
  clearNode(store)
  store.setState(1)
  expect(fn).toBeCalledTimes(1)
})

it('will not broke subscribers', () => {
  const fn = jest.fn()
  const eventA = createEvent('A')
  const eventB = createEvent('A -> B')
  eventB.watch(e => fn(e))

  forward({
    from: eventA,
    to: eventB,
  })

  eventA(0)
  expect(fn).toBeCalledTimes(1)
  clearNode(eventA)

  eventA(1) //nothing happens
  expect(fn).toBeCalledTimes(1)
  eventB(2) //work as expected
  expect(fn).toBeCalledTimes(2)
})

it('deep cleaning', () => {
  const fn1 = jest.fn()
  const fn2 = jest.fn()
  const source = createStore(0)
  const target = source.map(x => {
    fn1(x)
    return x
  })
  target.watch(x => fn2(x))
  expect(fn1).toBeCalledTimes(1)
  expect(fn2).toBeCalledTimes(1)
  //please be careful with {deep: true}
  //it will destroy everything related to that node
  clearNode(source, {deep: true})
  source.setState(1) //nothing happens
  expect(fn1).toBeCalledTimes(1)
  expect(fn2).toBeCalledTimes(1)
  target.setState(2) //dead as well
  expect(fn2).toBeCalledTimes(1)
})

describe('itermediate steps should not stay', () => {
  it('support store.map', () => {
    const fn = jest.fn()
    const source = createStore(0)
    const target = source.map(x => {
      fn(x)
      return x
    })
    source.setState(1)
    expect(fn).toBeCalledTimes(2)
    clearNode(target)
    source.setState(2)
    expect(fn).toBeCalledTimes(2)
  })
  it('support event.map', () => {
    const fn = jest.fn()
    const source = createEvent()
    const target = source.map(x => {
      fn(x)
      return x
    })
    source(1)
    expect(fn).toBeCalledTimes(1)
    clearNode(target)
    source(2)
    expect(fn).toBeCalledTimes(1)
  })
})

//@noflow

import {
  clearNode,
  createEvent,
  createDomain,
  forward,
  createStore,
  sample,
} from 'effector'
import {argumentHistory} from 'effector/fixtures/index'

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
  it('support store.on', () => {
    const fn = jest.fn()
    const trigger = createEvent()
    const store = createStore(0).on(trigger, x => {
      fn(x)
      return x + 1
    })
    trigger()
    expect(fn).toBeCalledTimes(1)
    clearNode(store)
    trigger()
    expect(fn).toBeCalledTimes(1)
  })
  it('support sample result', () => {
    const fn = jest.fn()
    const trigger = createEvent()
    const store = createStore(null)
    const result = sample({
      source: store,
      clock: trigger,
      fn,
    })
    trigger()
    expect(fn).toBeCalledTimes(1)
    clearNode(result)
    trigger()
    expect(fn).toBeCalledTimes(1)
  })
  it('support sample source', () => {
    const fn = jest.fn()
    const trigger = createEvent()
    const store = createStore(null)
    const result = sample({
      source: store,
      clock: trigger,
      fn,
    })
    trigger()
    expect(fn).toBeCalledTimes(1)
    clearNode(store)
    trigger()
    expect(fn).toBeCalledTimes(1)
  })
})
describe('based on clearNode', () => {
  it('will not clear domain.store after event will be destroyed', () => {
    const fn = jest.fn()
    const store = createStore(0)
    const eventA = createEvent()
    const eventB = createEvent()
    store.on(eventA, x => x + 1).on(eventB, x => x + 1)
    store.watch(fn)
    eventA()
    clearNode(eventA)
    eventB()
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        0,
        1,
        2,
      ]
    `)
  })
  it('will not clear connected units after forward will be destroyed', () => {
    const fn = jest.fn()
    const eventA = createEvent()
    const eventB = createEvent()
    const unsub = forward({
      from: eventA,
      to: eventB,
    })
    eventA.watch(fn)
    eventA(0)
    unsub()
    eventA(1)
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        0,
        1,
      ]
    `)
  })
  it('will not clear unit after .watch will be destroyed', () => {
    const fn = jest.fn()
    const event = createEvent()
    const unsub = event.watch(() => {})
    event.watch(fn)
    event(0)
    unsub()
    event(1)
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        0,
        1,
      ]
    `)
  })
  it('will not clear store after store.updates.watch will be destroyed', () => {
    const fn = jest.fn()
    const event = createEvent()
    const store = createStore(0).on(event, x => x + 1)
    const unsub = store.updates.watch(() => {})
    store.updates.watch(fn)
    event()
    unsub()
    event()
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        1,
        2,
      ]
    `)
  })
  it('wil not clear node, connected via forward to destroyed one', () => {
    const fn = jest.fn()
    const store = createStore(0)
    const event = createEvent()
    event.watch(fn)
    forward({
      from: store.updates,
      to: event,
    })
    store.setState(1)
    event(2)
    clearNode(store)
    event(3)
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        1,
        2,
        3,
      ]
    `)
  })
  it('wil not clear node, which forwarded to destroyed one', () => {
    const fn = jest.fn()
    const store = createStore(0)
    const event = createEvent()
    store.updates.watch(fn)
    forward({
      from: store.updates,
      to: event,
    })
    store.setState(1)
    clearNode(event)
    store.setState(2)
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        1,
        2,
      ]
    `)
  })
})
describe('domain support', () => {
  it('will not clear domain.store after event will be destroyed', () => {
    const fn = jest.fn()
    const domain = createDomain()
    const store = domain.store(0)
    const eventA = domain.event()
    const eventB = domain.event()
    store.on(eventA, x => x + 1).on(eventB, x => x + 1)
    store.watch(fn)
    eventA()
    clearNode(eventA)
    eventB()
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        0,
        1,
        2,
      ]
    `)
  })
  it('will not clear connected units after forward will be destroyed', () => {
    const fn = jest.fn()
    const domain = createDomain()
    const eventA = domain.event()
    const eventB = domain.event()
    const unsub = forward({
      from: eventA,
      to: eventB,
    })
    eventA.watch(fn)
    eventA(0)
    unsub()
    eventA(1)
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        0,
        1,
      ]
    `)
  })
  it('will not clear unit after .watch will be destroyed', () => {
    const fn = jest.fn()
    const domain = createDomain()
    const event = domain.event()
    const unsub = event.watch(() => {})
    event.watch(fn)
    event(0)
    unsub()
    event(1)
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        0,
        1,
      ]
    `)
  })
  it('will not clear store after store.updates.watch will be destroyed', () => {
    const fn = jest.fn()
    const domain = createDomain()
    const event = domain.event()
    const store = domain.store(0).on(event, x => x + 1)
    const unsub = store.updates.watch(() => {})
    store.updates.watch(fn)
    event()
    unsub()
    event()
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        1,
        2,
      ]
    `)
  })
  it('wil not clear node, connected via forward to destroyed one', () => {
    const fn = jest.fn()
    const domain = createDomain()
    const store = domain.store(0)
    const event = domain.event()
    event.watch(fn)
    forward({
      from: store.updates,
      to: event,
    })
    store.setState(1)
    event(2)
    clearNode(store)
    event(3)
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        1,
        2,
        3,
      ]
    `)
  })
  it('wil not clear node, which forwarded to destroyed one', () => {
    const fn = jest.fn()
    const domain = createDomain()
    const store = domain.store(0)
    const event = domain.event()
    store.updates.watch(fn)
    forward({
      from: store.updates,
      to: event,
    })
    store.setState(1)
    clearNode(event)
    store.setState(2)
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        1,
        2,
      ]
    `)
  })
})

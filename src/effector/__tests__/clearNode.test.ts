import {
  clearNode,
  createEvent,
  createDomain,
  forward,
  createStore,
  sample,
  combine,
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
  const eventA = createEvent()
  const eventB = createEvent()
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

test('deep cleaning', () => {
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
    sample({
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
  it('will not clear store after event will be destroyed', () => {
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
  it('will not clear node, connected via forward to destroyed one', () => {
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
  it('will not clear node, which forwarded to destroyed one', () => {
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
  it('will not clear domain.createStore after event will be destroyed', () => {
    const fn = jest.fn()
    const domain = createDomain()
    const store = domain.createStore(0)
    const eventA = domain.createEvent()
    const eventB = domain.createEvent()
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
    const eventA = domain.createEvent()
    const eventB = domain.createEvent()
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
    const event = domain.createEvent()
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
    const event = domain.createEvent()
    const store = domain.createStore(0).on(event, x => x + 1)
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
  it('will not clear node, connected via forward to destroyed one', () => {
    const fn = jest.fn()
    const domain = createDomain()
    const store = domain.createStore(0)
    const event = domain.createEvent()
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
  it('will not clear node, which forwarded to destroyed one', () => {
    const fn = jest.fn()
    const domain = createDomain()
    const store = domain.createStore(0)
    const event = domain.createEvent()
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
  it('will not clear event after clearNode call at its prepended event', () => {
    const fn = jest.fn()
    const domain = createDomain()
    const event = domain.createEvent()
    const prepended = event.prepend(_ => _)
    event.watch(fn)

    clearNode(prepended)
    event(1)
    expect(argumentHistory(fn)).toEqual([1])
  })
  test('child should not survive clearNode(domain) call', () => {
    const fn = jest.fn()
    const domain = createDomain()
    const event = domain.createEvent()
    event.watch(fn)
    event(1)
    clearNode(domain)
    event(2)
    expect(argumentHistory(fn)).toEqual([1])
  })
  describe('clearNode(domain) should not affect sibling nodes', () => {
    describe('with forward', () => {
      test('from', () => {
        const fn = jest.fn()
        const event = createEvent()
        const domain = createDomain()
        const event2 = domain.createEvent()
        forward({
          from: event,
          to: event2,
        })
        event.watch(fn)
        event(0)
        clearNode(domain)
        event(1)
        expect(argumentHistory(fn)).toEqual([0, 1])
      })
      test('to', () => {
        const fn = jest.fn()
        const event = createEvent()
        const domain = createDomain()
        const event2 = domain.createEvent()
        forward({
          from: event2,
          to: event,
        })
        event.watch(fn)
        event(0)
        event2(1)
        clearNode(domain)
        event(2)
        event2(3)
        expect(argumentHistory(fn)).toEqual([0, 1, 2])
      })
    })
    test('with sample', () => {
      const fn = jest.fn()
      const fn2 = jest.fn()
      const store = createStore(null)
      const event = createEvent()
      store.on(event, (_, e) => e)
      store.watch(fn)

      const domain = createDomain()
      const eventInDomain = domain.createEvent()
      eventInDomain.watch(fn2)
      sample({
        source: store,
        clock: eventInDomain,
      })

      event(1)
      eventInDomain(-1)

      clearNode(domain)

      event(2)
      eventInDomain(-2)
      expect(argumentHistory(fn2)).toEqual([-1])
      expect(argumentHistory(fn)).toEqual([null, 1, 2])
    })
    test('with combine', () => {
      const fn = jest.fn()
      const fn2 = jest.fn()
      const store = createStore(null)
      const event = createEvent()
      store.on(event, (_, e) => e)
      store.watch(fn)

      const domain = createDomain()
      const storeInDomain = domain.createStore(null)
      storeInDomain.on(event, (_, e) => e)
      storeInDomain.watch(fn2)
      combine({store, storeInDomain})

      event(1)

      clearNode(domain)

      event(2)
      expect(argumentHistory(fn2)).toEqual([null, 1])
      expect(argumentHistory(fn)).toEqual([null, 1, 2])
    })
  })
  describe('clearNode(domain) should not affect sample targets', () => {
    test('with store as source', () => {
      const fn = jest.fn()
      const fn2 = jest.fn()

      const event1 = createEvent()
      const event2 = createEvent()
      const storeA = createStore(0).on(event1, (_, v) => v)

      const storeB = createStore(0).on(event2, (_, v) => v)
      storeA.watch(fn)
      storeB.watch(fn2)

      const domain = createDomain()
      const storeInDomain = domain.createStore(0)

      sample({
        source: storeInDomain,
        clock: createEvent(),
        target: storeA,
      })

      sample({
        source: storeA,
        clock: createEvent(),
        target: storeB,
      })

      event1(1)
      event2(100)

      clearNode(domain)

      event1(2)
      event2(200)
      expect(argumentHistory(fn2)).toEqual([0, 100, 200])
      expect(argumentHistory(fn)).toEqual([0, 1, 2])
    })
    test('with event as source', () => {
      const fn = jest.fn()
      const fn2 = jest.fn()
      const store = createStore(0)
      const source = createEvent()
      const clock = createEvent()

      source.watch(fn)
      store.watch(fn2)

      const domain = createDomain()
      const eventInDomain = domain.createEvent()

      sample({
        source: eventInDomain,
        clock: createEvent(),
        target: store,
      })

      sample({
        source,
        clock,
        target: store,
      })

      source(1)
      clock()

      clearNode(domain)

      source(2)
      clock()
      expect(argumentHistory(fn2)).toEqual([0, 1, 2])
      expect(argumentHistory(fn)).toEqual([1, 2])
    })
  })
  it('should remove erased units from domain hooks', () => {
    const fn = jest.fn()
    const domain = createDomain()
    const event = domain.createEvent()
    clearNode(event)
    domain.onCreateEvent(fn)
    expect(domain.history.events.size).toBe(0)
    expect(fn).not.toHaveBeenCalled()
  })
})

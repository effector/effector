import {
  clearNode,
  createEvent,
  createDomain,
  createStore,
  sample,
  combine,
  createEffect,
  split,
} from 'effector'
import {argumentHistory} from 'effector/fixtures'

it('will deactivate event', () => {
  const fn = jest.fn()
  const event = createEvent<number>()
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
  //@ts-expect-error
  store.setState(1)
  expect(fn).toBeCalledTimes(1)
})

it('will not broke subscribers', () => {
  const fn = jest.fn()
  const eventA = createEvent<number>()
  const eventB = createEvent<number>()
  eventB.watch(e => fn(e))

  sample({
    clock: eventA,
    target: eventB,
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
  //@ts-expect-error
  source.setState(1) //nothing happens
  expect(fn1).toBeCalledTimes(1)
  expect(fn2).toBeCalledTimes(1)
  //@ts-expect-error
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
    //@ts-expect-error
    source.setState(1)
    expect(fn).toBeCalledTimes(2)
    clearNode(target)
    //@ts-expect-error
    source.setState(2)
    expect(fn).toBeCalledTimes(2)
  })
  it('support event.map', () => {
    const fn = jest.fn()
    const source = createEvent<number>()
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
  it('will not clear unit after .watch will be destroyed', () => {
    const fn = jest.fn()
    const event = createEvent<number>()
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
  it('will not clear unit after .watch will be destroyed', () => {
    const fn = jest.fn()
    const domain = createDomain()
    const event = domain.createEvent<number>()
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
  it('will not clear event after clearNode call at its prepended event', () => {
    const fn = jest.fn()
    const domain = createDomain()
    const event = domain.createEvent<number>()
    const prepended = event.prepend<number>(_ => _)
    event.watch(fn)

    clearNode(prepended)
    event(1)
    expect(argumentHistory(fn)).toEqual([1])
  })
  test('child should not survive clearNode(domain) call', () => {
    const fn = jest.fn()
    const domain = createDomain()
    const event = domain.createEvent<number>()
    event.watch(fn)
    event(1)
    clearNode(domain)
    event(2)
    expect(argumentHistory(fn)).toEqual([1])
  })
  describe('clearNode(domain) should not affect sibling nodes', () => {
    test('with sample', () => {
      const fn = jest.fn()
      const fn2 = jest.fn()
      const store = createStore<number | null>(null)
      const event = createEvent<number>()
      store.on(event, (_, e) => e)
      store.watch(fn)

      const domain = createDomain()
      const eventInDomain = domain.createEvent<number>()
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
      const store = createStore<number | null>(null)
      const event = createEvent<number>()
      store.on(event, (_, e) => e)
      store.watch(fn)

      const domain = createDomain()
      const storeInDomain = domain.createStore<number | null>(null)
      storeInDomain.on(event, (_, e) => e)
      storeInDomain.watch(fn2)
      combine({store, storeInDomain})

      event(1)

      clearNode(domain)

      event(2)
      expect(argumentHistory(fn2)).toEqual([null, 1])
      expect(argumentHistory(fn)).toEqual([null, 1, 2])
    })
    describe('with split', () => {
      test('from domain source to non-domain target', () => {
        const fn = jest.fn()
        const domain = createDomain()
        const source = domain.createEvent<number>()
        const target = createEvent<number>()
        split({
          source,
          match: {even: x => x % 2 === 0},
          cases: {even: target},
        })
        target.watch(fn)
        clearNode(domain)
        source(2)
        target(4)
        expect(argumentHistory(fn)).toEqual([4])
      })
      test('from non-domain source to domain target', () => {
        const fn = jest.fn()
        const domain = createDomain()
        const source = createEvent<number>()
        const target = domain.createEvent<number>()
        split({
          source,
          match: {even: x => x % 2 === 0},
          cases: {even: target},
        })
        source.watch(fn)
        clearNode(domain)
        source(2)
        target(4)
        expect(argumentHistory(fn)).toEqual([2])
      })
      test('from domain source to domain target', () => {
        const fn = jest.fn()
        const domain1 = createDomain()
        const domain2 = createDomain()
        const source = domain1.createEvent<number>()
        const target = domain2.createEvent<number>()
        split({
          source,
          match: {even: x => x % 2 === 0},
          cases: {even: target},
        })
        target.watch(fn)
        clearNode(domain1)
        source(2)
        target(4)
        expect(argumentHistory(fn)).toEqual([4])
      })
    })
  })
  describe('clearNode(domain) should not affect sample targets', () => {
    test('with store as source', () => {
      const fn = jest.fn()
      const fn2 = jest.fn()

      const event1 = createEvent<number>()
      const event2 = createEvent<number>()
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
      const source = createEvent<number>()
      const clock = createEvent()

      source.watch(fn)
      store.watch(fn2)

      const domain = createDomain()
      const eventInDomain = domain.createEvent<number>()

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
  describe('clearNode(domain) should not propagate through .on', () => {
    test('to store without domain', async () => {
      const fn1 = jest.fn()
      const fn2 = jest.fn()
      const domain1 = createDomain()
      const inc = createEffect(() => 1)
      const dec = createEvent()
      const store1 = domain1.createStore(0).on(inc.doneData, x => x + 1)
      const store2 = createStore(0)
        .on(inc.doneData, x => x + 1)
        .on(dec, x => x - 1)
      store2.watch(fn1)
      inc.doneData.watch(fn2)
      clearNode(domain1)
      await inc()
      await inc()
      dec()
      expect(argumentHistory(fn1)).toMatchInlineSnapshot(`
        Array [
          0,
          1,
          2,
          1,
        ]
      `)
      expect(fn2).toBeCalledTimes(2)
    })
    describe('to sibling domain', () => {
      test('through effect without domain', async () => {
        const fn1 = jest.fn()
        const fn2 = jest.fn()
        const domain1 = createDomain()
        const domain2 = createDomain()
        const inc = createEffect(() => 1)
        const dec = createEvent()
        const store1 = domain1.createStore(0).on(inc.doneData, x => x + 1)
        const store2 = domain2
          .createStore(0)
          .on(inc.doneData, x => x + 1)
          .on(dec, x => x - 1)
        store2.watch(fn1)
        inc.doneData.watch(fn2)
        clearNode(domain1)
        await inc()
        await inc()
        dec()
        expect(argumentHistory(fn1)).toMatchInlineSnapshot(`
          Array [
            0,
            1,
            2,
            1,
          ]
        `)
        expect(fn2).toBeCalledTimes(2)
      })
      test('through effect in sibling domain', async () => {
        const fn1 = jest.fn()
        const fn2 = jest.fn()
        const domain1 = createDomain()
        const domain2 = createDomain()
        const inc = domain2.createEffect(() => 1)
        const dec = createEvent()
        const store1 = domain1.createStore(0).on(inc.doneData, x => x + 1)
        const store2 = domain2
          .createStore(0)
          .on(inc.doneData, x => x + 1)
          .on(dec, x => x - 1)
        store2.watch(fn1)
        inc.doneData.watch(fn2)
        clearNode(domain1)
        await inc()
        await inc()
        dec()
        expect(argumentHistory(fn1)).toMatchInlineSnapshot(`
          Array [
            0,
            1,
            2,
            1,
          ]
        `)
        expect(fn2).toBeCalledTimes(2)
      })
      test('through effect in target domain', async () => {
        const fn1 = jest.fn()
        const fn2 = jest.fn()
        const domain1 = createDomain()
        const domain2 = createDomain()
        const inc = domain1.createEffect(() => 1)
        const dec = createEvent()
        const store1 = domain1.createStore(0).on(inc.doneData, x => x + 1)
        const store2 = domain2
          .createStore(0)
          .on(inc.doneData, x => x + 1)
          .on(dec, x => x - 1)
        store2.watch(fn1)
        inc.doneData.watch(fn2)
        clearNode(domain1)
        inc()
        inc()
        dec()
        expect(argumentHistory(fn1)).toMatchInlineSnapshot(`
          Array [
            0,
            -1,
          ]
        `)
        expect(fn2).toBeCalledTimes(0)
      })
    })
    describe('to parent domain', () => {
      test('through effect without domain', async () => {
        const fn1 = jest.fn()
        const fn2 = jest.fn()
        const rootDomain = createDomain()
        const domain1 = rootDomain.createDomain()
        const inc = createEffect(() => 1)
        const dec = createEvent()
        const store1 = domain1.createStore(0).on(inc.doneData, x => x + 1)
        const store2 = rootDomain
          .createStore(0)
          .on(inc.doneData, x => x + 1)
          .on(dec, x => x - 1)
        store2.watch(fn1)
        inc.doneData.watch(fn2)
        clearNode(domain1)
        await inc()
        await inc()
        dec()
        expect(argumentHistory(fn1)).toMatchInlineSnapshot(`
          Array [
            0,
            1,
            2,
            1,
          ]
        `)
        expect(fn2).toBeCalledTimes(2)
      })
      test('through effect in root domain', async () => {
        const fn1 = jest.fn()
        const fn2 = jest.fn()
        const rootDomain = createDomain()
        const domain1 = rootDomain.createDomain()
        const inc = rootDomain.createEffect(() => 1)
        const dec = createEvent()
        const store1 = domain1.createStore(0).on(inc.doneData, x => x + 1)
        const store2 = rootDomain
          .createStore(0)
          .on(inc.doneData, x => x + 1)
          .on(dec, x => x - 1)
        store2.watch(fn1)
        inc.doneData.watch(fn2)
        clearNode(domain1)
        await inc()
        await inc()
        dec()
        expect(argumentHistory(fn1)).toMatchInlineSnapshot(`
          Array [
            0,
            1,
            2,
            1,
          ]
        `)
        expect(fn2).toBeCalledTimes(2)
      })
      test('through effect in target domain', async () => {
        const fn1 = jest.fn()
        const fn2 = jest.fn()
        const rootDomain = createDomain()
        const domain1 = rootDomain.createDomain()
        const inc = domain1.createEffect(() => 1)
        const dec = createEvent()
        const store1 = domain1.createStore(0).on(inc.doneData, x => x + 1)
        const store2 = rootDomain
          .createStore(0)
          .on(inc.doneData, x => x + 1)
          .on(dec, x => x - 1)
        store2.watch(fn1)
        inc.doneData.watch(fn2)
        clearNode(domain1)
        inc()
        inc()
        dec()
        expect(argumentHistory(fn1)).toMatchInlineSnapshot(`
          Array [
            0,
            -1,
          ]
        `)
        expect(fn2).toBeCalledTimes(0)
      })
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

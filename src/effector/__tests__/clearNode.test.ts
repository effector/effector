import {
  clearNode,
  createEvent,
  createDomain,
  createStore,
  sample,
  combine,
  createEffect,
  split,
  withRegion,
  createNode,
  Node,
  step,
  EventCallable,
  merge,
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

describe('supports sample in withRegion', () => {
  test('sample will not work after clearNode call', () => {
    const fn = jest.fn()
    const trigger = createEvent()
    const $source = createStore(0)
    const target = createEvent<number>()

    target.watch(upd => fn(upd))

    const region = createNode()
    withRegion(region, () => {
      sample({
        clock: trigger,
        source: $source,
        target,
      })
    })

    trigger()

    clearNode(region)

    trigger()

    expect(argumentHistory(fn)).toEqual([0])
  })
  test('parallel sample call will work after clearNode call', () => {
    const fn = jest.fn()
    const triggerA = createEvent()
    const triggerB = createEvent()
    const $sourceA = createStore(0)
    const $sourceB = createStore(10)
    const target = createEvent<number>()

    target.watch(upd => fn(upd))

    const region = createNode()
    withRegion(region, () => {
      sample({
        clock: triggerA,
        source: $sourceA,
        target,
      })
    })

    sample({
      clock: triggerB,
      source: $sourceB,
      target,
    })

    triggerA()

    clearNode(region)

    triggerA()

    triggerB()

    expect(argumentHistory(fn)).toEqual([0, 10])
  })
  function addFnCallStep(unit: any, fn: Function) {
    ;(unit.graphite as Node).seq.push(
      step.compute({
        fn(upd) {
          fn(upd)
          return upd
        },
      }),
    )
  }
  test('units will not die after clearNode call', () => {
    const fnTrigger = jest.fn()
    const fnSource = jest.fn()
    const fnTarget = jest.fn()
    const trigger = createEvent<string>()
    const updSource = createEvent<number>()
    const $source = createStore(0)
    const target = createEvent<number>()

    addFnCallStep(trigger, fnTrigger)
    addFnCallStep($source, fnSource)
    addFnCallStep(target, fnTarget)

    sample({clock: updSource, target: $source})

    const region = createNode()
    withRegion(region, () => {
      sample({
        clock: trigger,
        source: $source,
        target,
      })
    })

    trigger('a')

    clearNode(region)

    sample({
      clock: trigger,
      source: $source,
      target,
    })

    updSource(10)
    trigger('b')

    expect(argumentHistory(fnTrigger)).toEqual(['a', 'b'])
    expect(argumentHistory(fnSource)).toEqual([10])
    expect(argumentHistory(fnTarget)).toEqual([0, 10])
  })
})

describe.each([{regionWrap: false}, {regionWrap: true}])(
  'external connections survival, wrap in region: $regionWrap',
  ({regionWrap}) => {
    /**
     * Ability to remove link from regional unit
     * to external declared outside of region
     * (e.g. `$external.on(regional, ...)`)
     *
     * When false, it's better to always declare
     * links with regional units in clock
     * in the region itself
     **/
    const KILL_EXTERNAL = true
    const EXTERNAL_UNIT_CAN_KILL = true
    /** When sample filter becomes dead it kills a whole sample */
    const SAMPLE_FILTER_SUPPORTED = false

    let sampleFn: jest.Mock<number, [number]>
    let externalTriggerFn: jest.Mock<any, any>
    let externalTargetFn: jest.Mock<any, any>
    let regionalUnitFn: jest.Mock<any, any>
    let region: Node
    let externalTrigger: EventCallable<number>
    let externalTarget: EventCallable<number>
    let parentRegion: Node
    beforeEach(() => {
      sampleFn = jest.fn(x => x)
      externalTriggerFn = jest.fn()
      externalTargetFn = jest.fn()
      regionalUnitFn = jest.fn()
      parentRegion = createNode()
      ;[region, externalTrigger, externalTarget] = optionalRegionWrap(() => [
        createNode({regional: true}),
        createEvent<number>(),
        createEvent<number>(),
      ])
    })
    function optionalRegionWrap<T>(cb: () => T) {
      if (!regionWrap) return cb()
      return withRegion(parentRegion, () => cb())
    }
    describe('regional unit in external sample target', () => {
      test('single unit in target (should destroy the link)', () => {
        optionalRegionWrap(() => {
          const regionalTarget = withRegion(region, () => createEvent<number>())
          externalTrigger.watch(upd => externalTriggerFn(upd))
          sample({
            clock: externalTrigger,
            fn: upd => sampleFn(upd),
            target: regionalTarget,
          })
        })
        externalTrigger(0)
        clearNode(region)
        externalTrigger(1)
        expect({
          externalTriggerFn: argumentHistory(externalTriggerFn),
          sampleFn: argumentHistory(sampleFn),
        }).toEqual({
          externalTriggerFn: [0, 1],
          sampleFn: KILL_EXTERNAL ? [0] : [0, 1],
        })
      })
      test('single unit in target array (should destroy the link)', () => {
        optionalRegionWrap(() => {
          const regionalTarget = withRegion(region, () => createEvent<number>())
          externalTrigger.watch(upd => externalTriggerFn(upd))
          sample({
            clock: externalTrigger,
            fn: upd => sampleFn(upd),
            target: [regionalTarget],
          })
        })
        externalTrigger(0)
        clearNode(region)
        externalTrigger(1)
        expect({
          externalTriggerFn: argumentHistory(externalTriggerFn),
          sampleFn: argumentHistory(sampleFn),
        }).toEqual({
          externalTriggerFn: [0, 1],
          sampleFn: KILL_EXTERNAL ? [0] : [0, 1],
        })
      })
      test('not a single unit in target array (should keep the link)', () => {
        optionalRegionWrap(() => {
          const regionalTarget = withRegion(region, () => createEvent<number>())
          externalTrigger.watch(upd => externalTriggerFn(upd))
          externalTarget.watch(upd => externalTargetFn(upd))
          regionalTarget.watch(upd => regionalUnitFn(upd))
          sample({
            clock: externalTrigger,
            fn: upd => sampleFn(upd),
            target: [externalTarget, regionalTarget],
          })
        })
        externalTrigger(0)
        clearNode(region)
        externalTrigger(1)
        externalTarget(2)
        expect({
          externalTriggerFn: argumentHistory(externalTriggerFn),
          externalTargetFn: argumentHistory(externalTargetFn),
          sampleFn: argumentHistory(sampleFn),
          regionalUnitFn: argumentHistory(regionalUnitFn),
        }).toEqual({
          externalTriggerFn: [0, 1],
          externalTargetFn: [0, 1, 2],
          sampleFn: [0, 1],
          regionalUnitFn: [0],
        })
      })
      test('last unit in target array is regional (should destroy the link)', () => {
        optionalRegionWrap(() => {
          const regionalTarget = withRegion(region, () => createEvent<number>())
          externalTrigger.watch(upd => externalTriggerFn(upd))
          externalTarget.watch(upd => externalTargetFn(upd))
          regionalTarget.watch(upd => regionalUnitFn(upd))
          sample({
            clock: externalTrigger,
            fn: upd => sampleFn(upd),
            target: [externalTarget, regionalTarget],
          })
        })
        externalTrigger(0)
        clearNode(externalTarget)
        externalTrigger(1)
        clearNode(region)
        externalTrigger(2)
        expect({
          externalTriggerFn: argumentHistory(externalTriggerFn),
          externalTargetFn: argumentHistory(externalTargetFn),
          sampleFn: argumentHistory(sampleFn),
          regionalUnitFn: argumentHistory(regionalUnitFn),
        }).toEqual({
          externalTriggerFn: [0, 1, 2],
          externalTargetFn: [0],
          sampleFn: EXTERNAL_UNIT_CAN_KILL ? [0] : [0, 1],
          regionalUnitFn: EXTERNAL_UNIT_CAN_KILL ? [0] : [0, 1],
        })
      })
      test('last two units in target array are regional (should keep the link)', () => {
        const regionB = optionalRegionWrap(() => {
          const regionalTarget = withRegion(region, () => createEvent<number>())
          const regionB = createNode({regional: true})
          const regionalTargetB = withRegion(regionB, () =>
            createEvent<number>(),
          )
          externalTrigger.watch(upd => externalTriggerFn(upd))
          externalTarget.watch(upd => externalTargetFn(upd))
          regionalTarget.watch(upd => regionalUnitFn(upd))
          sample({
            clock: externalTrigger,
            fn: upd => sampleFn(upd),
            target: [externalTarget, regionalTargetB, regionalTarget],
          })
          return regionB
        })
        externalTrigger(0)
        // clearNode(regionalTargetB)
        clearNode(regionB)
        externalTrigger(1)
        clearNode(region)
        externalTrigger(2)
        expect({
          externalTriggerFn: argumentHistory(externalTriggerFn),
          externalTargetFn: argumentHistory(externalTargetFn),
          sampleFn: argumentHistory(sampleFn),
          regionalUnitFn: argumentHistory(regionalUnitFn),
        }).toEqual({
          externalTriggerFn: [0, 1, 2],
          externalTargetFn: [0, 1, 2],
          sampleFn: [0, 1, 2],
          regionalUnitFn: [0, 1],
        })
      })
      test('last unit in target array is not regional (should destroy the link)', () => {
        // This test may not work because of history of default behavior of clearNode
        const regionalTarget = optionalRegionWrap(() => {
          const regionalTarget = withRegion(region, () => createEvent<number>())
          externalTrigger.watch(upd => externalTriggerFn(upd))
          externalTarget.watch(upd => externalTargetFn(upd))
          regionalTarget.watch(upd => regionalUnitFn(upd))
          sample({
            clock: externalTrigger,
            fn: upd => sampleFn(upd),
            target: [externalTarget, regionalTarget],
          })
          return regionalTarget
        })
        externalTrigger(0)
        clearNode(region)
        externalTrigger(1)
        clearNode(externalTarget)
        externalTrigger(2)
        regionalTarget(3)
        expect({
          externalTriggerFn: argumentHistory(externalTriggerFn),
          externalTargetFn: argumentHistory(externalTargetFn),
          sampleFn: argumentHistory(sampleFn),
          regionalUnitFn: argumentHistory(regionalUnitFn),
        }).toEqual({
          externalTriggerFn: [0, 1, 2],
          externalTargetFn: [0, 1],
          sampleFn: [0, 1],
          regionalUnitFn: EXTERNAL_UNIT_CAN_KILL ? [0] : [0, 3],
        })
      })
    })
    describe('regional unit in external sample clock', () => {
      test('single unit in clock (should destroy the link)', () => {
        const regionalTrigger = optionalRegionWrap(() => {
          const regionalTrigger = withRegion(region, () =>
            createEvent<number>(),
          )
          regionalTrigger.watch(upd => regionalUnitFn(upd))
          externalTarget.watch(upd => externalTargetFn(upd))
          sample({
            clock: regionalTrigger,
            fn: upd => sampleFn(upd),
            target: externalTarget,
          })
          return regionalTrigger
        })
        regionalTrigger(0)
        clearNode(region)
        regionalTrigger(1)
        externalTarget(2)
        expect({
          regionalTriggerFn: argumentHistory(regionalUnitFn),
          sampleFn: argumentHistory(sampleFn),
          externalTargetFn: argumentHistory(externalTargetFn),
        }).toEqual({
          regionalTriggerFn: [0],
          sampleFn: [0],
          externalTargetFn: [0, 2],
        })
      })
      test('single unit in clock array (should destroy the link)', () => {
        const regionalTrigger = optionalRegionWrap(() => {
          const regionalTrigger = withRegion(region, () =>
            createEvent<number>(),
          )
          regionalTrigger.watch(upd => regionalUnitFn(upd))
          externalTarget.watch(upd => externalTargetFn(upd))
          sample({
            clock: [regionalTrigger],
            fn: upd => sampleFn(upd),
            target: externalTarget,
          })
          return regionalTrigger
        })
        regionalTrigger(0)
        clearNode(region)
        regionalTrigger(1)
        externalTarget(2)
        expect({
          regionalTriggerFn: argumentHistory(regionalUnitFn),
          sampleFn: argumentHistory(sampleFn),
          externalTargetFn: argumentHistory(externalTargetFn),
        }).toEqual({
          regionalTriggerFn: [0],
          sampleFn: [0],
          externalTargetFn: [0, 2],
        })
      })
      test('not a single unit in clock array (should keep the link)', () => {
        const regionalTrigger = optionalRegionWrap(() => {
          const regionalTrigger = withRegion(region, () =>
            createEvent<number>(),
          )
          regionalTrigger.watch(upd => regionalUnitFn(upd))
          externalTrigger.watch(upd => externalTriggerFn(upd))
          externalTarget.watch(upd => externalTargetFn(upd))
          sample({
            clock: [externalTrigger, regionalTrigger],
            fn: upd => sampleFn(upd),
            target: externalTarget,
          })
          return regionalTrigger
        })
        regionalTrigger(0)
        externalTrigger(1)
        clearNode(region)
        regionalTrigger(2)
        externalTrigger(3)
        externalTarget(4)
        expect({
          regionalTriggerFn: argumentHistory(regionalUnitFn),
          externalTriggerFn: argumentHistory(externalTriggerFn),
          sampleFn: argumentHistory(sampleFn),
          externalTargetFn: argumentHistory(externalTargetFn),
        }).toEqual({
          regionalTriggerFn: [0],
          externalTriggerFn: [1, 3],
          sampleFn: [0, 1, 3],
          externalTargetFn: [0, 1, 3, 4],
        })
      })
      test('last unit in clock array is regional (should destroy the link)', () => {
        const regionalTrigger = optionalRegionWrap(() => {
          const regionalTrigger = withRegion(region, () =>
            createEvent<number>(),
          )
          regionalTrigger.watch(upd => regionalUnitFn(upd))
          externalTrigger.watch(upd => externalTriggerFn(upd))
          externalTarget.watch(upd => externalTargetFn(upd))
          sample({
            clock: [externalTrigger, regionalTrigger],
            fn: upd => sampleFn(upd),
            target: externalTarget,
          })
          return regionalTrigger
        })
        regionalTrigger(0)
        externalTrigger(1)
        clearNode(externalTrigger)
        regionalTrigger(2)
        externalTrigger(3)
        externalTarget(4)
        clearNode(region)
        regionalTrigger(5)
        externalTrigger(6)
        externalTarget(7)
        expect({
          regionalTriggerFn: argumentHistory(regionalUnitFn),
          externalTriggerFn: argumentHistory(externalTriggerFn),
          sampleFn: argumentHistory(sampleFn),
          externalTargetFn: argumentHistory(externalTargetFn),
        }).toEqual({
          regionalTriggerFn: [0, 2],
          externalTriggerFn: [1],
          sampleFn: EXTERNAL_UNIT_CAN_KILL ? [0, 1] : [0, 1, 2],
          externalTargetFn: EXTERNAL_UNIT_CAN_KILL
            ? [0, 1, 4, 7]
            : [0, 1, 2, 4, 7],
        })
      })
      test('last unit in clock array is not regional (should destroy the link)', () => {
        // This test may not work because of history of default behavior of clearNode
        const regionalTrigger = optionalRegionWrap(() => {
          const regionalTrigger = withRegion(region, () =>
            createEvent<number>(),
          )
          regionalTrigger.watch(upd => regionalUnitFn(upd))
          externalTrigger.watch(upd => externalTriggerFn(upd))
          externalTarget.watch(upd => externalTargetFn(upd))
          sample({
            clock: [externalTrigger, regionalTrigger],
            fn: upd => sampleFn(upd),
            target: externalTarget,
          })
          return regionalTrigger
        })
        regionalTrigger(0)
        externalTrigger(1)
        clearNode(region)
        regionalTrigger(2)
        externalTrigger(3)
        externalTarget(4)
        clearNode(externalTrigger)
        regionalTrigger(5)
        externalTrigger(6)
        externalTarget(7)
        expect({
          regionalTriggerFn: argumentHistory(regionalUnitFn),
          externalTriggerFn: argumentHistory(externalTriggerFn),
          sampleFn: argumentHistory(sampleFn),
          externalTargetFn: argumentHistory(externalTargetFn),
        }).toEqual({
          regionalTriggerFn: [0],
          externalTriggerFn: [1, 3],
          sampleFn: [0, 1, 3],
          externalTargetFn: [0, 1, 3, 4, 7],
        })
      })
    })
    test('regional unit in external sample filter (should destroy the link)', () => {
      optionalRegionWrap(() => {
        const $filter = withRegion(region, () => createStore(true))
        externalTrigger.watch(upd => externalTriggerFn(upd))
        externalTarget.watch(upd => externalTargetFn(upd))
        sample({
          clock: externalTrigger,
          filter: $filter,
          fn: upd => sampleFn(upd),
          target: externalTarget,
        })
      })
      externalTrigger(0)
      clearNode(region)
      externalTrigger(1)
      externalTarget(2)
      expect({
        externalTriggerFn: argumentHistory(externalTriggerFn),
        sampleFn: argumentHistory(sampleFn),
        externalTargetFn: argumentHistory(externalTargetFn),
      }).toEqual({
        externalTriggerFn: [0, 1],
        sampleFn: KILL_EXTERNAL && SAMPLE_FILTER_SUPPORTED ? [0] : [0, 1],
        externalTargetFn:
          KILL_EXTERNAL && SAMPLE_FILTER_SUPPORTED ? [0, 2] : [0, 1, 2],
      })
    })
    describe('regional unit in external merge clock', () => {
      test('single unit in clock array (should keep target unit)', () => {
        const [regionalTrigger, mergeTarget] = optionalRegionWrap(() => {
          const regionalTrigger = withRegion(region, () =>
            createEvent<number>(),
          )
          const mergeTarget = merge([regionalTrigger])
          regionalTrigger.watch(upd => regionalUnitFn(upd))
          mergeTarget.watch(upd => externalTargetFn(upd))
          return [regionalTrigger, mergeTarget] as const
        })
        regionalTrigger(0)
        clearNode(region)
        regionalTrigger(1)
        expect({
          regionalTriggerFn: argumentHistory(regionalUnitFn),
          externalTargetFn: argumentHistory(externalTargetFn),
        }).toEqual({
          regionalTriggerFn: [0],
          externalTargetFn: [0],
        })

        const mergeTargetNode = (mergeTarget as any).graphite as Node

        expect({
          mergeTargetOwners: mergeTargetNode.family.owners.length,
          mergeTargetNext: mergeTargetNode.next.length,
        }).toEqual({
          mergeTargetOwners: regionWrap ? 1 : 0,
          mergeTargetNext: 1,
        })
      })
      test('not a single unit in clock array (should keep target unit)', () => {
        const regionalTrigger = optionalRegionWrap(() => {
          const regionalTrigger = withRegion(region, () =>
            createEvent<number>(),
          )
          const mergeTarget = merge([regionalTrigger, externalTrigger])
          regionalTrigger.watch(upd => regionalUnitFn(upd))
          externalTrigger.watch(upd => externalTriggerFn(upd))
          mergeTarget.watch(upd => externalTargetFn(upd))
          return regionalTrigger
        })
        regionalTrigger(0)
        externalTrigger(1)
        clearNode(region)
        regionalTrigger(2)
        externalTrigger(3)
        expect({
          regionalTriggerFn: argumentHistory(regionalUnitFn),
          externalTriggerFn: argumentHistory(externalTriggerFn),
          externalTargetFn: argumentHistory(externalTargetFn),
        }).toEqual({
          regionalTriggerFn: [0],
          externalTriggerFn: [1, 3],
          externalTargetFn: [0, 1, 3],
        })
      })
    })

    test('withRegion + on (unsubscribe edge case)', () => {
      const {$count, $str} = optionalRegionWrap(() => {
        return withRegion(region, () => {
          const inc = createEvent()
          const $count = createStore(0)
          $count.on(inc, n => n + 1)
          const $str = $count.map(n => String(n))

          inc()

          $count.on(inc, n => n + 1)

          inc()

          return {$count, $str}
        })
      })

      expect({
        count: $count.getState(),
        str: $str.getState(),
      }).toEqual({count: 2, str: '2'})
    })

    test('regional .on support', () => {
      const handlerFn = jest.fn((x: number) => x)
      const replace = optionalRegionWrap(() => {
        const $count = createStore(0)
        const replace = createEvent<number>()
        withRegion(region, () => {
          $count.on(replace, (_, upd) => handlerFn(upd))
        })
        return replace
      })

      replace(1)
      clearNode(region)
      replace(2)

      expect(argumentHistory(handlerFn)).toEqual([1])
    })

    test('external .on support', () => {
      const handlerFn = jest.fn((x: number) => x)
      const [$count, replace] = optionalRegionWrap(() => {
        const $count = createStore(0)
        const replace = withRegion(region, () => createEvent<number>())
        $count.on(replace, (_, upd) => handlerFn(upd))
        return [$count, replace] as const
      })
      replace(1)
      clearNode(region)
      replace(2)

      const node: Node = ($count as any).graphite

      expect(argumentHistory(handlerFn)).toEqual([1])
      /** .updates and reinit */
      expect(node.family.links.length).toBe(KILL_EXTERNAL ? 2 : 3)
    })

    test('.on memory leaks', () => {
      const $count = optionalRegionWrap(() => {
        const $count = createStore(0)
        return $count
      })
      function factory() {
        const region = createNode({regional: true})

        const inc = withRegion(region, () => {
          const inc = createEvent()
          $count.on(inc, x => x + 1)
          return inc
        })

        inc()

        return {inc, region}
      }

      for (let i = 0; i < 10; i++) {
        const {region} = optionalRegionWrap(() => factory())
        clearNode(region)
      }

      const node: Node = ($count as any).graphite

      /** only .updates */
      expect(node.next.length).toBe(1)
      /** .updates and reinit */
      expect(node.family.links.length).toBe(2)
    })

    /** So nested models will NOT be cleared correctly without region: true */
    test('inner regions will survive with regional: false', () => {
      const innerEvent = optionalRegionWrap(() => {
        return withRegion(region, () => {
          const innerRegion = createNode()
          return withRegion(innerRegion, () => createEvent<number>())
        })
      })
      innerEvent.watch(upd => regionalUnitFn(upd))

      innerEvent(0)
      clearNode(region)
      innerEvent(1)

      expect(argumentHistory(regionalUnitFn)).toEqual([0, 1])
    })

    test('inner regions will not survive with regional: true', () => {
      const innerEvent = optionalRegionWrap(() => {
        return withRegion(region, () => {
          const innerRegion = createNode({regional: true})
          return withRegion(innerRegion, () => createEvent<number>())
        })
      })
      innerEvent.watch(upd => regionalUnitFn(upd))

      innerEvent(0)
      clearNode(region)
      innerEvent(1)

      expect(argumentHistory(regionalUnitFn)).toEqual([0])
    })

    describe('external unit should survive', () => {
      let handlerFn: jest.Mock<number, [number]>
      beforeEach(() => {
        handlerFn = jest.fn(x => x)
      })
      test('store .map', () => {
        const inc = optionalRegionWrap(() => {
          const inc = createEvent()
          const $external = createStore(0)
          $external.on(inc, x => x + 1)
          const $regional = withRegion(region, () => {
            return $external.map(n => handlerFn(n))
          })
          $external.watch(upd => externalTriggerFn(upd))
          $regional.watch(upd => regionalUnitFn(upd))
          return inc
        })

        inc()

        clearNode(region)

        inc()

        expect({
          externalTriggerFn: argumentHistory(externalTriggerFn),
          regionalUnitFn: argumentHistory(regionalUnitFn),
          handlerFn: argumentHistory(handlerFn),
        }).toEqual({
          externalTriggerFn: [0, 1, 2],
          regionalUnitFn: [0, 1],
          handlerFn: [0, 1],
        })
      })
      test('combine', () => {
        const inc = optionalRegionWrap(() => {
          const inc = createEvent()
          const $external = createStore(0)
          $external.on(inc, x => x + 1)
          const $regional = withRegion(region, () => {
            return combine($external, n => handlerFn(n))
          })
          $external.watch(upd => externalTriggerFn(upd))
          $regional.watch(upd => regionalUnitFn(upd))
          return inc
        })

        inc()

        clearNode(region)

        inc()

        expect({
          externalTriggerFn: argumentHistory(externalTriggerFn),
          regionalUnitFn: argumentHistory(regionalUnitFn),
          handlerFn: argumentHistory(handlerFn),
        }).toEqual({
          externalTriggerFn: [0, 1, 2],
          regionalUnitFn: [0, 1],
          handlerFn: [0, 1],
        })
      })
      test('event .map', () => {
        optionalRegionWrap(() => {
          const regionalTarget = withRegion(region, () => {
            return externalTrigger.map(n => handlerFn(n))
          })
          externalTrigger.watch(upd => externalTriggerFn(upd))
          regionalTarget.watch(upd => regionalUnitFn(upd))
        })

        externalTrigger(0)

        clearNode(region)

        externalTrigger(1)

        expect({
          externalTriggerFn: argumentHistory(externalTriggerFn),
          regionalUnitFn: argumentHistory(regionalUnitFn),
          handlerFn: argumentHistory(handlerFn),
        }).toEqual({
          externalTriggerFn: [0, 1],
          regionalUnitFn: [0],
          handlerFn: [0],
        })
      })
      test('event .prepend', () => {
        const regionalTrigger = optionalRegionWrap(() => {
          const regionalTrigger = withRegion(region, () => {
            return externalTarget.prepend((n: number) => handlerFn(n))
          })
          externalTarget.watch(upd => externalTargetFn(upd))
          regionalTrigger.watch(upd => regionalUnitFn(upd))
          return regionalTrigger
        })

        regionalTrigger(0)

        clearNode(region)

        regionalTrigger(1)
        externalTarget(2)

        expect({
          externalTargetFn: argumentHistory(externalTargetFn),
          regionalUnitFn: argumentHistory(regionalUnitFn),
          handlerFn: argumentHistory(handlerFn),
        }).toEqual({
          externalTargetFn: [0, 2],
          regionalUnitFn: [0],
          handlerFn: [0],
        })
      })
    })
  },
)

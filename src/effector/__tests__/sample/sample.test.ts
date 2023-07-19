import {
  sample,
  guard,
  createEvent,
  createStore,
  createEffect,
  is,
  Node,
  Event,
} from 'effector'

import {argumentHistory} from 'effector/fixtures'

const consoleError = console.error

beforeAll(() => {
  console.error = (message, ...args) => {
    if (String(message).includes('guard')) return
    consoleError(message, ...args)
  }
})

afterAll(() => {
  console.error = consoleError
})

test('sid support', () => {
  const source = createStore(null)
  const sampled = sample({source, sid: 'foo'})

  expect(sampled.sid).toBe('foo')
})

describe('loc support', () => {
  function getNode(value: Event<any>): Node {
    // @ts-expect-error graphite property is not in public typings yet
    return value.graphite
  }
  function getLoc({meta}: Node): void | {line: number; column: number} {
    return 'config' in meta ? meta.config.loc : meta.loc
  }
  function findJointLoc(targetNode: Node) {
    if (targetNode.family.links.length === 0)
      throw Error(`this node didn't used in sample`)
    let jointNode: Node
    for (let i = targetNode.family.links.length - 1; i >= 0; i--) {
      const node = targetNode.family.links[i]
      if (node.meta.joint) {
        jointNode = node
        break
      }
    }
    if (!jointNode!) throw Error(`this node didn't used in sample`)
    return getLoc(jointNode)
  }
  test('sample without target', () => {
    const clock = createEvent()
    const result = sample({clock})
    const loc = getLoc(getNode(result))
    expect(loc).toHaveProperty('line')
  })
  describe('sample with target', () => {
    test('basic case', () => {
      const clock = createEvent()
      const target = createEvent()
      sample({clock: [clock], target: [target]})
      const loc = findJointLoc(getNode(target))
      expect(loc).toHaveProperty('line')
    })
    test('target-clock feedback loop', () => {
      const trigger = createEvent()
      sample({clock: trigger, target: trigger})
      const loc = findJointLoc(getNode(trigger))
      expect(loc).toHaveProperty('line')
      expect(loc!.line).toBe(getLoc(getNode(trigger))!.line + 1)
    })
  })
})

describe('temporal consistency', () => {
  test('in combination with guard, pass immediately', () => {
    const fn = jest.fn()
    const trigger = createEvent<number>()
    const target = createEvent()
    sample({
      source: trigger,
      clock: guard(trigger, {
        filter: x => x > 0,
      }),
      target,
    })
    target.watch(fn)
    trigger(1)
    expect(argumentHistory(fn)).toEqual([1])
  })
  test('in combination with guard, pass on second call', () => {
    const fn = jest.fn()
    const trigger = createEvent<number>()
    const target = createEvent()
    sample({
      source: trigger,
      clock: guard(trigger, {
        filter: x => x > 0,
      }),
      target,
    })
    target.watch(fn)
    trigger(0)
    trigger(1)
    expect(argumentHistory(fn)).toEqual([1])
  })
  test('in combination with .filter, pass immediately', () => {
    const fn = jest.fn()
    const trigger = createEvent<number>()
    const target = createEvent()
    sample({
      source: trigger,
      clock: trigger.filter({
        fn: x => x > 0,
      }),
      target,
    })
    target.watch(fn)
    trigger(1)
    expect(argumentHistory(fn)).toEqual([1])
  })
  test('in combination with .filter, pass on second call', () => {
    const fn = jest.fn()
    const trigger = createEvent<number>()
    const target = createEvent()
    sample({
      source: trigger,
      clock: trigger.filter({
        fn: x => x > 0,
      }),
      target,
    })
    target.watch(fn)
    trigger(0)
    trigger(1)
    expect(argumentHistory(fn)).toEqual([1])
  })
  test('source & clock is a same event', () => {
    const fn = jest.fn()
    const trigger = createEvent<number>()
    const target = createEvent()
    sample({
      source: trigger,
      clock: trigger,
      target,
    })
    target.watch(fn)
    trigger(0)
    trigger(1)
    expect(argumentHistory(fn)).toEqual([0, 1])
  })
  test('clock triggers earlier than source during same pure phase', () => {
    const fn = jest.fn()
    const trigger = createEvent<number>()
    const source = trigger.map(x => x)
    const target = createEvent()
    sample({
      source,
      clock: trigger,
      target,
    })
    target.watch(fn)
    trigger(0)
    trigger(1)
    //note that during first trigger call, source is not called yet
    //in general, users should avoid such a backward-clocking
    expect(argumentHistory(fn)).toEqual([1])
  })
})

it('should not accept undefined clocks', () => {
  expect(() => {
    sample({
      //@ts-expect-error
      source: createStore(null),
      clock: undefined,
    })
  }).toThrowErrorMatchingInlineSnapshot(`"sample: clock should be defined"`)
})

describe('sample type', () => {
  test.each`
    source            | clock             | kind
    ${createStore(0)} | ${createStore(0)} | ${'store'}
    ${createStore(0)} | ${createEvent()}  | ${'event'}
    ${createEvent()}  | ${createStore(0)} | ${'event'}
    ${createEvent()}  | ${createEvent()}  | ${'event'}
  `(`$kind <- $source.kind by $clock.kind`, ({source, clock, kind}) => {
    //@ts-expect-error
    expect(sample(source, clock).kind).toBe(kind)
  })
  test.each`
    source            | clock             | kind
    ${createStore(0)} | ${createStore(0)} | ${'store'}
    ${createStore(0)} | ${createEvent()}  | ${'event'}
    ${createEvent()}  | ${createStore(0)} | ${'event'}
    ${createEvent()}  | ${createEvent()}  | ${'event'}
  `(
    `$kind <- $source.kind by $clock.kind with handler`,
    ({source, clock, kind}) => {
      expect(
        //@ts-expect-error
        sample(source, clock, (source, clock) => ({source, clock})).kind,
      ).toBe(kind)
    },
  )
})

describe('sample', () => {
  it('works with config', () => {
    const foo = createStore('')
    const bar = createStore('')
    sample({clock: foo, source: foo, target: bar})
  })
  it('handles object combination', () => {
    const foo = createStore('')
    //@ts-expect-error
    sample({foo})
  })
  it('works with single source', () => {
    const foo = createStore('')

    sample(foo)
  })
  describe('sample with event as source', () => {
    describe.each`
      greedy   | resultDirect                | resultBacktracking
      ${false} | ${[{x: 1}, {x: 2}, {x: 3}]} | ${[{x: 2}, {x: 3}]}
      ${true}  | ${[{x: 1}, {x: 2}, {x: 3}]} | ${[{x: 1}, {x: 2}]}
    `(
      'depended on order of execution (greedy = $greedy)',
      ({greedy, resultDirect, resultBacktracking}) => {
        test('direct order', () => {
          const fn = jest.fn()
          const A = createEvent<number>()
          const B = A.map(x => ({x}))

          sample({
            source: A,
            clock: B,
            fn: (A, B) => B,
            greedy,
          }).watch(e => fn(e))

          A(1)
          A(2)
          A(3)

          expect(argumentHistory(fn)).toEqual(resultDirect)
        })
        test('backtracking', () => {
          const fn = jest.fn()
          const A = createEvent<number>()
          const B = A.map(x => ({x}))

          sample({
            source: B,
            clock: A,
            fn: B => B,
            greedy,
          }).watch(e => fn(e))

          A(1)
          A(2)
          A(3)

          expect(argumentHistory(fn)).toEqual(resultBacktracking)
        })
      },
    )

    it('works with sibling events', () => {
      const fn1 = jest.fn()
      const fn2 = jest.fn()
      const A = createEvent<number>()
      const B = A.map(b => ({b}))
      const C = A.filterMap(x => {
        if (x > 5) return `${x} > 5`
      })

      sample(B, C, ({b}, c) => ({b, c})).watch(e => fn1(e))
      sample(C, B, (c, {b}) => ({b, c})).watch(e => fn2(e))

      A(2)
      A(6)
      A(3)
      A(4)
      A(10)
      expect(argumentHistory(fn1)).toEqual([
        {b: 6, c: `6 > 5`},
        {b: 10, c: `10 > 5`},
      ])
      expect(argumentHistory(fn2)).toEqual([
        {b: 3, c: `6 > 5`},
        {b: 4, c: `6 > 5`},
        {b: 10, c: `10 > 5`},
      ])
    })
    test('event', () => {
      const fn = jest.fn()
      const data = createEvent<any>()
      const stop = createEvent()

      const lastData = sample(data, stop)

      lastData.watch(value => fn(value))

      data({foo: 'bar'})
      data(true)
      data(false)
      data({x: 'baz'})

      stop()

      expect(argumentHistory(fn)).toEqual([{x: 'baz'}])
      expect(fn).toHaveBeenCalledTimes(1)
    })
    test('no updates until first source update', () => {
      const fn = jest.fn()
      const data = createEvent<any>()
      const stop = createEvent()

      const lastData = sample(data, stop)

      lastData.watch(value => fn(value))

      stop()
      stop()
      expect(fn).not.toHaveBeenCalled()
      data({x: 'baz'})
      expect(fn).not.toHaveBeenCalled()
      stop()
      expect(argumentHistory(fn)).toEqual([{x: 'baz'}])
      expect(fn).toHaveBeenCalledTimes(1)
    })
    test(
      'edge case: no updates until first source update ' +
        'even when clock is store',
      () => {
        const fn = jest.fn()
        const data = createEvent<any>()
        const add = createEvent<number>()
        const stop = createStore(0).on(add, (x, n) => x + n)

        const lastData = sample(data, stop)

        lastData.watch(value => fn(value))

        add(1)
        add(2)
        expect(fn).not.toHaveBeenCalled()
        data({x: 'baz'})
        add(0) //edge case: store will not be updated
        expect(fn).not.toHaveBeenCalled()
        add(3)
        expect(argumentHistory(fn)).toEqual([{x: 'baz'}])
        expect(fn).toHaveBeenCalledTimes(1)
        add(4)
        expect(argumentHistory(fn)).toEqual([{x: 'baz'}, {x: 'baz'}])
        expect(fn).toHaveBeenCalledTimes(2)
      },
    )
    test('handler works', () => {
      const fn = jest.fn()
      const release = createEvent<number>()
      const emit = createEvent<number>()
      const received = sample(emit, release, (last, payload) => [last, payload])
      received.watch(value => fn(value))
      release(0)
      emit(1)
      emit(2)
      release(3)
      release(4)
      emit(5)
      expect(argumentHistory(fn)).toEqual([
        [2, 3],
        [2, 4],
      ])
    })
    test('store as clock', () => {
      const fn = jest.fn()
      const source = createEvent<string>()
      const clock = createStore(0)
      const result = sample(source, clock)
      result.watch(value => fn(value))
      //@ts-expect-error
      clock.setState(1)
      expect(fn).not.toHaveBeenCalled()
      source('run')
      expect(fn).not.toHaveBeenCalled()
      //@ts-expect-error
      clock.setState(2)
      expect(argumentHistory(fn)).toEqual(['run'])
    })
    test('store as clock with handler', () => {
      const fn = jest.fn()
      const handler = jest.fn(x => x)
      const source = createEvent<string>()
      const clock = createStore(0)
      const result = sample(source, clock, (source, clock) =>
        handler({
          source,
          clock,
        }),
      )
      result.watch(value => fn(value))
      //@ts-expect-error
      clock.setState(1)
      expect(fn).not.toHaveBeenCalled()
      expect(handler).not.toHaveBeenCalled()
      source('run')
      expect(fn).not.toHaveBeenCalled()
      expect(handler).not.toHaveBeenCalled()
      //@ts-expect-error
      clock.setState(2)
      expect(argumentHistory(fn)).toEqual([{source: 'run', clock: 2}])
      expect(argumentHistory(handler)).toEqual([{source: 'run', clock: 2}])
    })

    test('event source with store as target', () => {})
    test('event source with effect as target', () => {})
  })
  describe('sample with effect as source', () => {
    test('effect', () => {
      const fn = jest.fn()
      const data = createEffect({
        handler(_: any) {
          return 'resolved'
        },
      })
      const stop = createEvent()

      const lastData = sample(data, stop)

      lastData.watch(value => fn(value))

      data({foo: 'bar'})
      data(true)
      data(false)
      data({x: 'baz'})

      stop()

      expect(argumentHistory(fn)).toEqual([{x: 'baz'}])
      expect(fn).toHaveBeenCalledTimes(1)
    })
    it('support watchers as usual', async () => {
      const fn1 = jest.fn()
      const fn2 = jest.fn()
      const hello = createEffect({
        handler(_: any) {
          return Promise.resolve(200)
        },
      })
      const run = createEvent()

      sample(hello, run).watch(e => fn1(e))
      sample(hello.done, run).watch(e => fn2(e))

      await hello('test')

      run()
      expect(fn1).toHaveBeenCalledTimes(1)
      expect(fn2).toHaveBeenCalledTimes(1)
    })
    describe('event call will not break watchers', () => {
      it.each`
        greedy
        ${false}
        ${true}
      `(
        'event call will not break watchers (greedy = $greedy)',
        async ({greedy}) => {
          const fn1 = jest.fn()
          const hello = createEvent<string>()
          const run = createEvent<string>()

          sample({
            source: hello,
            clock: run,
            fn: (a, b) => ({a, b}),
            greedy,
          }).watch(() => {})

          sample({
            source: hello,
            clock: run,
            fn: (a, b) => ({a, b}),
            greedy,
          }).watch(e => fn1(e))

          run('R')
          hello('hello')

          run('RR')
          expect(fn1).toHaveBeenCalledTimes(1)
        },
      )
    })
    test('effect source with store as target', () => {})
    test('effect source with effect as target', () => {})
  })
  describe('sample with store as source', () => {
    test('store', () => {
      const fn = jest.fn()
      const inc = createEvent()
      const dec = createEvent()
      const stop = createEvent()

      const s1 = createStore(0)
      const s2 = sample(s1, stop)

      s2.watch(value => fn(value))

      s1.on(inc, n => n + 1).on(dec, n => n - 1)

      inc()
      dec()
      inc()
      inc()

      stop()

      expect(argumentHistory(fn)).toEqual([2])
    })
    test('store has the same state as source', () => {
      const fn = jest.fn()
      const stop = createEvent()

      const s1 = createStore(0)
      //@ts-expect-error
      s1.setState(1)

      const s2 = sample(s1, stop)
      s2.watch(e => fn(e))
      stop()
      expect(argumentHistory(fn)).toEqual([1])
    })

    test('store has its own defaultState', () => {
      const stop = createStore(0)

      const s1 = createStore(0)
      //@ts-expect-error
      s1.setState(1)

      const s2 = sample(s1, stop)

      expect(s2.defaultState).toEqual(1)
    })

    test('store source with event as target plain', () => {
      const foo = createStore([1, 2, 3])
      const bar = createStore([4, 5, 6])
      const stop = createEvent<string[]>()

      const baz = sample(bar, stop)

      foo.on(baz, (store1, store2) => [...store1, ...store2])

      stop(['stop'])
      expect(foo.getState()).toEqual([1, 2, 3, 4, 5, 6])
    })
    test('store source with effect as target', () => {})
  })
  test('store with handler', () => {
    const fn = jest.fn()
    const stop = createEvent<string>()

    const s1 = createStore(0)
    //@ts-expect-error
    s1.setState(1)

    const s2 = sample(s1, stop, (s1, stop) => ({s1, stop}))

    s2.watch(value => fn(value))
    expect(fn).toHaveBeenCalledTimes(0)
    //@ts-expect-error
    s1.setState(2)

    stop('x')
    expect(argumentHistory(fn)).toEqual([{s1: 2, stop: 'x'}])
    expect(fn).toHaveBeenCalledTimes(1)
  })
  test('store x store x handler', () => {
    const fn = jest.fn()
    const stop = createStore(false)

    const s1 = createStore(0)
    //@ts-expect-error
    s1.setState(1)

    const s2 = sample(s1, stop, (s1, stop) => ({s1, stop}))

    s2.watch(value => fn(value))
    expect(argumentHistory(fn)).toEqual([{s1: 1, stop: false}])
    //@ts-expect-error
    s1.setState(2)
    //@ts-expect-error
    s1.setState(0)

    //@ts-expect-error
    stop.setState(true)
    expect(argumentHistory(fn)).toEqual([
      {s1: 1, stop: false},
      {s1: 0, stop: true},
    ])
    expect(fn).toHaveBeenCalledTimes(2)
  })
})

test('array target', () => {
  const fn1 = jest.fn()
  const fn2 = jest.fn()
  const store = createStore(0)
  const trigger = createEvent()
  const t1 = createEvent()
  const t2 = createEvent()
  t1.watch(fn1)
  t2.watch(fn2)
  sample({
    source: store,
    clock: trigger,
    target: [t1, t2],
  })
  trigger()
  expect(argumentHistory(fn1)).toEqual([0])
  expect(argumentHistory(fn2)).toEqual([0])
})

test('validate shape', () => {
  expect(() => {
    const clock = createEvent()
    //@ts-expect-error
    sample(0, clock)
  }).toThrowErrorMatchingInlineSnapshot(`"expect first argument be an object"`)
})

test('source shape support', () => {
  const sampled = sample({
    source: {
      source: createStore(0),
    },
    clock: createEvent(),
  })
  expect(is.event(sampled)).toBe(true)
})

describe('it works without source', () => {
  test('it works with clock unit', () => {
    const fn = jest.fn()
    const clockA = createEvent<number>()
    const target = createEvent<number>()
    target.watch(fn)
    const result = sample({
      clock: clockA,
      target,
    })
    clockA(1)
    expect(result === target).toBe(true)
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        1,
      ]
    `)
  })
  test('it works with clock array', () => {
    const fn = jest.fn()
    const clockA = createEvent<number>()
    const clockB = createEvent<number>()
    const target = createEvent<number>()
    target.watch(fn)
    const result = sample({
      clock: [clockA, clockB],
      target,
    })
    clockA(1)
    clockB(4)
    expect(result === target).toBe(true)
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        1,
        4,
      ]
    `)
  })
})

describe('validation', () => {
  test('valid case without clock', () => {
    const source = createEvent<any>()
    const target = createEffect((_: any) => {})

    expect(() => {
      sample({source, target})
    }).not.toThrow()
  })
  test('valid case without source', () => {
    const clock = createEvent<any>()
    const target = createEffect((_: any) => {})

    expect(() => {
      sample({clock, target})
    }).not.toThrow()
  })
  test('source validation', () => {
    const target = createEffect((_: any) => {})
    expect(() => {
      //@ts-expect-error
      sample({source: undefined, target})
    }).toThrowErrorMatchingInlineSnapshot(`"sample: source should be defined"`)
  })
  test('clock validation', () => {
    const target = createEffect((_: any) => {})

    expect(() => {
      //@ts-expect-error
      sample({clock: undefined, target})
    }).toThrowErrorMatchingInlineSnapshot(`"sample: clock should be defined"`)
  })
  test('no source no clock', () => {
    const target = createEffect((_: any) => {})

    expect(() => {
      //@ts-expect-error
      sample({target})
    }).toThrowErrorMatchingInlineSnapshot(
      `"sample: either source or clock should be defined"`,
    )
  })
})

describe('event/effect sampling behavior (issue #633)', () => {
  test('event behavior', () => {
    const fn = jest.fn()
    const triggerEvent = createEvent()

    const targetFx = createEffect(() => {})
    const initEvent = createEvent()

    sample({
      clock: triggerEvent,
      target: [initEvent.prepend(() => 1), initEvent.prepend(() => 2)],
    })

    sample({
      clock: initEvent,
      filter: targetFx.pending.map(val => !val),
      target: targetFx,
    })

    targetFx.watch(params => fn(params))

    triggerEvent()
    /*
    [effect] targetFx 2
    [effect] targetFx.done {params: 2, result: undefined}
    */
    expect(argumentHistory(fn)).toEqual([2])
  })
  test('effect behavior', () => {
    const fn = jest.fn()
    const triggerEffect = createEvent()

    const targetFx = createEffect(() => {})
    const initFx = createEffect(() => {})

    sample({
      clock: triggerEffect,
      target: [initFx.prepend(() => 1), initFx.prepend(() => 2)],
    })

    sample({
      clock: initFx,
      filter: targetFx.pending.map(val => !val),
      target: targetFx,
    })

    targetFx.watch(params => fn(params))

    triggerEffect()
    /*
    [effect] targetFx 1
    [effect] targetFx 2
    [effect] targetFx.done {params: 1, result: undefined}
    [effect] targetFx.done {params: 2, result: undefined}
    */
    expect(argumentHistory(fn)).toEqual([1, 2])
  })
})

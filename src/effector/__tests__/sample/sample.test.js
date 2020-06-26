//@flow

import {
  sample,
  guard,
  Kind,
  createEvent,
  createStore,
  createEffect,
} from 'effector'

import {argumentHistory} from 'effector/fixtures'

test('sid support', () => {
  const source = createStore(null)
  const sampled = sample({source, sid: 'foo'})

  expect(sampled.sid).toBe('foo')
})

describe('temporal consistency', () => {
  test('in combination with guard, pass immediately', () => {
    const fn = jest.fn()
    const trigger = createEvent()
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
    const trigger = createEvent()
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
    const trigger = createEvent()
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
    const trigger = createEvent()
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
    const trigger = createEvent()
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
    const trigger = createEvent()
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
      source: createStore(null),
      clock: undefined,
    })
  }).toThrowErrorMatchingInlineSnapshot(`"config.clock should be defined"`)
})

describe('sample type', () => {
  test.each`
    source            | clock             | kind
    ${createStore(0)} | ${createStore(0)} | ${Kind.store}
    ${createStore(0)} | ${createEvent()}  | ${Kind.event}
    ${createEvent()}  | ${createStore(0)} | ${Kind.event}
    ${createEvent()}  | ${createEvent()}  | ${Kind.event}
  `(`$kind <- $source.kind by $clock.kind`, ({source, clock, kind}) => {
  expect(sample(source, clock).kind).toBe(kind)
})
  test.each`
    source            | clock             | kind
    ${createStore(0)} | ${createStore(0)} | ${Kind.store}
    ${createStore(0)} | ${createEvent()}  | ${Kind.event}
    ${createEvent()}  | ${createStore(0)} | ${Kind.event}
    ${createEvent()}  | ${createEvent()}  | ${Kind.event}
  `(
  `$kind <- $source.kind by $clock.kind with handler`,
  ({source, clock, kind}) => {
    expect(
      sample(source, clock, (source, clock) => ({source, clock})).kind,
    ).toBe(kind)
  },
)
})

describe('sample', () => {
  it('works with config', () => {
    const foo = createStore('')
    const bar = createStore('')

    //$todo
    sample({clock: foo, source: foo, target: bar})
  })
  it('handles object combination', () => {
    const foo = createStore('')
    //$todo
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
      const A = createEvent()
      const B = A.map(x => ({x}))

      //$todo
      sample(A, B, (A, B) => B, greedy).watch(e => fn(e))

      A(1)
      A(2)
      A(3)

      expect(argumentHistory(fn)).toEqual(resultDirect)
    })
    test('backtracking', () => {
      const fn = jest.fn()
      const A = createEvent()
      const B = A.map(x => ({x}))

      //$todo
      sample(B, A, B => B, greedy).watch(e => fn(e))

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
      const A = createEvent()
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
      const data = createEvent()
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
      const data = createEvent()
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
        const data = createEvent()
        const add = createEvent()
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
      const release = createEvent()
      const emit = createEvent()
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
      const source = createEvent()
      const clock = createStore(0)
      const result = sample(source, clock)
      result.watch(value => fn(value))
      //$todo
      clock.setState(1)
      expect(fn).not.toHaveBeenCalled()
      source('run')
      expect(fn).not.toHaveBeenCalled()
      //$todo
      clock.setState(2)
      expect(argumentHistory(fn)).toEqual(['run'])
    })
    test('store as clock with handler', () => {
      const fn = jest.fn()
      const handler = jest.fn(x => x)
      const source = createEvent()
      const clock = createStore(0)
      const result = sample(source, clock, (source, clock) =>
        handler({
          source,
          clock,
        }),
      )
      result.watch(value => fn(value))
      //$todo
      clock.setState(1)
      expect(fn).not.toHaveBeenCalled()
      expect(handler).not.toHaveBeenCalled()
      source('run')
      expect(fn).not.toHaveBeenCalled()
      expect(handler).not.toHaveBeenCalled()
      //$todo
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
        handler() {
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
    it('support watchers as usual', async() => {
      const fn1 = jest.fn()
      const fn2 = jest.fn()
      const hello = createEffect({
        handler() {
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
  async({greedy}) => {
    const fn1 = jest.fn()
    const hello = createEvent()
    const run = createEvent()

    //$todo
    sample(hello, run, (a, b) => ({a, b}), greedy).watch(() => {})
    //$todo
    sample(hello, run, (a, b) => ({a, b}), greedy).watch(e => fn1(e))

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
      //$todo
      s1.setState(1)

      const s2 = sample(s1, stop)
      s2.watch(e => fn(e))
      stop()
      expect(argumentHistory(fn)).toEqual([1])
    })

    test('store has its own defaultState', () => {
      const stop = createStore(0)

      const s1 = createStore(0)
      //$todo
      s1.setState(1)

      const s2 = sample(s1, stop)

      expect(s2.defaultState).toEqual(1)
    })

    test('store source with event as target plain', () => {
      const foo = createStore([1, 2, 3])
      const bar = createStore([4, 5, 6])
      const stop = createEvent()

      const baz = sample(bar, stop)

      foo.on(baz, (store1, store2) => [...store1, ...store2])

      stop(['stop'])
      expect(foo.getState()).toEqual([1, 2, 3, 4, 5, 6])
    })
    test('store source with effect as target', () => {})
  })
  test('store with handler', () => {
    const fn = jest.fn()
    const stop = createEvent()

    const s1 = createStore(0)
    //$todo
    s1.setState(1)

    const s2 = sample(s1, stop, (s1, stop) => ({s1, stop}))

    s2.watch(value => fn(value))
    expect(fn).toHaveBeenCalledTimes(0)
    //$todo
    s1.setState(2)

    stop('x')
    expect(argumentHistory(fn)).toEqual([{s1: 2, stop: 'x'}])
    expect(fn).toHaveBeenCalledTimes(1)
  })
  test('store x store x handler', () => {
    const fn = jest.fn()
    const stop = createStore(false)

    const s1 = createStore(0)
    //$todo
    s1.setState(1)

    const s2 = sample(s1, stop, (s1, stop) => ({s1, stop}))

    s2.watch(value => fn(value))
    expect(argumentHistory(fn)).toEqual([{s1: 1, stop: false}])
    //$todo
    s1.setState(2)
    //$todo
    s1.setState(0)

    //$todo
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
    sample(0, clock)
  }).toThrowErrorMatchingInlineSnapshot(`"shape should be an object"`)
})

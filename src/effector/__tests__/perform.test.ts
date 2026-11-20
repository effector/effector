import {inspectGraph} from 'effector/inspect'
import {
  perform,
  createStore,
  createEvent,
  createEffect,
  combine,
  sample,
  fork,
  allSettled,
  serialize,
  createWatch,
  scopeBind,
  clearNode,
  withRegion,
  createNode,
} from 'effector'

test('update swaps stores atomically and composes with sample and combine', () => {
  const a = createStore(1)
  const b = createStore(2)
  const watch = jest.fn()
  combine({a, b}).watch(watch)
  const swapped = createEvent<{a: number; b: number}>()
  const sampled = jest.fn()
  swapped.watch(sampled)
  const swap = perform({
    update: {a, b},
    action: (set, value) => {
      set.a(value.b)
      set.b(value.a)
    },
  })
  sample({clock: [a, b], source: {a, b}, target: swapped})
  swap()
  expect(watch.mock.calls).toEqual([[{a: 1, b: 2}], [{a: 2, b: 1}]])
  expect(sampled.mock.calls).toEqual([[{a: 2, b: 1}]])
})

test('source, update and targets share scope and settle effects', async () => {
  const config = createStore(2, {sid: 'perform-config'})
  const count = createStore(0, {sid: 'perform-count'})
  const save = createEffect((n: number) => n * 2)
  const fn = jest.fn((n: number) => n * 3)
  const action = perform({
    source: {config},
    update: {count},
    target: {save},
    action: (set, source, n: number) => {
      set.count(source.count + n * source.config)
      set.save(source.count + n)
    },
  })
  const scope = fork({
    values: [
      [config, 4],
      [count, 10],
    ],
    handlers: [[save, fn]],
  })
  const result = jest.fn()
  createWatch({unit: save.doneData, scope, fn: result})
  await allSettled(action, {scope, params: 3})
  expect(scope.getState(count)).toBe(22)
  expect(count.getState()).toBe(0)
  expect(serialize(scope)).toEqual({'perform-config': 4, 'perform-count': 22})
  expect(fn).toHaveBeenCalledWith(13)
  expect(result).toHaveBeenCalledWith(39)
  scopeBind(action, {scope})(1)
  await allSettled(scope)
  expect(scope.getState(count)).toBe(26)
})

test('single update and store reinit', async () => {
  const count = createStore(1)
  const inc = perform({update: count, action: (set, count) => set(count + 1)})
  const reset = perform({target: count, action: set => set.reinit()})
  const scope = fork()
  await allSettled(inc, {scope})
  expect(scope.getState(count)).toBe(2)
  await allSettled(reset, {scope})
  expect(scope.getState(count)).toBe(1)
})

test('clock arrays, source prefixes and conditional targets', () => {
  const a = createEvent<number>()
  const b = createEvent<number>()
  const store = createStore(5)
  const target = createEvent<number>()
  const watch = jest.fn()
  target.watch(watch)
  expect(
    perform({
      clock: [a, b],
      source: {$value: store},
      target,
      action: (set, {value}, n) => {
        if (n > 0) expect(set(value + n)).toBe(value + n)
      },
    }),
  ).toBeUndefined()
  a(-1)
  b(2)
  expect(watch.mock.calls).toEqual([[7]])
})

test('perform events compose as targets', () => {
  const store = createStore(0)
  const inner = perform({
    update: store,
    action: (set, value, n: number) => set(value + n),
  })
  const outer = perform({target: inner, action: (set, n: number) => set(n * 2)})
  const start = createEvent<number>()
  sample({clock: start, target: outer})
  start(3)
  expect(store.getState()).toBe(6)
})

test('undefined and function payloads remain values', () => {
  const event = createEvent<void>()
  const fn = () => 2
  const store = createStore(() => 1)
  const watch = jest.fn()
  event.watch(watch)
  perform({
    target: {event, store},
    action: set => {
      set.event()
      set.store(fn)
    },
  })()
  expect(watch.mock.calls).toEqual([[undefined]])
  expect(store.getState()).toBe(fn)
})

test('duplicate target calls warn and keep last value, including aliases', () => {
  const event = createEvent<number>()
  const watch = jest.fn()
  event.watch(watch)
  const error = jest.spyOn(console, 'error').mockImplementation(() => {})
  try {
    perform({
      target: {a: event, b: event},
      action: set => {
        set.a(1)
        set.b(2)
      },
    })()
    expect(error).toHaveBeenCalledTimes(1)
    expect(watch.mock.calls).toEqual([[2]])
  } finally {
    error.mockRestore()
  }
})

test('escaped callbacks cannot write after completion or failure', () => {
  const store = createStore(0)
  let escaped: (n: number) => number
  const error = jest.spyOn(console, 'error').mockImplementation(() => {})
  try {
    perform({
      target: store,
      action: set => {
        escaped = set
        set(1)
        throw Error('stop')
      },
    })()
    expect(store.getState()).toBe(0)
    expect(() => escaped(2)).toThrow('synchronously')
    perform({
      target: store,
      action: set => {
        escaped = set
      },
    })()
    expect(() => escaped(3)).toThrow('synchronously')
    expect(store.getState()).toBe(0)
  } finally {
    error.mockRestore()
  }
})

test.each([true, false])('batch=%s follows sample scheduling', batch => {
  const clock = createEvent()
  const a = createStore(0).on(clock, n => n + 1)
  const b = createStore(0).on(clock, n => n + 1)
  const actual: any[] = []
  const expected: any[] = []
  sample({
    clock: [a, b],
    source: {a, b},
    batch,
    fn: value => expected.push(value),
  })
  perform({
    clock: [a, b],
    source: {a, b},
    target: {},
    batch,
    action: (_, value) => {
      actual.push(value)
    },
  })
  clock()
  expect(actual).toEqual(expected)
  expect(actual.length).toBe(batch ? 1 : 2)
})

test('region cleanup removes perform links', () => {
  const clock = createEvent<number>()
  const target = createStore(0)
  const region = createNode()
  withRegion(region, () => perform({clock, target, action: (set, n) => set(n)}))
  clock(1)
  clearNode(region)
  clock(2)
  expect(target.getState()).toBe(1)
})

test('rejects invalid configuration before use', () => {
  const store = createStore(0)
  const invalid: any[] = [
    {target: store.map(x => x)},
    {update: createEvent()},
    {update: store, source: {store}},
    {update: {store}, target: {store}},
    {source: {$a: store, a: store}, target: store},
    {source: createEvent(), target: store},
    {target: {bad: 1}},
  ]
  invalid.forEach(config =>
    expect(() => perform({...config, action() {}})).toThrow('perform'),
  )
})

test('independent scopes do not share collected writes or source state', async () => {
  const count = createStore(0)
  const inc = perform({update: count, action: (set, value) => set(value + 1)})
  const a = fork({values: [[count, 10]]})
  const b = fork({values: [[count, 20]]})
  await Promise.all([allSettled(inc, {scope: a}), allSettled(inc, {scope: b})])
  expect(a.getState(count)).toBe(11)
  expect(b.getState(count)).toBe(21)
  expect(count.getState()).toBe(0)
})

test('reentrant clock calls use separate invocation buffers', () => {
  const start = createEvent<number>()
  const target = createEvent<number>()
  const seen: number[] = []
  perform({clock: start, target, action: (set, n) => set(n)})
  target.watch(n => {
    seen.push(n)
    if (n === 1) start(2)
  })
  start(1)
  expect(seen).toEqual([1, 2])
})

test('store reinit is a batched target and can be composed', () => {
  const store = createStore(0)
  const action = perform({
    target: store,
    action: (set, n: number) => (n ? set(n) : set.reinit()),
  })
  const reset = jest.fn()
  store.reinit.watch(reset)
  action(4)
  action(0)
  expect(store.getState()).toBe(0)
  expect(reset).toHaveBeenCalledTimes(1)
})

test('generated event accepts explicit name and sid', () => {
  const event = perform({
    name: 'submit',
    sid: 'submit-sid',
    target: {},
    action() {},
  })
  expect(event.shortName).toBe('submit')
  expect(event.sid).toBe('submit-sid')
})

test('source reads include reducers triggered by the same clock', () => {
  const clock = createEvent<number>()
  const source = createStore(0).on(clock, (n, delta) => n + delta)
  const target = createStore(0)
  perform({
    clock,
    source,
    target,
    action: (set, value, delta) => set(value + delta),
  })
  clock(2)
  expect(target.getState()).toBe(4)
})

test('object keys cannot collide with internal reset routing', () => {
  const store = createStore(0)
  const event = createEvent<number>()
  const seen = jest.fn()
  event.watch(seen)
  perform({
    target: {store, '__store.reinit__': event},
    action: set => {
      set.store(1)
      set['__store.reinit__'](2)
    },
  })()
  expect(store.getState()).toBe(1)
  expect(seen).toHaveBeenCalledWith(2)
})

test('clearing a perform event preserves other target subscriptions', () => {
  const other = createEvent<number>()
  const store = createStore(0).on(other, (_, n) => n)
  const action = perform({target: store, action: (set, n: number) => set(n)})
  const seen = jest.fn()
  store.watch(seen)
  action(1)
  clearNode(action)
  other(2)
  expect(store.getState()).toBe(2)
  expect(seen.mock.calls).toEqual([[0], [1], [2]])
})

test('requires the action field', () => {
  expect(() => perform({target: {}, fn() {}} as any)).toThrow(
    'action should be a function',
  )
})

test('declares only the public event with its sid', () => {
  const declarations: string[] = []
  const stop = inspectGraph({
    fn: declaration => {
      if (declaration.type === 'unit' && declaration.sid === 'perform-public') {
        declarations.push(declaration.kind)
      }
    },
  })
  try {
    perform({sid: 'perform-public', target: {}, action() {}})
    expect(declarations).toEqual(['event'])
  } finally {
    stop()
  }
})

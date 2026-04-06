import {
  createStore,
  createEvent,
  createEffect,
  sample,
  combine,
  fork,
  allSettled,
  serialize,
  step,
  attach,
} from 'effector'
import {argumentHistory, muteErrors} from 'effector/fixtures'

describe('.map', () => {
  muteErrors('skipVoid')

  it('supports basic mapping', () => {
    const fn = jest.fn()
    const newWord = createEvent<string>()
    const a = createStore('word').on(newWord, (_, word) => word)

    const b = a.map(word => word.length)

    b.watch(fn)

    expect(a.getState()).toBe('word')
    expect(b.getState()).toBe(4)

    newWord('lol')

    expect(a.getState()).toBe('lol')
    expect(b.getState()).toBe(3)

    newWord('long word')

    expect(a.getState()).toBe('long word')
    expect(b.getState()).toBe(9)

    expect(fn).toHaveBeenCalledTimes(3)

    newWord('word long')

    expect(fn).toHaveBeenCalledTimes(3)
  })
  it('calls given handler with only one argument', () => {
    const fn = jest.fn()
    const inc = createEvent()
    const store = createStore(0).on(inc, x => x + 1)
    // @ts-expect-error
    const computed = store.map((x, state) => `(${x}, ${state})`)
    computed.watch(fn)
    inc()
    inc()
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        "(0, undefined)",
        "(1, undefined)",
        "(2, undefined)",
      ]
    `)
  })

  it('supports nested mapping with updates skipping', () => {
    const a = createStore(null)
    const f = jest.fn(a => {
      if (a) return a.id
    })
    const g = jest.fn(a => a.nice)
    const b = a.map(f)
    const c = b.map(g)

    expect(c.getState()).toBe(undefined)
    expect(g).toHaveBeenCalledTimes(0)
  })
})

describe('.watch', () => {
  it('supports functions', () => {
    const fn = jest.fn()
    const newWord = createEvent<string>()
    const $a = createStore('word').on(newWord, (_, word) => word)

    const $b = $a.map(word => word.length)

    const $sum = createStore(4).on($b, (ln, prevLn) => ln + prevLn)

    $sum.watch(fn)

    newWord('lol')

    newWord('long word')

    expect(fn).toHaveBeenCalledTimes(3)

    newWord('')

    expect(fn).toHaveBeenCalledTimes(3)
  })
  it('returns unsubscribe function', () => {
    const fn = jest.fn()
    const newWord = createEvent<string>()
    const a = createStore('word').on(newWord, (_, word) => word)

    const b = a.map(word => word.length)

    const sum = createStore(4).on(b, (ln, prevLn) => ln + prevLn)

    const unsub = sum.watch(sum => {
      fn(sum)
    })

    newWord('lol')

    newWord('long word [1]')
    expect(fn).toHaveBeenCalledTimes(3)

    unsub()

    newWord('long word _ [2]')
    expect(fn).toHaveBeenCalledTimes(3)
  })
  it('supports events', () => {
    const fn = jest.fn()
    const newWord = createEvent<string>('new word')
    const spyEvent = createEvent<number>()
    const $a = createStore('word').on(newWord, (_, word) => word)

    const $b = $a.map(word => word.length)

    const $sum = createStore(4).on($b, (ln, prevLn) => ln + prevLn)

    const callJestfnFx = attach({
      source: $sum,
      effect(store, event: number) {
        fn({store, event})
      },
    })

    sample({clock: spyEvent, target: callJestfnFx})

    newWord('lol')
    expect(fn).toHaveBeenCalledTimes(0)
    spyEvent(1)
    spyEvent(2)
    expect(fn).toHaveBeenCalledTimes(2)

    newWord('')
    expect(fn).toHaveBeenCalledTimes(2)
    newWord(' ')
    expect(fn).toHaveBeenCalledTimes(2)

    spyEvent(3)
    newWord('long word')
    expect(fn).toHaveBeenCalledTimes(3)
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        Object {
          "event": 1,
          "store": 7,
        },
        Object {
          "event": 2,
          "store": 7,
        },
        Object {
          "event": 3,
          "store": 8,
        },
      ]
    `)
  })
  it('supports effects', () => {
    const fn = jest.fn()
    const newWord = createEvent<string>('new word')
    const triggerFx = createEffect((arg: number) => {})
    const $a = createStore('word').on(newWord, (_, word) => word)

    const $b = $a.map(word => word.length)

    const $sum = createStore(4).on($b, (ln, prevLn) => ln + prevLn)

    const callJestfnFx = attach({
      source: $sum,
      effect(store, event: number) {
        fn({store, event})
      },
    })

    sample({clock: triggerFx, target: callJestfnFx})

    newWord('lol')
    expect(fn).toHaveBeenCalledTimes(0)
    triggerFx(1)
    triggerFx(2)
    expect(fn).toHaveBeenCalledTimes(2)

    newWord('')
    expect(fn).toHaveBeenCalledTimes(2)
    newWord(' ')
    expect(fn).toHaveBeenCalledTimes(2)

    triggerFx(3)
    newWord('long word')
    expect(fn).toHaveBeenCalledTimes(3)
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        Object {
          "event": 1,
          "store": 7,
        },
        Object {
          "event": 2,
          "store": 7,
        },
        Object {
          "event": 3,
          "store": 8,
        },
      ]
    `)
  })
})

describe('.off', () => {
  it('allows to unsubscribe store from event', () => {
    const fn = jest.fn()
    const newWord = createEvent<string>()
    const $a = createStore('word').on(newWord, (_, word) => word)

    const $b = $a.map(word => word.length)

    const $sum = createStore(4).on($b, (ln, prevLn) => ln + prevLn)

    $sum.watch(fn)

    expect($a.getState()).toBe('word')
    expect($b.getState()).toBe(4)
    expect($sum.getState()).toBe(4)

    newWord('lol')

    expect($a.getState()).toBe('lol')
    expect($b.getState()).toBe(3)
    expect($sum.getState()).toBe(7)

    $a.off(newWord)

    newWord('long word')

    expect($a.getState()).toBe('lol')
    expect($b.getState()).toBe(3)
    expect($sum.getState()).toBe(7)

    expect(fn).toHaveBeenCalledTimes(2)

    newWord('')

    expect(fn).toHaveBeenCalledTimes(2)
  })
  it('returns store itself', () => {
    const newWord = createEvent()
    const a = createStore('word').on(newWord, (_, word) => word)
    expect(a.off(newWord)).toBe(a)
  })
})

describe('updateFilter', () => {
  muteErrors('failure')
  it('prevent store from updates when returns false', () => {
    const fn = jest.fn()
    const moveTo = createEvent<{x: number; y: number}>()
    const position = createStore(
      {x: 0, y: 0},
      {
        updateFilter: (upd, {x, y}) => upd.x !== x || upd.y !== y,
      },
    ).on(moveTo, (_, upd) => upd)
    position.updates.watch(fn)
    moveTo({x: 1, y: 1})
    moveTo({x: 1, y: 1})
    moveTo({x: 1, y: 2})
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        Object {
          "x": 1,
          "y": 1,
        },
        Object {
          "x": 1,
          "y": 2,
        },
      ]
    `)
  })
  it('prevent store from updates when throws', () => {
    const fn = jest.fn()
    const moveTo = createEvent<{x: number; y: number}>()
    const position = createStore(
      {x: 0, y: 0},
      {
        updateFilter(upd, {x, y}) {
          if (upd.x === x && upd.y === y) throw Error('failure')
          return true
        },
      },
    ).on(moveTo, (_, upd) => upd)
    position.updates.watch(fn)
    moveTo({x: 1, y: 1})
    moveTo({x: 1, y: 1})
    moveTo({x: 1, y: 2})
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        Object {
          "x": 1,
          "y": 1,
        },
        Object {
          "x": 1,
          "y": 2,
        },
      ]
    `)
  })
})

describe('void skip pattern deprecation', () => {
  let warn: jest.SpyInstance<void, [message?: any, ...optionalParams: any[]]>
  beforeEach(() => {
    warn = jest.spyOn(console, 'error').mockImplementation(() => {})
  })
  afterEach(() => {
    warn.mockRestore()
  })

  function getWarning() {
    return warn.mock.calls.map(([msg]) => msg).join('\n')
  }

  describe('writable stores', () => {
    test('createStore throw on undefined', () => {
      expect(() => {
        const $foo = createStore(undefined)
      }).toThrowErrorMatchingInlineSnapshot(
        `"[store] unit '$foo': undefined is used to skip updates. To allow undefined as a value provide explicit { skipVoid: false } option"`,
      )
    })
    test('createStore throw on undefined, if used with {skipVoid: true}', () => {
      expect(() => {
        const $foo = createStore(undefined, {skipVoid: true})
      }).toThrowErrorMatchingInlineSnapshot(
        `"[store] unit '$foo': undefined is used to skip updates. To allow undefined as a value provide explicit { skipVoid: false } option"`,
      )
    })
    test('createStore do not throw on undefined with skipVoid: false', () => {
      expect(() => createStore(undefined, {skipVoid: false})).not.toThrow()
    })
    test('createStore warns deprecation, if used with {skipVoid: true}', () => {
      expect(() => {
        const $foo = createStore(null, {skipVoid: true})
      }).not.toThrow()
      expect(getWarning()).toMatchInlineSnapshot(
        `"[store] unit '$foo': {skipVoid: true} is deprecated, use updateFilter instead"`,
      )
    })
    test('createStore does not warn anything, if {skipVoid} and undefined are not presented', () => {
      expect(() => createStore(null)).not.toThrow()
      expect(getWarning()).toBe('')
    })

    describe('store.on', () => {
      test('store.on reducer skips updates with undefined, but shows warning', () => {
        const inc = createEvent()
        const store = createStore(0).on(inc, () => {})
        inc()
        expect(getWarning()).toMatchInlineSnapshot(
          `"Error: store at /src/effector/__tests__/store/index.test.ts: undefined is used to skip updates. To allow undefined as a value provide explicit { skipVoid: false } option"`,
        )
      })
      test('store.on reducer skips updates with undefined and does not warn, if store has {skipVoid: true} (only warning of the store itself is shown)', () => {
        const inc = createEvent()
        const store = createStore(0, {skipVoid: true}).on(inc, () => {})
        expect(getWarning()).toMatchInlineSnapshot(
          `"[store] unit 'store': {skipVoid: true} is deprecated, use updateFilter instead"`,
        )
        inc()
        expect(getWarning()).toMatchInlineSnapshot(
          `"[store] unit 'store': {skipVoid: true} is deprecated, use updateFilter instead"`,
        )
      })
      test('store.on reducer allows undefined as a value, if store has {skipVoid: false}', () => {
        const inc = createEvent()
        const store = createStore(0, {skipVoid: false}).on(inc, () => {})
        inc()
        expect(getWarning()).toBe('')
        expect(store.getState()).toBe(undefined)
      })
    })

    describe('sample target', () => {
      test('sample target skips updates with undefined, but shows warning', () => {
        const inc = createEvent()
        const store = createStore<number | void>(0)
        sample({clock: inc, fn: () => {}, target: store})
        inc()
        expect(getWarning()).toMatchInlineSnapshot(
          `"Error: store at /src/effector/__tests__/store/index.test.ts: undefined is used to skip updates. To allow undefined as a value provide explicit { skipVoid: false } option"`,
        )
      })
      test('sample target skips updates with undefined, but shows warning, if store has {skipVoid: true}', () => {
        const inc = createEvent()
        const store = createStore<number | void>(0, {skipVoid: true})
        sample({clock: inc, fn: () => {}, target: store})
        inc()
        expect(getWarning()).toMatchInlineSnapshot(
          `"[store] unit 'store': {skipVoid: true} is deprecated, use updateFilter instead"`,
        )
      })
      test('sample target allows undefined as a value, if store has {skipVoid: false}', () => {
        const inc = createEvent()
        const store = createStore<number | void>(0, {skipVoid: false})
        sample({clock: inc, fn: () => {}, target: store})
        inc()
        expect(getWarning()).toBe('')
        expect(store.getState()).toBe(undefined)
      })
    })

    describe('Fork API', () => {
      test('undefined as a value is allowed in serialize result, if store has {skipVoid: false}', async () => {
        const inc = createEvent()
        const store = createStore(0, {skipVoid: false}).on(inc, () => {})

        const scope = fork()

        await allSettled(inc, {scope})

        expect(scope.getState(store)).toBe(undefined)
        expect(serialize(scope)).toMatchObject({
          [store.sid!]: undefined,
        })
      })
    })
  })

  describe('store.map', () => {
    test('store.map warn on initial undefined', () => {
      const $foo = createStore(null).map(() => {})

      expect(getWarning()).toMatchInlineSnapshot(
        `"[store] unit '$foo → *': undefined is used to skip updates. To allow undefined as a value provide explicit { skipVoid: false } option"`,
      )
    })
    test('store.map warn on initial undefined, if used with {skipVoid: true}', () => {
      const $foo = createStore(null).map(() => {}, {skipVoid: true})

      expect(getWarning()).toMatchInlineSnapshot(
        `"[store] unit '$foo → *': {skipVoid: true} is deprecated, use updateFilter instead"`,
      )
    })
    test('store.map skips updates with undefined, but shows warning', () => {
      const inc = createEvent<number>()
      const store = createStore(0)
        .on(inc, (_, v) => v)
        .map(x => (x > 3 ? undefined : x))
      inc(4)
      expect(getWarning()).toMatchInlineSnapshot(
        `"Error: store → *: undefined is used to skip updates. To allow undefined as a value provide explicit { skipVoid: false } option"`,
      )
    })
    test('store.map skips updates with undefined, but shows one warning, if used with {skipVoid: true}', () => {
      const inc = createEvent<number>()
      const store = createStore(0)
        .on(inc, (_, v) => v)
        .map(x => (x > 3 ? undefined : x), {skipVoid: true})
      inc(4)
      inc(5)
      inc(6)
      expect(getWarning()).toMatchInlineSnapshot(
        `"[store] unit 'store → *': {skipVoid: true} is deprecated, use updateFilter instead"`,
      )
    })
    test('store.map do not warn on initial undefined, if used with {skipVoid: false}', () => {
      expect(() => {
        createStore(null).map(() => {}, {skipVoid: false})
      }).not.toThrow()
      expect(getWarning()).toBe('')
    })
    test('store.map do not warn on update undefined, if used with {skipVoid: false}', () => {
      const inc = createEvent<number>()
      const store = createStore(0)
        .on(inc, (_, v) => v)
        .map(x => (x > 3 ? undefined : x), {skipVoid: false})
      inc(4)
      expect(getWarning()).toBe('')
      expect(store.getState()).toBe(undefined)
    })
  })

  describe('combine', () => {
    test('combine warns on initial undefined', () => {
      const $foo = combine({a: createStore(null)}, () => {})

      expect(getWarning()).toMatchInlineSnapshot(
        `"[combine] unit '$foo': undefined is used to skip updates. To allow undefined as a value provide explicit { skipVoid: false } option"`,
      )
    })
    test('combine warn on initial undefined, if used with {skipVoid: true}', () => {
      const $foo = combine({a: createStore(null)}, () => {}, {skipVoid: true})
      expect(getWarning()).toMatchInlineSnapshot(
        `"[store] unit '$foo': {skipVoid: true} is deprecated, use updateFilter instead"`,
      )
    })
    test('combine skips updates with undefined, but shows warning', () => {
      const inc = createEvent<number>()
      const store = combine({a: createStore(0).on(inc, (_, v) => v)}, x =>
        x.a > 3 ? undefined : x,
      )
      inc(4)
      expect(getWarning()).toMatchInlineSnapshot(
        `"Error: store at /src/effector/__tests__/store/index.test.ts: undefined is used to skip updates. To allow undefined as a value provide explicit { skipVoid: false } option"`,
      )
    })
    test('combine skips updates with undefined, but shows one warning, if used with {skipVoid: true}', () => {
      const inc = createEvent<number>()
      const store = combine(
        {a: createStore(0).on(inc, (_, v) => v)},
        x => (x.a > 3 ? undefined : x),
        {skipVoid: true},
      )
      inc(4)
      inc(5)
      inc(6)
      expect(getWarning()).toMatchInlineSnapshot(
        `"[store] unit 'store': {skipVoid: true} is deprecated, use updateFilter instead"`,
      )
    })
    test('combine do not warn on initial undefined, if used with {skipVoid: false}', () => {
      expect(() => {
        combine({a: createStore(null)}, () => {}, {skipVoid: false})
      }).not.toThrow()
      expect(getWarning()).toBe('')
    })
    test('combine do not warn on update undefined, if used with {skipVoid: false}', () => {
      const inc = createEvent<number>()
      const store = combine(
        {a: createStore(0).on(inc, (_, v) => v)},
        x => (x.a > 3 ? undefined : x),
        {skipVoid: false},
      )
      inc(4)
      expect(getWarning()).toBe('')
      expect(store.getState()).toBe(undefined)
    })
  })
})

test('patronum previousValue agreement', () => {
  /**
   * Tests agreement on non-breaking of internals between core effector and patronum previousValue
   * previousValue assumes that previous store value will be in stack.a after last store node step
   */
  const fn = jest.fn()
  const inc = createEvent()
  const $foo = createStore(0)
  $foo.on(inc, x => x + 1)
  ;($foo as any).graphite.seq.push(
    step.compute({
      fn(upd, _, stack) {
        fn([upd, stack.a])
        return upd
      },
    }),
  )
  inc()
  inc()
  expect(argumentHistory(fn)).toEqual([
    [1, 0],
    [2, 1],
  ])
})

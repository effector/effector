import {createStore, createEvent, createEffect, sample, combine} from 'effector'
import {argumentHistory} from 'effector/fixtures'

describe('.map', () => {
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

  test('second argument throw an error', () => {
    const $a = createStore(10)
    expect(() => {
      // @ts-expect-error
      $a.map((x, y) => x + y, 2)
    }).toThrowErrorMatchingInlineSnapshot(
      `"second argument of store.map is not supported, use updateFilter instead"`,
    )
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
    const a = createStore('word').on(newWord, (_, word) => word)

    const b = a.map(word => word.length)

    const sum = createStore(4).on(b, (ln, prevLn) => ln + prevLn)

    sum.watch(fn)

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
    const a = createStore('word').on(newWord, (_, word) => word)

    const b = a.map(word => word.length)

    const sum = createStore(4).on(b, (ln, prevLn) => ln + prevLn)

    sum.watch(spyEvent, (store, event) => fn({store, event}))

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
    const spyEvent = createEffect()
    spyEvent.use(args => args)
    const a = createStore('word').on(newWord, (_, word) => word)

    const b = a.map(word => word.length)

    const sum = createStore(4).on(b, (ln, prevLn) => ln + prevLn)

    sum.watch(spyEvent, (store, event) => fn({store, event}))

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
})

describe('.off', () => {
  it('allows to unsubscribe store from event', () => {
    const fn = jest.fn()
    const newWord = createEvent<string>()
    const a = createStore('word').on(newWord, (_, word) => word)

    const b = a.map(word => word.length)

    const sum = createStore(4).on(b, (ln, prevLn) => ln + prevLn)

    sum.watch(fn)

    expect(a.getState()).toBe('word')
    expect(b.getState()).toBe(4)
    expect(sum.getState()).toBe(4)

    newWord('lol')

    expect(a.getState()).toBe('lol')
    expect(b.getState()).toBe(3)
    expect(sum.getState()).toBe(7)

    a.off(newWord)

    newWord('long word')

    expect(a.getState()).toBe('lol')
    expect(b.getState()).toBe(3)
    expect(sum.getState()).toBe(7)

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
  let consoleError: any
  beforeEach(() => {
    consoleError = console.error
    console.error = () => {}
  })
  afterEach(() => {
    console.error = consoleError
  })
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
    return warn.mock.calls.map(([msg]) => msg)[0]
  }

  describe('writable stores', () => {
    test('createStore throw on undefined', () => {
      expect(() => createStore(undefined)).toThrowErrorMatchingInlineSnapshot(
        `"undefined is used to skip updates. To allow undefined as a value provide explicit { skipVoid: false } option"`,
      )
    })
    test('createStore throw on undefined, if used with {skipVoid: true}', () => {
      expect(() =>
        createStore(undefined, {skipVoid: true}),
      ).toThrowErrorMatchingInlineSnapshot(
        `"undefined is used to skip updates. To allow undefined as a value provide explicit { skipVoid: false } option"`,
      )
    })
    test('createStore do not throw on undefined with skipVoid: false', () => {
      expect(() => createStore(undefined, {skipVoid: false})).not.toThrow()
    })
    test('createStore warns deprecation, if used with {skipVoid: true}', () => {
      expect(() => createStore(null, {skipVoid: true})).not.toThrow()
      expect(getWarning()).toMatchInlineSnapshot(
        `"{skipVoud: true} is deprecated, use updateFilter instead"`,
      )
    })

    describe('store.on', () => {
      test('store.on reducer skips updates with undefined, but shows warning', () => {
        const inc = createEvent()
        const store = createStore(0).on(inc, () => {})
        inc()
        expect(getWarning()).toMatchInlineSnapshot(
          `"undefined is used to skip updates. To allow undefined as a value provide explicit { skipVoid: false } option"`,
        )
      })
      test('store.on reducer skips updates with undefined, but shows warning, if store has {skipVoid: true}', () => {
        const inc = createEvent()
        const store = createStore(0, {skipVoid: true}).on(inc, () => {})
        inc()
        expect(getWarning()).toMatchInlineSnapshot(
          `"{skipVoud: true} is deprecated, use updateFilter instead"`,
        )
      })
      test('store.on reducer allows undefined as a value, if store has {skipVoid: false}', () => {
        const inc = createEvent()
        const store = createStore(0, {skipVoid: false}).on(inc, () => {})
        inc()
        expect(getWarning()).toBe(undefined)
        expect(store.getState()).toBe(undefined)
      })
    })

    describe('sample target', () => {
      test('sample target skips updates with undefined, but shows warning', () => {
        const inc = createEvent()
        const store = createStore<number | void>(0)
        sample({ clock: inc, fn: () => {}, target: store })
        inc()
        expect(getWarning()).toMatchInlineSnapshot(
          `"undefined is used to skip updates. To allow undefined as a value provide explicit { skipVoid: false } option"`,
        )
      })
      test(
        'sample target skips updates with undefined, but shows warning, if store has {skipVoid: true}',
        () => {
          const inc = createEvent()
          const store = createStore<number | void>(0, {skipVoid: true})
          sample({ clock: inc, fn: () => {}, target: store })
          inc()
          expect(getWarning()).toMatchInlineSnapshot(
            `"{skipVoud: true} is deprecated, use updateFilter instead"`,
          )
        }
      )
      test(
        'sample target allows undefined as a value, if store has {skipVoid: false}',
        () => {
          const inc = createEvent()
          const store = createStore<number | void>(0, {skipVoid: false})
          sample({ clock: inc, fn: () => {}, target: store })
          inc()
          expect(getWarning()).toBe(undefined)
          expect(store.getState()).toBe(undefined)
        }
      )
    })
  })

  describe('store.map', () => {
    test('store.map throw on initial undefined', () => {
      expect(() => {
        createStore(null).map(() => {})
      }).toThrowErrorMatchingInlineSnapshot(
        `"undefined is used to skip updates. To allow undefined as a value provide explicit { skipVoid: false } option"`,
      )
    })
    test('store.map throw on initial undefined, if used with {skipVoid: true}',
    () => {
      expect(() => {
        createStore(null, {skipVoid: true}).map(() => {})
      }).toThrowErrorMatchingInlineSnapshot(
        `"undefined is used to skip updates. To allow undefined as a value provide explicit { skipVoid: false } option"`,
      )
    })
    test('store.map skips updates with undefined, but shows warning', () => {
      const inc = createEvent<number>()
      const store = createStore(0).on(inc, (_, v) => v).map((x) => x > 3 ? undefined : x)
      inc(4)
      expect(getWarning()).toMatchInlineSnapshot(
        `"undefined is used to skip updates. To allow undefined as a value provide explicit { skipVoid: false } option"`,
      )
    })
    test(
      'store.map skips updates with undefined, but shows warning, if used with {skipVoid: true}',
      () => {
        const inc = createEvent<number>()
        const store = createStore(0).on(inc, (_, v) => v).map((x) => x > 3 ? undefined : x, {skipVoid: true})
        inc(4)
        expect(getWarning()).toMatchInlineSnapshot(
          `"{skipVoud: true} is deprecated, use updateFilter instead"`,
        )
      }
    )
    test(
      'store.map do not throw on initial undefined, if used with {skipVoid: false}',
      () => {
        expect(() => {
          createStore(null).map(() => {}, {skipVoid: false})
        }).not.toThrow()
      }
    )
    test(
      'store.map do not warn on update undefined, if used with {skipVoid: false}',
      () => {
        const inc = createEvent<number>()
        const store = createStore(0).on(inc, (_, v) => v).map((x) => x > 3 ? undefined : x, {skipVoid: false})
        inc(4)
        expect(getWarning()).toBe(undefined)
        expect(store.getState()).toBe(undefined)
      }
    )
  })

  describe('combine', () => {
    test('combine throw on initial undefined', () => {
      expect(() => {
        combine({a: createStore(null)}, () => {})
      }).toThrowErrorMatchingInlineSnapshot(
        `"undefined is used to skip updates. To allow undefined as a value provide explicit { skipVoid: false } option"`,
      )
    })
    test('combine throw on initial undefined, if used with {skipVoid: true}', () => {
      expect(() => {
        combine({a: createStore(null, {skipVoid: true})}, () => {})
      }).toThrowErrorMatchingInlineSnapshot(
        `"undefined is used to skip updates. To allow undefined as a value provide explicit { skipVoid: false } option"`,
      )
    })
    test('combine skips updates with undefined, but shows warning', () => {
      const inc = createEvent<number>()
      const store = combine({a: createStore(0).on(inc, (_, v) => v) }, (x) => x.a > 3 ? undefined : x)
      inc(4)
      expect(getWarning()).toMatchInlineSnapshot(
        `"undefined is used to skip updates. To allow undefined as a value provide explicit { skipVoid: false } option"`,
      )
    })
    test(
      'combine skips updates with undefined, but shows warning, if used with {skipVoid: true}',
      () => {
        const inc = createEvent<number>()
        const store = combine({a: createStore(0).on(inc, (_, v) => v) }, (x) => x.a > 3 ? undefined : x, {skipVoid: true})
        inc(4)
        expect(getWarning()).toMatchInlineSnapshot(
          `"{skipVoud: true} is deprecated, use updateFilter instead"`,
        )
      }
    )
    test(
      'combine do not throw on initial undefined, if used with {skipVoid: false}',
      () => {
        expect(() => {
          combine({a: createStore(null)}, () => {}, {skipVoid: false})
        }).not.toThrow()
      }
    )
    test(
      'combine do not warn on update undefined, if used with {skipVoid: false}',
      () => {
        const inc = createEvent<number>()
        const store = combine({a: createStore(0).on(inc, (_, v) => v) }, (x) => x.a > 3 ? undefined : x, {skipVoid: false})
        inc(4)
        expect(getWarning()).toBe(undefined)
        expect(store.getState()).toBe(undefined)
      }
    )
  })
})

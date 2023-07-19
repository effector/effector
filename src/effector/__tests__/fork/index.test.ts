import {
  createEvent,
  forward,
  attach,
  fork,
  allSettled,
  launch,
  createDomain,
  createEffect,
  hydrate,
  createStore,
  combine,
} from 'effector'
import {argumentHistory} from 'effector/fixtures'

const consoleError = console.error

beforeAll(() => {
  console.error = (message, ...args) => {
    if (
      String(message).includes('forward') ||
      String(message).includes('guard')
    )
      return
    consoleError(message, ...args)
  }
})

afterAll(() => {
  console.error = consoleError
})

describe('imperative call support', () => {
  it('support imperative event calls in watchers', async () => {
    const inc = createEvent()
    const count = createStore(0).on(inc, x => x + 1)

    const start = createEvent()
    start.watch(() => {
      inc()
    })

    const scope = fork()

    await allSettled(start, {scope})

    expect(scope.getState(count)).toBe(1)
    expect(count.getState()).toBe(0)
  })
  describe('support imperative effect calls in watchers', () => {
    test('with sync effects', async () => {
      const inc = createEffect(() => {})
      const count = createStore(0).on(inc.done, x => x + 1)

      const start = createEvent()
      start.watch(() => {
        inc()
      })

      const scope = fork()

      await allSettled(start, {scope})

      expect(scope.getState(count)).toBe(1)
      expect(count.getState()).toBe(0)
    })
    test('with async effects', async () => {
      const inc = createEffect(async () => {
        await new Promise(rs => setTimeout(rs, 100))
      })
      const count = createStore(0).on(inc.done, x => x + 1)

      const start = createEvent()
      start.watch(() => {
        inc()
      })

      const scope = fork()

      await allSettled(start, {scope})

      expect(scope.getState(count)).toBe(1)
      expect(count.getState()).toBe(0)
    })
  })
  describe('support imperative event calls in effects', () => {
    test('sync effects', async () => {
      const inc = createEvent()
      const count = createStore(0).on(inc, x => x + 1)

      const start = createEffect(() => {
        inc()
      })

      const scope = fork()

      await allSettled(start, {scope})

      expect(scope.getState(count)).toBe(1)
      expect(count.getState()).toBe(0)
    })
    test('start of async effects', async () => {
      const inc = createEvent()
      const count = createStore(0).on(inc, x => x + 1)

      const start = createEffect(async () => {
        inc()
      })

      const scope = fork()

      await allSettled(start, {scope})

      expect(scope.getState(count)).toBe(1)
      expect(count.getState()).toBe(0)
    })
  })
  describe('support imperative effect calls in effects', () => {
    test('simple case', async () => {
      const inc = createEffect<void, void>(() => {})
      const count = createStore(0).on(inc.done, x => x + 1)

      const start = createEffect(async () => {
        await inc()
      })

      const scope = fork()

      await allSettled(start, {scope})

      expect(scope.getState(count)).toBe(1)
      expect(count.getState()).toBe(0)
    })
    describe('sequential', () => {
      test('with sync inner effect', async () => {
        const inc = createEffect(() => {})
        const count = createStore(0).on(inc.done, x => x + 1)

        const start = createEffect(async () => {
          await inc()
          await inc()
        })

        const scope = fork()

        await allSettled(start, {scope})

        expect(scope.getState(count)).toBe(2)
        expect(count.getState()).toBe(0)
      })
      test('with async inner effect', async () => {
        const inc = createEffect(async () => {})
        const count = createStore(0).on(inc.done, x => x + 1)

        const start = createEffect(async () => {
          await inc()
          await inc()
        })

        const scope = fork()

        await allSettled(start, {scope})

        expect(scope.getState(count)).toBe(2)
        expect(count.getState()).toBe(0)
      })
    })
    describe('parallel', () => {
      test('with sync inner effect', async () => {
        const inc = createEffect(() => {})
        const count = createStore(0).on(inc.done, x => x + 1)

        const start = createEffect(async () => {
          await Promise.all([inc(), inc()])
        })

        const scope = fork()

        await allSettled(start, {scope})

        expect(scope.getState(count)).toBe(2)
        expect(count.getState()).toBe(0)
      })
      test('with async inner effect', async () => {
        const inc = createEffect(async () => {})
        const count = createStore(0).on(inc.done, x => x + 1)

        const start = createEffect(async () => {
          await Promise.all([inc(), inc()])
        })

        const scope = fork()

        await allSettled(start, {scope})

        expect(scope.getState(count)).toBe(2)
        expect(count.getState()).toBe(0)
      })
    })
    test('with forward', async () => {
      const inc = createEffect(async () => {})
      const count = createStore(0).on(inc.done, x => x + 1)

      const start = createEffect(async () => {
        await inc()
      })

      const next = createEffect(async () => {
        await inc()
      })

      forward({from: start.doneData, to: next})

      const scope = fork()

      await allSettled(start, {scope})

      expect(scope.getState(count)).toBe(2)
      expect(count.getState()).toBe(0)
    })
    test('attach imperative call', async () => {
      const add = createEffect((_: number) => _)

      const count = createStore(2).on(add.doneData, (x, y) => x + y)

      const addWithCurrent = attach({
        source: count,
        effect: add,
        mapParams: (params: number, current) => params + current,
      })

      const start = createEffect(async (val: number) => {
        await addWithCurrent(val)
      })

      const scope = fork()

      await allSettled(start, {
        scope,
        params: 3,
      })

      expect(scope.getState(count)).toBe(7)
      expect(count.getState()).toBe(2)
    })
    test('scope isolation', async () => {
      const pushWord = createEvent<string>()
      const addWord = createEffect(async (word: string) => word)
      const words = createStore<string[]>([]).on(
        [addWord.doneData, pushWord],
        (list, word) => [...list, word],
      )

      const start = createEffect(async (word: string) => {
        await addWord(`${word} 1`)
        pushWord(`${word} 1.5`)
        await addWord(`${word} 2`)
        return word
      })

      const next = createEffect(async (word: string) => {
        await addWord(`${word} 3`)
        pushWord(`${word} 3.5`)
        await addWord(`${word} 4`)
      })

      forward({from: start.doneData, to: next})

      const scopeA = fork()
      const scopeB = fork()
      const scopeC = fork()

      await Promise.all([
        allSettled(start, {
          scope: scopeA,
          params: 'A',
        }),
        allSettled(start, {
          scope: scopeB,
          params: 'B',
        }),
      ])

      await allSettled(start, {
        scope: scopeC,
        params: 'C',
      })

      expect(scopeA.getState(words)).toMatchInlineSnapshot(`
        Array [
          "A 1",
          "A 1.5",
          "A 2",
          "A 3",
          "A 3.5",
          "A 4",
        ]
      `)
      expect(scopeB.getState(words)).toMatchInlineSnapshot(`
        Array [
          "B 1",
          "B 1.5",
          "B 2",
          "B 3",
          "B 3.5",
          "B 4",
        ]
      `)
      expect(scopeC.getState(words)).toMatchInlineSnapshot(`
        Array [
          "C 1",
          "C 1.5",
          "C 2",
          "C 3",
          "C 3.5",
          "C 4",
        ]
      `)
      expect(words.getState()).toEqual([])
    })
    test('concurrency', async () => {
      let i = 0
      const inc = createEffect(async () => {
        await new Promise(rs => {
          switch (i++) {
            case 0:
              return setTimeout(rs, 100)
            case 1:
              return setTimeout(rs, 10)
            case 2:
              return setTimeout(rs, 50)
            default:
              i = 1
              return setTimeout(rs, 100)
          }
        })
      })
      const count = createStore(0).on(inc.done, x => x + 1)

      const start = createEvent()
      start.watch(() => {
        inc()
      })

      const scopeA = fork()
      const scopeB = fork()
      const scopeC = fork()
      await Promise.all([
        allSettled(start, {scope: scopeA}).then(() =>
          allSettled(start, {scope: scopeC}),
        ),
        allSettled(start, {scope: scopeA}).then(() =>
          allSettled(start, {scope: scopeB}),
        ),
      ])
      await Promise.all([
        allSettled(start, {scope: scopeA}),
        allSettled(start, {scope: scopeB}).then(() =>
          allSettled(start, {scope: scopeC}),
        ),
      ])
      await Promise.all([
        allSettled(start, {scope: scopeB}),
        allSettled(start, {scope: scopeA}),
        allSettled(start, {scope: scopeC}),
      ])

      expect(scopeA.getState(count)).toBe(4)
      expect(scopeB.getState(count)).toBe(3)
      expect(scopeC.getState(count)).toBe(3)
      expect(count.getState()).toBe(0)
    })
    test('concurrency 2', async () => {
      const delay = createEffect(async (n: number) => {
        await new Promise(rs => setTimeout(rs, n))
      })
      const timeout = createEffect((n: number) => {
        return new Promise((rs, rj) => {
          setTimeout(rj, n, Error('timeout'))
        })
      })
      const fx = createEffect(async () => {
        await Promise.race([delay(50), timeout(100)])
      })
      const count = createStore(0).on(fx.finally, x => x + 1)
      const delayCount = createStore(0).on(delay.finally, x => x + 1)
      const timeoutCount = createStore(0).on(timeout.finally, x => x + 1)

      const scopeA = fork()
      await allSettled(fx, {scope: scopeA})

      expect({
        a: {
          count: scopeA.getState(count),
          delayCount: scopeA.getState(delayCount),
          timeoutCount: scopeA.getState(timeoutCount),
        },

        __: {
          count: count.getState(),
          delayCount: delayCount.getState(),
          timeoutCount: timeoutCount.getState(),
        },
      }).toMatchInlineSnapshot(`
        Object {
          "__": Object {
            "count": 0,
            "delayCount": 0,
            "timeoutCount": 0,
          },
          "a": Object {
            "count": 1,
            "delayCount": 1,
            "timeoutCount": 1,
          },
        }
      `)
    })
    test('concurrency 3', async () => {
      const delay = createEffect(async (n: number) => {
        await new Promise(rs => setTimeout(rs, n))
      })
      const timeout = createEffect((n: number) => {
        const errPromise = new Promise((_, rj) => {
          setTimeout(rj, n, Error('timeout'))
        })
        return errPromise
      })
      const fx = createEffect(async () => {
        await Promise.race([delay(50), timeout(100)])
        await Promise.race([delay(50), timeout(100)])
        timeout(10)
      })
      const count = createStore(0).on(fx.finally, x => x + 1)
      const delayCount = createStore(0).on(delay.finally, x => x + 1)
      const timeoutCount = createStore(0).on(timeout.finally, x => x + 1)

      const scopeA = fork()
      const scopeB = fork()
      const scopeC = fork()
      await Promise.all([
        allSettled(fx, {scope: scopeA}),
        allSettled(fx, {scope: scopeB}),
        allSettled(fx, {scope: scopeC}),
      ])
      await Promise.all([
        allSettled(fx, {scope: scopeA}).then(() =>
          allSettled(fx, {scope: scopeC}),
        ),
        allSettled(fx, {scope: scopeA}).then(() =>
          allSettled(fx, {scope: scopeB}),
        ),
      ])
      await Promise.all([
        allSettled(fx, {scope: scopeA}),
        allSettled(fx, {scope: scopeB}).then(() =>
          allSettled(fx, {scope: scopeC}),
        ),
      ])
      await Promise.all([
        allSettled(fx, {scope: scopeB}),
        allSettled(fx, {scope: scopeA}),
        allSettled(fx, {scope: scopeC}),
      ])

      expect({
        a: {
          count: scopeA.getState(count),
          delayCount: scopeA.getState(delayCount),
          timeoutCount: scopeA.getState(timeoutCount),
        },

        b: {
          count: scopeB.getState(count),
          delayCount: scopeB.getState(delayCount),
          timeoutCount: scopeB.getState(timeoutCount),
        },

        c: {
          count: scopeC.getState(count),
          delayCount: scopeC.getState(delayCount),
          timeoutCount: scopeC.getState(timeoutCount),
        },

        __: {
          count: count.getState(),
          delayCount: delayCount.getState(),
          timeoutCount: timeoutCount.getState(),
        },
      }).toMatchInlineSnapshot(`
        Object {
          "__": Object {
            "count": 0,
            "delayCount": 0,
            "timeoutCount": 0,
          },
          "a": Object {
            "count": 5,
            "delayCount": 10,
            "timeoutCount": 15,
          },
          "b": Object {
            "count": 4,
            "delayCount": 8,
            "timeoutCount": 12,
          },
          "c": Object {
            "count": 4,
            "delayCount": 8,
            "timeoutCount": 12,
          },
        }
      `)
    })
  })
})

test('call fx().catch(() => {}) from effect should not be unhandled', async () => {
  const timeout = createEffect((n: number) => {
    const errPromise = new Promise((rs, rj) => {
      setTimeout(rj, n, Error('timeout'))
    })
    return errPromise
  })
  const delay = createEffect(async (n: number) => {
    await new Promise(rs => setTimeout(rs, n))
  })
  const fx = createEffect(async () => {
    await Promise.race([delay(50), timeout(100).catch(() => {})])
  })
  const scope = fork()
  await allSettled(fx, {scope})
})

test('getState support', async () => {
  const fn = jest.fn()
  const start = createEvent()
  const store = createStore(0)
  start.watch(() => {
    fn(store.getState())
  })
  await allSettled(start, {
    scope: fork({values: [[store, 2]]}),
  })
  expect(fn).toHaveBeenLastCalledWith(2)
})

test('setState support', async () => {
  const start = createEvent()
  const store = createStore(0)
  start.watch(() => {
    //@ts-expect-error
    store.setState(1)
  })
  const scope = fork()
  await allSettled(start, {scope})
  expect(scope.getState(store)).toBe(1)
  expect(store.getState()).not.toBe(1)
})

describe('watch on unit inside effect handler', () => {
  test('resolve effect by calling event from outside', async () => {
    const early = createEvent<string>()
    const fx = createEffect(
      (fxPayload: any) =>
        new Promise(resolve => {
          const timeout = setTimeout(resolve, 50, fxPayload)
          const unsub = early.watch(eventPayload => {
            unsub()
            clearTimeout(timeout)
            resolve(eventPayload)
          })
        }),
    )
    const $state = createStore(0).on(fx.doneData, (_, payload: any) => payload)
    const scope = fork()
    await Promise.all([
      allSettled(fx, {scope, params: 'EFFECT_RESOLVED'}),
      allSettled(early, {scope, params: 'EARLY_BY_EVENT'}),
    ])
    expect(scope.getState($state)).toBe('EARLY_BY_EVENT')
  })

  test('do not affect different forks', async () => {
    const early = createEvent<string>()
    const fx = createEffect(
      (fxPayload: any) =>
        new Promise(resolve => {
          const timeout = setTimeout(resolve, 50, fxPayload)
          const unsub = early.watch(eventPayload => {
            unsub()
            clearTimeout(timeout)
            resolve(eventPayload)
          })
        }),
    )
    const $state = createStore(0).on(fx.doneData, (_, payload: any) => payload)
    const scope1 = fork()
    const scope2 = fork()
    const promise1 = allSettled(fx, {
      scope: scope1,
      params: '1_RESOLVED_EFFECT',
    })
    const promise1early = allSettled(early, {
      scope: scope1,
      params: '1_EARLY_BY_EVENT',
    })
    const promise2 = allSettled(fx, {
      scope: scope2,
      params: '2_RESOLVED_EFFECT',
    })
    await Promise.all([promise1, promise1early, promise2])
    expect(scope1.getState($state)).toBe('1_EARLY_BY_EVENT')
    expect(scope2.getState($state)).toBe('2_RESOLVED_EFFECT')
  })
})

test('forked scope update itself on new domain units access', async () => {
  const fn = jest.fn()
  const scope = fork()
  const newEvent = createEvent()
  newEvent.watch(() => {
    fn()
  })
  launch({
    target: newEvent,
    params: undefined,
    scope,
  })
  expect(fn).toBeCalledTimes(1)
})

test('fork should pass through attach', () => {
  const source = createEvent()

  const timer = createStore(0)
  const fx = attach({
    source: timer,
    mapParams: (param, timeout) => [param, timeout],
    effect: createEffect(() => 0),
  })
  forward({from: source, to: fx})
  expect(() => {
    fork()
  }).not.toThrow()
})

describe('getState with same sids', () => {
  test('reading values from stores with same sid is correct', async () => {
    const touchedDirect = createEvent()
    const $directValue = createStore(false, {sid: 'sameSid'}).on(
      touchedDirect,
      v => !v,
    )

    const convenientTouched = createEvent()

    const $convenientValue = createStore(false, {sid: 'sameSid'})
      .on($directValue, (value, directValue) => (directValue ? false : value))
      .on(convenientTouched, v => !v)

    const scope = fork()

    await allSettled(convenientTouched, {scope})

    await allSettled(touchedDirect, {scope})

    expect(scope.getState($convenientValue)).toEqual(false)
  })
})

describe('diamond deps (issue #613)', () => {
  test('with getState (should pass)', async () => {
    const fn = jest.fn()
    const historyChanged = createEvent<{path: string; search: string}>()
    const $history = createStore<{path: string; search: string} | null>(
      null,
    ).on(historyChanged, (_, upd) => upd)
    const $path = $history.map(location => location?.path ?? '')
    const $search = $history.map(location => location?.search ?? '')
    const $href = combine($path, $search, (path, search) => `${path}/${search}`)
    $search.watch(s => fn(s))
    const scope = fork()
    scope.getState($search)
    await allSettled(historyChanged, {
      scope,
      params: {
        path: 'path',
        search: 'search',
      },
    })
    expect(argumentHistory(fn)).toEqual(['', 'search'])
  })
  test('without getState (should pass)', async () => {
    const fn = jest.fn()
    const historyChanged = createEvent<{path: string; search: string}>()
    const $history = createStore<{path: string; search: string} | null>(
      null,
    ).on(historyChanged, (_, upd) => upd)
    const $path = $history.map(location => location?.path ?? '')
    const $search = $history.map(location => location?.search ?? '')
    const $href = combine($path, $search, (path, search) => `${path}/${search}`)
    $search.watch(s => fn(s))
    const scope = fork()
    await allSettled(historyChanged, {
      scope,
      params: {
        path: 'path',
        search: 'search',
      },
    })
    expect(argumentHistory(fn)).toEqual(['', 'search'])
  })
})

describe('no-scope events should not affect scoped stores', () => {
  test('fork, get state, global call', async () => {
    const $store = createStore(0)
    const event = createEvent()
    $store.on(event, v => v + 1)

    const scope = fork()

    expect(scope.getState($store)).toBe(0)
  })
  test('fork, global call, get state', async () => {
    const $store = createStore(0)
    const event = createEvent()
    $store.on(event, v => v + 1)

    const scope = fork()
    event()

    expect(scope.getState($store)).toBe(0)
  })
  test('global call, fork, get state', async () => {
    const $store = createStore(0)
    const event = createEvent()
    $store.on(event, v => v + 1)

    event()
    const scope = fork()

    expect(scope.getState($store)).toBe(0)
  })
})

describe(`fork(domain) and related api's are deprecated`, () => {
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

  test('fork(domain) is deprecated', () => {
    const d = createDomain()

    fork(d)

    expect(getWarning().length > 0).toBe(true)
    expect(getWarning()).toMatchInlineSnapshot()
  })

  test('hydrate(domain) is deprecated', () => {
    const d = createDomain()

    hydrate(d, {values: {}})

    expect(getWarning().length > 0).toBe(true)
    expect(getWarning()).toMatchInlineSnapshot()
  })

  test('hydrate(fork(domain)) is deprecated', () => {
    const d = createDomain()

    hydrate(fork(d), {values: {}})

    expect(getWarning().length > 0).toBe(true)
    expect(getWarning()).toMatchInlineSnapshot()
  })
})

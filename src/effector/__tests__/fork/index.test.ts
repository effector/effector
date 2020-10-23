import {
  createDomain,
  createEvent,
  forward,
  attach,
  fork,
  allSettled,
  launch,
  createEffect,
} from 'effector'

describe('imperative call support', () => {
  it('support imperative event calls in watchers', async () => {
    const app = createDomain()

    const inc = app.createEvent()
    const count = app.createStore(0).on(inc, x => x + 1)

    const start = app.createEvent()
    start.watch(() => {
      inc()
    })

    const scope = fork(app)

    await allSettled(start, {
      scope,
    })

    expect(scope.getState(count)).toBe(1)
    expect(count.getState()).toBe(0)
  })
  describe('support imperative event calls in effects', () => {
    test('sync effects', async () => {
      const app = createDomain()

      const inc = app.createEvent()
      const count = app.createStore(0).on(inc, x => x + 1)

      const start = app.createEffect({
        handler() {
          inc()
        },
      })

      const scope = fork(app)

      await allSettled(start, {
        scope,
      })

      expect(scope.getState(count)).toBe(1)
      expect(count.getState()).toBe(0)
    })
    test('start of async effects', async () => {
      const app = createDomain()

      const inc = app.createEvent()
      const count = app.createStore(0).on(inc, x => x + 1)

      const start = app.createEffect({
        async handler() {
          inc()
        },
      })

      const scope = fork(app)

      await allSettled(start, {
        scope,
      })

      expect(scope.getState(count)).toBe(1)
      expect(count.getState()).toBe(0)
    })
  })
  describe('support imperative effect calls in effects', () => {
    test('simple case', async () => {
      const app = createDomain()

      const inc = app.createEffect<void, void>({handler() {}})
      const count = app.createStore(0).on(inc.done, x => x + 1)

      const start = app.createEffect({
        async handler() {
          await inc()
        },
      })

      const scope = fork(app)

      await allSettled(start, {
        scope,
      })

      expect(scope.getState(count)).toBe(1)
      expect(count.getState()).toBe(0)
    })
    describe('sequential', () => {
      test('with sync inner effect', async () => {
        const app = createDomain()

        const inc = app.createEffect({handler() {}})
        const count = app.createStore(0).on(inc.done, x => x + 1)

        const start = app.createEffect({
          async handler() {
            await inc()
            await inc()
          },
        })

        const scope = fork(app)

        await allSettled(start, {
          scope,
        })

        expect(scope.getState(count)).toBe(2)
        expect(count.getState()).toBe(0)
      })
      test('with async inner effect', async () => {
        const app = createDomain()

        const inc = app.createEffect({async handler() {}})
        const count = app.createStore(0).on(inc.done, x => x + 1)

        const start = app.createEffect({
          async handler() {
            await inc()
            await inc()
          },
        })

        const scope = fork(app)

        await allSettled(start, {
          scope,
        })

        expect(scope.getState(count)).toBe(2)
        expect(count.getState()).toBe(0)
      })
    })
    describe('parallel', () => {
      test('with sync inner effect', async () => {
        const app = createDomain()

        const inc = app.createEffect({handler() {}})
        const count = app.createStore(0).on(inc.done, x => x + 1)

        const start = app.createEffect({
          async handler() {
            await Promise.all([inc(), inc()])
          },
        })

        const scope = fork(app)

        await allSettled(start, {
          scope,
        })

        expect(scope.getState(count)).toBe(2)
        expect(count.getState()).toBe(0)
      })
      test('with async inner effect', async () => {
        const app = createDomain()

        const inc = app.createEffect({async handler() {}})
        const count = app.createStore(0).on(inc.done, x => x + 1)

        const start = app.createEffect({
          async handler() {
            await Promise.all([inc(), inc()])
          },
        })

        const scope = fork(app)

        await allSettled(start, {
          scope,
        })

        expect(scope.getState(count)).toBe(2)
        expect(count.getState()).toBe(0)
      })
    })
    test('with forward', async () => {
      const app = createDomain()

      const inc = app.createEffect({async handler() {}})
      const count = app.createStore(0).on(inc.done, x => x + 1)

      const start = app.createEffect({
        async handler() {
          await inc()
        },
      })

      const next = app.createEffect({
        async handler() {
          await inc()
        },
      })

      forward({from: start.doneData, to: next})

      const scope = fork(app)

      await allSettled(start, {
        scope,
      })

      expect(scope.getState(count)).toBe(2)
      expect(count.getState()).toBe(0)
    })
    test('attach imperative call', async () => {
      const app = createDomain()

      const add = app.createEffect({handler: (_: number) => _})

      const count = app.createStore(2).on(add.doneData, (x, y) => x + y)

      const addWithCurrent = attach({
        source: count,
        effect: add,
        mapParams: (params: number, current) => params + current,
      })

      const start = app.createEffect({
        async handler(val: number) {
          await addWithCurrent(val)
        },
      })

      const scope = fork(app)

      await allSettled(start, {
        scope,
        params: 3,
      })

      expect(scope.getState(count)).toBe(7)
      expect(count.getState()).toBe(2)
    })
    test('scope isolation', async () => {
      const app = createDomain()

      const addWord = app.createEffect({handler: async (word: string) => word})
      const words = app
        .createStore<string[]>([])
        .on(addWord.doneData, (list, word) => [...list, word])

      const start = app.createEffect({
        async handler(word: string) {
          await addWord(`${word} 1`)
          await addWord(`${word} 2`)
          return word
        },
      })

      const next = app.createEffect({
        async handler(word: string) {
          await addWord(`${word} 3`)
          await addWord(`${word} 4`)
        },
      })

      forward({from: start.doneData, to: next})

      const scopeA = fork(app)
      const scopeB = fork(app)
      const scopeC = fork(app)

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
          "A 2",
          "A 3",
          "A 4",
        ]
      `)
      expect(scopeB.getState(words)).toMatchInlineSnapshot(`
        Array [
          "B 1",
          "B 2",
          "B 3",
          "B 4",
        ]
      `)
      expect(scopeC.getState(words)).toMatchInlineSnapshot(`
        Array [
          "C 1",
          "C 2",
          "C 3",
          "C 4",
        ]
      `)
      expect(words.getState()).toEqual([])
    })
  })
})

test('getState support', async () => {
  const fn = jest.fn()
  const app = createDomain()
  const start = app.createEvent()
  const store = app.createStore(0)
  start.watch(() => {
    fn(store.getState())
  })
  await allSettled(start, {
    scope: fork(app, {
      values: new Map([[store, 2]]),
    }),
  })
  expect(fn).toHaveBeenLastCalledWith(2)
})

test('setState support', async () => {
  const app = createDomain()
  const start = app.createEvent()
  const store = app.createStore(0)
  start.watch(() => {
    //@ts-ignore
    store.setState(1)
  })
  const scope = fork(app)
  await allSettled(start, {scope})
  expect(scope.getState(store)).toBe(1)
  expect(store.getState()).not.toBe(1)
})

describe('watch on unit inside effect handler', () => {
  test('resolve effect by calling event from outside', async () => {
    const app = createDomain()
    const early = app.createEvent<string>()
    const fx = app.createEffect(
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
    const $state = app
      .createStore(0)
      .on(fx.doneData, (_, payload: any) => payload)
    const scope = fork(app)
    await Promise.all([
      allSettled(fx, {scope, params: 'EFFECT_RESOLVED'}),
      allSettled(early, {scope, params: 'EARLY_BY_EVENT'}),
    ])
    expect(scope.getState($state)).toBe('EARLY_BY_EVENT')
  })

  test('do not affect different forks', async () => {
    const app = createDomain()
    const early = app.createEvent<string>()
    const fx = app.createEffect(
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
    const $state = app
      .createStore(0)
      .on(fx.doneData, (_, payload: any) => payload)
    const scope1 = fork(app)
    const scope2 = fork(app)
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
  const app = createDomain()
  app.createEvent()
  const scope = fork(app)
  const newEvent = app.createEvent()
  newEvent.watch(() => {
    fn()
  })
  expect(() => {
    //@ts-ignore
    const node = scope.find(newEvent)
    launch({
      target: node,
      //@ts-ignore
      forkPage: scope,
    })
  }).toThrow()
  expect(fn).not.toBeCalled()
})

describe('unit name in not found error', () => {
  it('should show name if present', async () => {
    const app = createDomain()
    const eventA = createEvent()
    const scope = fork(app)
    expect(() => {
      //@ts-ignore
      scope.find(eventA)
    }).toThrowErrorMatchingInlineSnapshot(`"eventA not found in forked scope"`)
  })
  it('should show default message for nameless units', async () => {
    const app = createDomain()
    const eventA = {_: createEvent}._()
    const otherDomain = createDomain()
    const eventB = {_: otherDomain.createEvent}._()
    const scope = fork(app)
    expect(() => {
      //@ts-ignore
      scope.find(eventA)
    }).toThrowErrorMatchingInlineSnapshot(`"unit not found in forked scope"`)
    expect(() => {
      //@ts-ignore
      scope.find(eventB)
    }).toThrowErrorMatchingInlineSnapshot(`"unit not found in forked scope"`)
  })
  it('works with named child units', async () => {
    const app = createDomain()
    const fx = {_: createEffect}._()
    const scope = fork(app)
    expect(() => {
      //@ts-ignore
      scope.find(fx.pending)
    }).toThrowErrorMatchingInlineSnapshot(`"pending not found in forked scope"`)
  })
})

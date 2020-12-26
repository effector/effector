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
  describe('support imperative effect calls in watchers', () => {
    test('with sync effects', async () => {
      const app = createDomain()

      const inc = app.createEffect(() => {})
      const count = app.createStore(0).on(inc.done, x => x + 1)

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
    test('with async effects', async () => {
      const app = createDomain()

      const inc = app.createEffect(async () => {
        await new Promise(rs => setTimeout(rs, 100))
      })
      const count = app.createStore(0).on(inc.done, x => x + 1)

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
      const pushWord = app.createEvent<string>()
      const addWord = app.createEffect({handler: async (word: string) => word})
      const words = app
        .createStore<string[]>([])
        .on([addWord.doneData, pushWord], (list, word) => [...list, word])

      const start = app.createEffect({
        async handler(word: string) {
          await addWord(`${word} 1`)
          pushWord(`${word} 1.5`)
          await addWord(`${word} 2`)
          return word
        },
      })

      const next = app.createEffect({
        async handler(word: string) {
          await addWord(`${word} 3`)
          pushWord(`${word} 3.5`)
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
      const app = createDomain()
      let i = 0
      const inc = app.createEffect(async () => {
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
      const count = app.createStore(0).on(inc.done, x => x + 1)

      const start = app.createEvent()
      start.watch(() => {
        inc()
      })

      const scopeA = fork(app)
      const scopeB = fork(app)
      const scopeC = fork(app)
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
      const app = createDomain()
      // app.onCreateEffect((eff: any) => {
      //   const oldCreate = eff.create
      //   eff.create = (...args: any[]) => {
      //     const req = oldCreate(...args)
      //     req.catch(() => {})
      //     return req
      //   }
      // })
      const delay = app.createEffect(async (n: number) => {
        await new Promise(rs => setTimeout(rs, n))
      })
      const timeout = app.createEffect((n: number) => {
        // const errPromise = new Promise((_, rj) => {
        //   setTimeout(rj, n, Error('timeout'))
        // })
        const errPromise = new Promise((rs, rj) => {
          setTimeout(rs, n, Error('timeout'))
        })
        errPromise.catch(() => {
          console.count('timeout')
        })
        errPromise.then(() => {
          console.count('timeout')
        })
        return errPromise
      })
      const fx = app.createEffect(async () => {
        await Promise.race([delay(50), timeout(100)])
        // await Promise.race([delay(50), timeout(100)])
      })
      const count = app.createStore(0).on(fx.finally, x => x + 1)
      const delayCount = app.createStore(0).on(delay.finally, x => x + 1)
      const timeoutCount = app.createStore(0).on(timeout.finally, x => x + 1)

      const scopeA = fork(app)
      const scopeB = fork(app)
      const scopeC = fork(app)
      await Promise.all([
        allSettled(fx, {scope: scopeA}),
        // allSettled(fx, {scope: scopeB}),
        // allSettled(fx, {scope: scopeC}),
      ])
      // await Promise.all([
      //   allSettled(fx, {scope: scopeA}).then(() =>
      //     allSettled(fx, {scope: scopeC}),
      //   ),
      //   allSettled(fx, {scope: scopeA}).then(() =>
      //     allSettled(fx, {scope: scopeB}),
      //   ),
      // ])
      // await Promise.all([
      //   allSettled(fx, {scope: scopeA}),
      //   allSettled(fx, {scope: scopeB}).then(() =>
      //     allSettled(fx, {scope: scopeC}),
      //   ),
      // ])
      // await Promise.all([
      //   allSettled(fx, {scope: scopeB}),
      //   allSettled(fx, {scope: scopeA}),
      //   allSettled(fx, {scope: scopeC}),
      // ])

      expect({
        a: {
          count: scopeA.getState(count),
          delayCount: scopeA.getState(delayCount),
          timeoutCount: scopeA.getState(timeoutCount),
        },
        // b: {
        //   count: scopeB.getState(count),
        //   delayCount: scopeB.getState(delayCount),
        //   timeoutCount: scopeC.getState(timeoutCount),
        // },
        // c: {
        //   count: scopeC.getState(count),
        //   delayCount: scopeC.getState(delayCount),
        //   timeoutCount: scopeC.getState(timeoutCount),
        // },
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
      const app = createDomain()
      // app.onCreateEffect((eff: any) => {
      //   const oldCreate = eff.create
      //   eff.create = (...args: any[]) => {
      //     const req = oldCreate(...args)
      //     return req.catch(() => {})
      //     // return req
      //   }
      // })
      const delay = app.createEffect(async (n: number) => {
        await new Promise(rs => setTimeout(rs, n))
      })
      const timeout = app.createEffect((n: number) => {
        const errPromise = new Promise((_, rj) => {
          setTimeout(rj, n, Error('timeout'))
        })
        // const errPromise = new Promise((rs, rj) => {
        //   setTimeout(rs, n, Error('timeout'))
        // })
        // return errPromise
        //   .then(() => {
        //     console.count('timeout')
        //   })
        //   .catch(() => {
        //     console.count('timeout')
        //   })
        return errPromise
      })
      // timeout.graphite.meta.noUnhandled = true
      const fx = app.createEffect(async () => {
        await Promise.race([delay(50), timeout(100)])
        await Promise.race([delay(50), timeout(100)])
        // timeout(100)
      })
      const count = app.createStore(0).on(fx.finally, x => x + 1)
      const delayCount = app.createStore(0).on(delay.finally, x => x + 1)
      const timeoutCount = app.createStore(0).on(timeout.finally, x => x + 1)

      const scopeA = fork(app)
      const scopeB = fork(app)
      const scopeC = fork(app)
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
            "timeoutCount": 10,
          },
          "b": Object {
            "count": 4,
            "delayCount": 8,
            "timeoutCount": 8,
          },
          "c": Object {
            "count": 4,
            "delayCount": 8,
            "timeoutCount": 8,
          },
        }
      `)
    })
  })
})

test('call fx().catch(() => {}) from effect should not be unhandled', async () => {
  const app = createDomain()
  const timeout = app.createEffect((n: number) => {
    const errPromise = new Promise((rs, rj) => {
      setTimeout(rj, n, Error('timeout'))
    })
    return errPromise
  })
  const delay = app.createEffect(async (n: number) => {
    await new Promise(rs => setTimeout(rs, n))
  })
  const fx = app.createEffect(async () => {
    await Promise.race([delay(50), timeout(100).catch(() => {})])
  })
  const scope = fork(app)
  await allSettled(fx, {scope})
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

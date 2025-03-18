import {
  createEvent,
  createStore,
  createEffect,
  scopeBind,
  combine,
  fork,
  allSettled,
} from 'effector'

it('bind result to current promise when called from watch', async () => {
  const trigger = createEvent()
  const inc = createEvent()
  const $count = createStore(0).on(inc, x => x + 1)

  let fn: () => void

  trigger.watch(() => {
    fn = scopeBind(inc)
  })

  const scope = fork()
  await allSettled(trigger, {scope})
  fn!()
  expect(scope.getState($count)).toBe(1)
  expect($count.getState()).toBe(0)
})

it('will throw an error when used without watch nor explicit {scope}', () => {
  const trigger = createEvent()

  expect(() => {
    scopeBind(trigger)
  }).toThrowErrorMatchingInlineSnapshot(`"scopeBind: scope not found"`)
})

it('support explicit {scope}', async () => {
  const inc = createEvent()
  const $count = createStore(0).on(inc, x => x + 1)

  const scope = fork()

  const scopeInc = scopeBind(inc, {scope})

  scopeInc()

  expect(scope.getState($count)).toBe(1)
  expect($count.getState()).toBe(0)
})

it('returns promise when used with effect', async () => {
  const fx = createEffect(() => 'ok')

  const scope = fork()
  const scopeFx = scopeBind(fx, {scope})

  const req = scopeFx()
  expect(req instanceof Promise).toBe(true)
})

it('does not throw on calls without scope, if called in safe mode', () => {
  const trigger = createEvent()

  expect(() => {
    scopeBind(trigger, {safe: true})
  }).not.toThrow()
})

it('allows calls without scope, if called in safe mode', async () => {
  const trigger = createEvent()
  const inc = createEvent()
  const $count = createStore(0).on(inc, x => x + 1)

  let fn: () => void

  trigger.watch(() => {
    fn = scopeBind(inc, {safe: true})
  })

  trigger()
  await Promise.resolve()
  fn!()
  expect($count.getState()).toBe(1)
})

it('catches scope, if called with scope in safe mode', async () => {
  const trigger = createEvent()
  const inc = createEvent()
  const $count = createStore(0).on(inc, x => x + 1)

  let fn: () => void

  trigger.watch(() => {
    fn = scopeBind(inc, {safe: true})
  })

  const scope = fork()
  await allSettled(trigger, {scope})
  fn!()
  expect(scope.getState($count)).toBe(1)
  expect($count.getState()).toBe(0)
})

it('saves scope after binded effect', async () => {
  const myFx = createEffect(async (x: any) => x)
  const $final = createStore(null).on(myFx.doneData, (_, x) => x)

  const scope = fork()
  const scopeFx = scopeBind(myFx, {scope})

  await scopeFx(1)

  expect(scope.getState($final)).toBe(1)
  expect($final.getState()).toBe(null)
})

it('saves scope inside of binded effect', async () => {
  const inc = createEvent()
  const $count = createStore(0).on(inc, x => x + 1)
  const fx = createEffect(async () => {
    inc()
  })
  const scope = fork()
  const scopeFx = scopeBind(fx, {scope})

  await scopeFx()

  expect(scope.getState($count)).toBe(1)
  expect($count.getState()).toBe(0)
})

it('saves scope inside of arbiraty sync callback', () => {
  const inc = createEvent()
  const $count = createStore(0).on(inc, x => x + 1)

  const scope = fork()

  const scopeInc = scopeBind(
    () => {
      inc()
    },
    {scope},
  )

  scopeInc()

  expect(scope.getState($count)).toBe(1)
  expect($count.getState()).toBe(0)
})

it('saves scope inside of imperative flow effect', async () => {
  const incFx = createEffect(() => {})
  const sleepFx = createEffect(() => new Promise(r => setTimeout(r, 1)))
  const $count = createStore(0).on(incFx.finally, x => x + 1)

  const scope = fork()

  const scopeInc = scopeBind(
    createEffect(async () => {
      await sleepFx()
      await incFx()
      await sleepFx()
      await incFx()
    }),
    {scope},
  )

  await scopeInc()

  expect(scope.getState($count)).toBe(2)
  expect($count.getState()).toBe(0)
})

it('saves scope inside of arbitary async callback', async () => {
  const incFx = createEffect(() => {})
  const sleepFx = createEffect(() => new Promise(r => setTimeout(r, 1)))
  const $count = createStore(0).on(incFx.finally, x => x + 1)

  const scope = fork()

  const scopeInc = scopeBind(
    async () => {
      await sleepFx()
      await incFx()
      await sleepFx()
      await incFx()
    },
    {scope},
  )

  await scopeInc()

  expect(scope.getState($count)).toBe(2)
  expect($count.getState()).toBe(0)
})

test('scopeBind with arbitary sync callback re-throws exception', () => {
  const inc = createEvent()
  const $count = createStore(0).on(inc, x => x + 1)

  const scope = fork()

  const scopeInc = scopeBind(
    () => {
      inc()
      throw new Error('error')
    },
    {scope},
  )

  expect(() => scopeInc()).toThrowErrorMatchingInlineSnapshot(`"error"`)

  expect(scope.getState($count)).toBe(1)
  expect($count.getState()).toBe(0)
})

test('scopeBind with arbitary async callback exposes rejection', () => {
  const incFx = createEffect(() => {})
  const $count = createStore(0).on(incFx.finally, x => x + 1)

  const scope = fork()

  const scopeInc = scopeBind(
    async () => {
      await incFx()
      throw new Error('error')
    },
    {scope},
  )

  expect(() => scopeInc()).rejects.toThrowErrorMatchingInlineSnapshot(`"error"`)

  expect(scope.getState($count)).toBe(1)
  expect($count.getState()).toBe(0)
})

test('scopeBind with arbitary sync callback exposes return value', () => {
  const inc = createEvent()
  const $count = createStore(0).on(inc, x => x + 1)

  const scope = fork()

  const scopeInc = scopeBind(
    () => {
      inc()
      return 42
    },
    {scope},
  )

  expect(scopeInc()).toBe(42)

  expect(scope.getState($count)).toBe(1)
  expect($count.getState()).toBe(0)
})

test('scopeBind with arbitary async callback exposes return value', async () => {
  const inc = createEvent()
  const $count = createStore(0).on(inc, x => x + 1)

  const scope = fork()

  const scopeInc = scopeBind(
    async () => {
      inc()
      return Promise.resolve(42)
    },
    {scope},
  )

  expect(await scopeInc()).toBe(42)

  expect(scope.getState($count)).toBe(1)
  expect($count.getState()).toBe(0)
})

test('scopeBind allows $store.getState as a callback', () => {
  const $count = createStore(0)

  const scope = fork({
    values: [[$count, 42]],
  })

  const getCount = scopeBind($count.getState, {scope})

  expect(getCount()).toBe(42)
})

describe('scopeBind should not throw in safe context', () => {
  test('in map without scope', () => {
    const event = createEvent()

    expect(() =>
      createStore(0).map(() => {
        scopeBind(event)

        return 0
      }),
    ).not.toThrow()
  })

  test('in effect without scope', async () => {
    const event = createEvent()

    const fx = createEffect(() => {
      scopeBind(event)
    })

    expect(fx()).resolves.not.toThrow()
  })

  test('in effect "map" or "watch" without scope', async () => {
    const event = createEvent()
    const fx3 = createEffect(async () => {})

    expect(() => fx3.watch(() => scopeBind(event))).not.toThrow()
    expect(() => fx3.map(() => scopeBind(event))).not.toThrow()
  })

  test('after nested event call without scope', async () => {
    const evt = createEvent()
    const trigger = evt.prepend(() => {})

    const fx = createEffect(() => {
      trigger()
      scopeBind(trigger)
    })

    expect(fx()).resolves.not.toThrow()
  })

  test('in combine', async () => {
    const event = createEvent()
    const $store = createStore(0)

    const $combinedStore = combine($store, () => scopeBind(event))

    expect(() => $combinedStore.getState()).not.toThrow()
  })

  test('in combine with scope', async () => {
    const event = createEvent()
    const scope = fork()

    const $store = createStore(0)
    const $combinedStore = combine($store, () => {
      return scopeBind(event)
    })

    expect(() => scope.getState($combinedStore)).not.toThrow()
  })

  test('scopebind throw after call effect in effeoct', async () => {
    const event = createEvent()

    const fx1 = createEffect(
      async () => new Promise(resolve => setTimeout(resolve, 50)),
    )

    const fx2 = createEffect(async () => {
      await fx1()
      scopeBind(event)
    })

    expect(fx2).rejects.toThrow()
  })
})

test('scopeBind with arbitary sync callback allow multiple arguments', () => {
  const add = createEvent<number>()
  const $count = createStore(0).on(add, (x, y) => x + y)

  const scope = fork()

  const scopeInc = scopeBind(
    (a: number, b: number) => {
      add(a)
      add(b)
    },
    {scope},
  )

  scopeInc(10, 100)

  expect(scope.getState($count)).toBe(110)
  expect($count.getState()).toBe(0)
})

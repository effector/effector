import {
  createEvent,
  createStore,
  createEffect,
  scopeBind,
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

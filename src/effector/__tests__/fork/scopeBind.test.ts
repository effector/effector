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
  }).toThrowErrorMatchingInlineSnapshot(
    `"scopeBind cannot be called outside of forked .watch"`,
  )
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

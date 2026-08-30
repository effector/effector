import {
  combine,
  fork,
  allSettled,
  serialize,
  Scope,
  createEvent,
  createStore,
  createEffect,
  sample,
} from 'effector'

test('@effector/next custom hydration works', async () => {
  /**
   * @effector/next library now uses custom implementation of `hydrate` under the hood,
   * which relies on some internals of `Scope` object
   *
   * This implementation is planned to be, one way or another, merged into the core version,
   * but we're not quite there yet, and a bit more research should be done.
   *
   * We're also are not planning on dropping Next.js support, so stability of these internals becomes a concern.
   *
   * So, for now, we're only testing that the custom implementation works as expected.
   *
   * @see https://github.com/effector/next/blob/main/src/get-scope.ts
   */
  function customHydrate(scope: Scope, values: Record<string, unknown>) {
    // @ts-expect-error this is a really hacky way to "hydrate" scope
    Object.assign(scope.values.sidMap, values)
    // @ts-expect-error
    for (const id in scope.reg) {
      // @ts-expect-error
      if (Object.hasOwnProperty.call(scope.reg, id)) {
        // @ts-expect-error
        const ref = scope.reg[id]
        if (!ref.meta || (!ref.meta?.named && ref.meta?.derived)) {
          /**
           * Force recalculation of derived values
           */
          // @ts-expect-error
          delete scope.reg[id]
        } else {
          /**
           * Update non-derived values
           */
          const sid = ref?.meta?.sid
          if (sid && sid in values) {
            const serialize = ref?.meta?.serialize as any
            const read =
              serialize && serialize !== 'ignore' ? serialize?.read : null
            ref.current = read ? read(values[sid] as any) : values[sid]
          }
        }
      }
    }
  }

  const up = createEvent()
  const longUpFx = createEffect(async () => {
    await new Promise(r => setTimeout(r, 10))
  })
  const $count = createStore(0).on([up, longUpFx.done], s => s + 1)
  const $derived = $count.map(s => ({ref: s}))
  const $combined = combine({ref: $count})
  const $nestedCombined = combine({ref: $derived})

  const $sampled = sample({
    source: {ref: $combined},
    fn: ref => ref.ref.ref,
  })

  const getFixedDate = () => new Date(0)
  const updateDate = createEvent<Date>()
  const $specialData = createStore(getFixedDate(), {
    serialize: {
      write: _date => ({lol: 'jsonified view'}),
      read: _json => getFixedDate(),
    },
  }).on($count, () => getFixedDate())

  const serverScope = fork()

  await allSettled(up, {scope: serverScope})
  await allSettled(up, {scope: serverScope})
  await allSettled(up, {scope: serverScope})

  const serverValues = serialize(serverScope)

  const clientScope = fork()

  expect(clientScope.getState($count)).toEqual(0)
  expect(clientScope.getState($derived)).toEqual({ref: 0})
  expect(clientScope.getState($combined)).toEqual({ref: 0})
  expect(clientScope.getState($nestedCombined)).toEqual({
    ref: {ref: 0},
  })
  expect(clientScope.getState($sampled)).toEqual(0)
  expect(clientScope.getState(longUpFx.pending)).toEqual(false)
  expect(clientScope.getState(longUpFx.inFlight)).toEqual(0)
  expect(clientScope.getState($specialData)).toEqual(getFixedDate())

  const promise = allSettled(longUpFx, {scope: clientScope})

  expect(clientScope.getState(longUpFx.inFlight)).toEqual(1)

  customHydrate(clientScope, serverValues)

  expect(clientScope.getState($count)).toEqual(3)
  expect(clientScope.getState($derived)).toEqual({ref: 3})
  expect(clientScope.getState($combined)).toEqual({ref: 3})
  expect(clientScope.getState($nestedCombined)).toEqual({
    ref: {ref: 3},
  })
  expect(clientScope.getState($sampled)).toEqual(3)
  expect(clientScope.getState(longUpFx.pending)).toEqual(true)
  expect(clientScope.getState(longUpFx.inFlight)).toEqual(1)
  expect(clientScope.getState($specialData)).toEqual(getFixedDate())

  await promise

  expect(clientScope.getState($count)).toEqual(4)
  expect(clientScope.getState($derived)).toEqual({ref: 4})
  expect(clientScope.getState($combined)).toEqual({ref: 4})
  expect(clientScope.getState($nestedCombined)).toEqual({
    ref: {ref: 4},
  })
  expect(clientScope.getState($sampled)).toEqual(4)
  expect(clientScope.getState(longUpFx.pending)).toEqual(false)
  expect(clientScope.getState(longUpFx.inFlight)).toEqual(0)
  expect(clientScope.getState($specialData)).toEqual(getFixedDate())
})

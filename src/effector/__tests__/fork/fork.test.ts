import {
  createDomain,
  forward,
  attach,
  fork,
  allSettled,
  serialize,
  hydrate,
} from 'effector'

describe('fork values support', () => {
  test('values as js Map', async () => {
    const app = createDomain()

    const logsCache = app.createStore<string[]>([])
    const settings = app.createStore({
      MAX_COUNT_CACHED_LOGS: 12,
    })

    const scope = fork(app, {
      values: new Map()
        .set(settings, {MAX_COUNT_CACHED_LOGS: 2})
        .set(logsCache, ['LOG_MSG_MOCK']),
    })

    hydrate(app, {
      values: serialize(scope),
    })

    expect(settings.getState()).toEqual({MAX_COUNT_CACHED_LOGS: 2})
    expect(logsCache.getState()).toEqual(['LOG_MSG_MOCK'])
  })
  test('values as sid map', async () => {
    const app = createDomain()

    const logsCache = app.createStore([])
    const settings = app.createStore({
      MAX_COUNT_CACHED_LOGS: 12,
    })

    const scope = fork(app, {
      values: {
        [logsCache.sid!]: ['LOG_MSG_MOCK'],
        [settings.sid!]: {MAX_COUNT_CACHED_LOGS: 2},
      },
    })

    hydrate(app, {
      values: serialize(scope),
    })

    expect(settings.getState()).toEqual({MAX_COUNT_CACHED_LOGS: 2})
    expect(logsCache.getState()).toEqual(['LOG_MSG_MOCK'])
  })
  test('values validation', async () => {
    const app = createDomain()

    expect(() => {
      fork(app, {
        values: new Map().set(null, () => {}),
      })
    }).toThrowErrorMatchingInlineSnapshot(`"Map key should be a unit"`)
  })
})

describe('fork handlers support', () => {
  test('handlers as js Map', async () => {
    const app = createDomain()

    const fx = app.createEffect({handler: () => 'not to call'})

    const acc = app
      .createStore<string[]>([])
      .on(fx.doneData, (list, val) => [...list, val])

    const scope = fork(app, {
      handlers: new Map([[fx, () => 'fn']]),
    })

    await allSettled(fx, {
      scope,
    })

    expect(scope.getState(acc)).toEqual(['fn'])
  })
  test('handlers as sid map', async () => {
    const app = createDomain()

    const fx = app.createEffect({handler: () => 'not to call'})

    const acc = app
      .createStore<string[]>([])
      .on(fx.doneData, (list, val) => [...list, val])

    const scope = fork(app, {
      handlers: {
        [fx.sid!]: () => 'fn',
      },
    })

    await allSettled(fx, {
      scope,
    })

    expect(scope.getState(acc)).toEqual(['fn'])
  })
  test('handlers validation', async () => {
    const app = createDomain()

    expect(() => {
      fork(app, {
        handlers: new Map().set(null, () => {}),
      })
    }).toThrowErrorMatchingInlineSnapshot(`"Map key should be a unit"`)
  })
})

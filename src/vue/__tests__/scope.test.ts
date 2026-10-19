/* eslint-disable react-hooks/rules-of-hooks */
import {shallowMount} from 'vue-test-utils-next'
import {
  EffectorScopeKey,
  EffectorScopePlugin,
  createGate,
  useGate,
  useProvidedScope,
  useStore,
  useStoreMap,
  useUnit,
  useVModel,
} from 'effector-vue/composition'
import {
  Scope,
  allSettled,
  createEffect,
  createEvent,
  createStore,
  fork,
} from 'effector'
import {
  App,
  Plugin,
  createApp,
  effectScope,
  getCurrentInstance,
  h,
  provide,
} from 'vue-next'

jest.mock('vue', () => require('vue-next'))

/** The install of effector-vue 23.1.1, kept working for existing apps. */
function legacyPlugin(scope: Scope, scopeName = 'root'): Plugin {
  return {
    install(app) {
      app.config.globalProperties.scopeName = scopeName
      app.provide(scopeName, scope)
    },
  }
}

/** Runs a composable inside the setup of a mounted component. */
function withSetup<T>(composable: () => T, plugins: Plugin[] = []): T {
  let result: T
  const app = createApp({
    setup() {
      result = composable()
      return () => null
    },
  })
  for (const plugin of plugins) app.use(plugin)
  app.mount(document.createElement('div'))
  return result!
}

/**
 * Runs a composable with an injection context but without a component
 * instance: the same conditions `app.runWithContext` and Vapor components
 * give.
 */
function withApp<T>(composable: () => T, install?: (app: App) => void): T {
  const app = createApp({render: () => null})
  if (install) install(app)
  return app.runWithContext(composable)
}

describe('scope resolution', () => {
  test('explicit scope wins over the provided one', () => {
    const $value = createStore('global')
    const provided = fork({values: [[$value, 'provided']]})
    const explicit = fork({values: [[$value, 'explicit']]})

    const value = withSetup(
      () => useUnit($value, {scope: explicit}),
      [EffectorScopePlugin({scope: provided})],
    )

    expect(value.value).toBe('explicit')
  })

  test('reads the scope provided under EffectorScopeKey', () => {
    const $value = createStore('global')
    const scope = fork({values: [[$value, 'injected']]})

    const value = withSetup(() => useUnit($value), [
      {
        install(app) {
          app.provide(EffectorScopeKey, scope)
        },
      },
    ])

    expect(value.value).toBe('injected')
  })

  test('reads the scope provided under the legacy string key', () => {
    const $value = createStore('global')
    const scope = fork({values: [[$value, 'legacy']]})

    const value = withSetup(
      () => useUnit($value),
      [legacyPlugin(scope, 'custom')],
    )

    expect(value.value).toBe('legacy')
  })

  test('EffectorScopeKey wins over the legacy string key', () => {
    const $value = createStore('global')
    const keyed = fork({values: [[$value, 'keyed']]})
    const legacy = fork({values: [[$value, 'legacy']]})

    const value = withSetup(() => useUnit($value), [
      legacyPlugin(legacy, 'custom'),
      {
        install(app) {
          app.provide(EffectorScopeKey, keyed)
        },
      },
    ])

    expect(value.value).toBe('keyed')
  })

  test('a subtree overrides the scope under EffectorScopeKey only', () => {
    const $value = createStore('global')
    const appScope = fork({values: [[$value, 'app']]})
    const subtreeScope = fork({values: [[$value, 'subtree']]})
    const seen: string[] = []

    const Reader = {
      setup() {
        seen.push(useUnit($value).value)
      },
      render: () => null,
    }
    const ByKey = {
      setup() {
        provide(EffectorScopeKey, subtreeScope)
      },
      render: () => h(Reader),
    }
    /** Read only when nothing is provided under EffectorScopeKey. */
    const ByString = {
      setup() {
        provide('root', subtreeScope)
      },
      render: () => h(Reader),
    }

    const app = createApp({render: () => [h(ByKey), h(ByString)]})
    app.use(EffectorScopePlugin({scope: appScope}))
    app.mount(document.createElement('div'))

    expect(seen).toEqual(['subtree', 'app'])
  })

  test('falls back to the global mode without a provided scope', () => {
    const $value = createStore('global')

    const value = withSetup(() => useUnit($value))

    expect(value.value).toBe('global')
  })

  test('resolves the scope without a component instance', () => {
    const scope = fork()

    const [instance, provided] = withApp(
      () => [getCurrentInstance(), useProvidedScope()] as const,
      app => app.use(EffectorScopePlugin({scope})),
    )

    expect(instance).toBe(null)
    expect(provided).toBe(scope)
  })

  test('rejects a Vue effect scope passed as scope', () => {
    const $value = createStore('global')
    const vueScope = effectScope()

    expect(() =>
      withApp(() => useUnit($value, {scope: vueScope as any})),
    ).toThrow(/\[effector-vue\] useUnit: expected "scope"/)
  })
})

describe('forceScope', () => {
  test('throws when passed per call without a scope', () => {
    const $value = createStore('global')

    expect(() => withApp(() => useUnit($value, {forceScope: true}))).toThrow(
      /\[effector-vue\] useUnit: no scope found/,
    )
  })

  test('throws when enabled by the plugin and a subtree shadows the scope', () => {
    const $value = createStore('global')
    const scope = fork()
    let caught: unknown = null

    const Child = {
      setup() {
        useUnit($value)
      },
      render: () => null,
    }
    const Parent = {
      setup() {
        // a scope taken from a prop that is not there
        provide(EffectorScopeKey, undefined as any)
      },
      render: () => h(Child),
    }

    const app = createApp(Parent)
    app.use(EffectorScopePlugin({scope, forceScope: true}))
    app.config.errorHandler = err => {
      caught = err
    }
    app.mount(document.createElement('div'))

    expect(String(caught)).toMatch(/\[effector-vue\] useUnit: no scope found/)
  })

  test('is satisfied by the plugin scope', () => {
    const $value = createStore('global')
    const scope = fork({values: [[$value, 'scoped']]})

    const value = withSetup(
      () => useUnit($value, {forceScope: true}),
      [EffectorScopePlugin({scope, forceScope: true})],
    )

    expect(value.value).toBe('scoped')
  })
})

describe('useProvidedScope', () => {
  test('returns the provided scope', () => {
    const scope = fork()

    const provided = withApp(
      () => useProvidedScope(),
      app => app.use(EffectorScopePlugin({scope})),
    )

    expect(provided).toBe(scope)
  })

  test('returns null without an injection context', () => {
    expect(useProvidedScope()).toBe(null)
  })

  test('throws with forceScope outside of an injection context', () => {
    expect(() => useProvidedScope({forceScope: true})).toThrow(
      /\[effector-vue\] useProvidedScope: no scope found/,
    )
  })
})

describe('events without a scope', () => {
  test('useUnit returns the unit itself', () => {
    const inc = createEvent()
    const fetchFx = createEffect(() => {})

    const [boundInc, boundFetch] = withSetup(() => useUnit([inc, fetchFx]))

    expect(boundInc).toBe(inc)
    expect(boundFetch).toBe(fetchFx)
  })

  test('a handler called inside an effect stays in the running scope', async () => {
    const inc = createEvent()
    const $count = createStore(0).on(inc, count => count + 1)

    let handler = () => {}
    const runFx = createEffect(() => {
      handler()
    })

    const scope = fork()
    handler = withSetup(() => useUnit(inc))

    await allSettled(runFx, {scope})

    expect(scope.getState($count)).toBe(1)
    expect($count.getState()).toBe(0)
  })

  test('a handler does not capture the scope active during setup', async () => {
    const inc = createEvent()
    const $count = createStore(0).on(inc, count => count + 1)

    let handler = () => {}
    const setupFx = createEffect(() => {
      handler = withSetup(() => useUnit(inc))
    })

    const scope = fork()
    await allSettled(setupFx, {scope})

    handler()

    expect(scope.getState($count)).toBe(0)
    expect($count.getState()).toBe(1)
  })
})

describe('composables read the provided scope', () => {
  test('useStore', () => {
    const $value = createStore('global')
    const scope = fork({values: [[$value, 'scoped']]})

    const value = withSetup(
      () => useStore($value),
      [EffectorScopePlugin({scope})],
    )

    expect(value.value).toBe('scoped')
  })

  test('useUnit binds events to the scope', () => {
    const setValue = createEvent<string>()
    const $value = createStore('global').on(setValue, (_, value) => value)
    const scope = fork()

    const {value, set} = withSetup(
      () => useUnit({value: $value, set: setValue}),
      [EffectorScopePlugin({scope})],
    )

    set('scoped')

    expect(scope.getState($value)).toBe('scoped')
    expect($value.getState()).toBe('global')
    expect(value.value).toBe('scoped')
  })

  test('useStoreMap with scope in the config', () => {
    const $user = createStore({name: 'global'})
    const scope = fork({values: [[$user, {name: 'scoped'}]]})

    const name = withSetup(() =>
      useStoreMap({store: $user, fn: user => user.name, scope}),
    )

    expect(name.value).toBe('scoped')
  })

  test('useStoreMap with the positional scope', () => {
    const warn = jest.spyOn(console, 'error').mockImplementation(() => {})
    const $user = createStore({name: 'global'})
    const scope = fork({values: [[$user, {name: 'scoped'}]]})

    const name = withSetup(() =>
      useStoreMap({store: $user, fn: user => user.name}, scope),
    )

    expect(name.value).toBe('scoped')
    expect(warn).not.toHaveBeenCalled()
    warn.mockRestore()
  })

  test('useVModel', () => {
    const $user = createStore({name: 'global'})
    const scope = fork({values: [[$user, {name: 'scoped'}]]})

    const user = withSetup(
      () => useVModel($user),
      [EffectorScopePlugin({scope})],
    )

    expect(user.value.name).toBe('scoped')
  })

  test('useGate', () => {
    const Gate = createGate<string>({defaultState: 'closed'})
    const scope = fork()

    shallowMount(
      {
        template: `<p />`,
        setup() {
          useGate(Gate, () => 'opened')
        },
      },
      {global: {plugins: [EffectorScopePlugin({scope})]}},
    )

    expect(scope.getState(Gate.status)).toBe(true)
    expect(scope.getState(Gate.state)).toBe('opened')
    expect(Gate.status.getState()).toBe(false)
    expect(Gate.state.getState()).toBe('closed')
  })
})

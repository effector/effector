/* eslint-disable no-unused-vars */
import {
  createEffect,
  createEvent,
  createStore,
  fork,
  Scope,
  Store,
} from 'effector'
import {computed, createApp, effectScope, InjectionKey, ref} from 'vue'
import {
  createGate,
  EffectorScopeKey,
  EffectorScopePlugin,
  useGate,
  useProvidedScope,
  useStore,
  useStoreMap,
  useUnit,
  useVModel,
} from 'effector-vue/composition'

const typecheck = '{global}'

describe('useUnit', () => {
  test('store', () => {
    const $count = createStore(0)

    const setup = () => {
      const count = useUnit($count)
      const value: number = count.value
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('event', () => {
    const setName = createEvent<string>()
    const reset = createEvent()

    const setup = () => {
      const onName: (payload: string) => string = useUnit(setName)
      const onReset: () => void = useUnit(reset)
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('effect', () => {
    const fetchFx = createEffect<string, number>(() => 0)
    const initFx = createEffect(() => 'done')

    const setup = () => {
      const fetch: (params: string) => Promise<number> = useUnit(fetchFx)
      const init: () => Promise<string> = useUnit(initFx)
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('list', () => {
    const $count = createStore(0)
    const inc = createEvent()
    const fetchFx = createEffect<string, number>(() => 0)

    const setup = () => {
      const [count, onInc, fetch] = useUnit([$count, inc, fetchFx])
      const value: number = count.value
      const done: Promise<number> = fetch('a')
      onInc()
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('shape', () => {
    const $count = createStore(0)
    const inc = createEvent()

    const setup = () => {
      const {count, onInc} = useUnit({count: $count, onInc: inc})
      const value: number = count.value
      onInc()
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('@@unitShape', () => {
    const $count = createStore(0)
    const model = {
      '@@unitShape': () => ({count: $count}),
    }

    const setup = () => {
      const {count} = useUnit(model)
      const value: number = count.value
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('scope options', () => {
    const $count = createStore(0)
    const scope = fork()

    const setup = () => {
      useUnit($count, {forceScope: true})
      useUnit($count, {scope})
      useUnit([$count], {scope, forceScope: true})
      useUnit({count: $count}, {scope})
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('scope option rejects anything but a Scope', () => {
    const $count = createStore(0)

    const setup = () => {
      useUnit($count, {scope: effectScope()})
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      No overload matches this call.
        The last overload gave the following error.
          Argument of type 'StoreWritable<number>' is not assignable to parameter of type 'Record<string, Store<any> | Effect<any, any, any> | Event<any>> | { '@@unitShape': () => Record<string, Store<any> | Effect<any, any, any> | Event<...>>; }'.
            Type 'StoreWritable<number>' is not assignable to type 'Record<string, Store<any> | Effect<any, any, any> | Event<any>>'.
              Index signature for type 'string' is missing in type 'StoreWritable<number>'.
      "
    `)
  })
})

describe('scope', () => {
  test('EffectorScopePlugin', () => {
    const scope = fork()

    const start = () => {
      const app = createApp({})

      app.use(EffectorScopePlugin({scope}))
      app.use(
        EffectorScopePlugin({
          scope,
          scopeName: 'app',
          forceScope: true,
          ssr: false,
        }),
      )
      app.use(EffectorScopePlugin, {scope})
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('EffectorScopeKey', () => {
    const setup = () => {
      const key: InjectionKey<Scope> = EffectorScopeKey
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('useProvidedScope', () => {
    const setup = () => {
      const maybeScope: Scope | null = useProvidedScope()
      const scope: Scope = useProvidedScope({forceScope: true})
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('useProvidedScope without forceScope may return null', () => {
    const setup = () => {
      const scope: Scope = useProvidedScope()
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'Scope | null' is not assignable to type 'Scope'.
        Type 'null' is not assignable to type 'Scope'.
      "
    `)
  })
})

describe('useStore', () => {
  test('store', () => {
    const $count = createStore(0)

    const setup = () => {
      const count = useStore($count)
      const value: number = count.value
      const scoped = useStore($count, {scope: fork(), forceScope: true})
      const scopedValue: number = scoped.value
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})

describe('useStoreMap', () => {
  test('config form', () => {
    const $user = createStore({name: 'alice', age: 30})

    const setup = () => {
      const name = useStoreMap({
        store: $user,
        keys: () => 'name' as const,
        fn: (user, key) => user[key],
        updateFilter: (update, current) => update !== current,
        defaultValue: 'anonymous',
      })
      const value: string = name.value
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('short form is documented but not declared', () => {
    const $user = createStore({name: 'alice', age: 30})

    const setup = () => {
      const name = useStoreMap($user, user => user.name)
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      Argument of type 'StoreWritable<{ name: string; age: number; }>' is not assignable to parameter of type '{ store: Store<unknown>; keys?: (() => unknown) | undefined; fn: (state: unknown, keys: unknown) => unknown; updateFilter?: ((update: unknown, current: unknown) => boolean) | undefined; defaultValue?: unknown; } & ScopeOptions'.
        Type 'StoreWritable<{ name: string; age: number; }>' is missing the following properties from type '{ store: Store<unknown>; keys?: (() => unknown) | undefined; fn: (state: unknown, keys: unknown) => unknown; updateFilter?: ((update: unknown, current: unknown) => boolean) | undefined; defaultValue?: unknown; }': store, fn
      Parameter 'user' implicitly has an 'any' type.
      "
    `)
  })

  test('scope in the config and as a positional argument', () => {
    const $user = createStore({name: 'alice', age: 30})
    const scope = fork()

    const setup = () => {
      useStoreMap({
        store: $user,
        fn: user => user.name,
        scope,
        forceScope: true,
      })
      useStoreMap({store: $user, fn: user => user.name}, scope)
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})

describe('useVModel', () => {
  test('store', () => {
    const $form = createStore({name: 'alice'})

    const setup = () => {
      const form = useVModel($form)
      const name: string = form.value.name
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('shape', () => {
    const $name = createStore('alice')
    const $age = createStore(30)

    const setup = () => {
      const model = useVModel({name: $name, age: $age})
      const name: string = model.name
      const age: number = model.age
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('vue effect scope as a second argument', () => {
    const $form = createStore({name: 'alice'})

    const setup = () => {
      useVModel($form, effectScope())
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})

describe('gate', () => {
  test('createGate and useGate', () => {
    const Gate = createGate<{id: number}>({name: 'PageGate'})

    const setup = () => {
      const $status: Store<boolean> = Gate.status
      const $state: Store<{id: number}> = Gate.state

      useGate(Gate, () => ({id: 1}))
      useGate(Gate, () => ({id: 1}), {scope: fork(), forceScope: true})
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('props accept a value, a ref and a getter', () => {
    const Gate = createGate<{id: number}>()

    const setup = () => {
      useGate(Gate, {id: 1})
      useGate(Gate, ref({id: 1}))
      useGate(Gate, computed(() => ({id: 1})))
      useGate(Gate, () => ({id: 1}))
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('props of another shape are rejected', () => {
    const Gate = createGate<{id: number}>()

    const setup = () => {
      useGate(Gate, {id: 'one'})
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'string' is not assignable to type 'number'.
      "
    `)
  })
})
